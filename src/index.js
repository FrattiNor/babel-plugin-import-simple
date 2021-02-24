function transCamel(str) {
    const _str = str[0].toLowerCase() + str.substr(1)
    return _str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
}

module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration: {
                enter(path, { opts = {} }) {
                    const { libraryName, libraryDirectory = 'lib', toUnderlineLowerCase = true, style = false } = opts
                    const rawValue = path.node.source.value
                    if (rawValue === libraryName) {
                        let haveOther = false

                        path.node.specifiers.forEach((item) => {
                            const { type, imported } = item
                            if (type === 'ImportSpecifier') {
                                const newImportDefaultSpecifier = {
                                    ...item,
                                    type: 'ImportDefaultSpecifier'
                                }
                                const componentPath = `${libraryName}/${libraryDirectory}/${
                                    toUnderlineLowerCase ? transCamel(imported.name) : imported.name
                                }`
                                path.insertAfter(t.importDeclaration([newImportDefaultSpecifier], t.stringLiteral(componentPath)))
                                if (style) {
                                    const stylePath = style ? `${componentPath}/style` : `${componentPath}/${style}`
                                    path.insertAfter(t.importDeclaration([], t.stringLiteral(stylePath)))
                                }
                            } else {
                                haveOther = true
                            }
                        })

                        if (!haveOther) {
                            path.remove()
                        }
                    }
                }
            },
            ImportSpecifier: {
                enter(path, { opts = {} }) {
                    const { libraryName } = opts
                    if (path.parentPath.node.type === 'ImportDeclaration') {
                        const rawValue = path.parentPath.node.source.value
                        if (rawValue === libraryName) {
                            path.remove()
                        }
                    }
                }
            }
        }
    }
}
