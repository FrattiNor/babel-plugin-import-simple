function transCamel(str) {
    const _str = str[0].toLowerCase() + str.substr(1)
    return _str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
}

export default function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration: {
                enter(path, { opts = {} }) {
                    const { libraryName, libraryDirectory = 'lib', toLowerCase = true } = opts
                    const rawValue = path.node.source.value
                    if (rawValue === libraryName) {
                        let haveOther = false

                        path.node.specifiers.forEach((item) => {
                            const { type, imported } = item
                            if (type === 'ImportSpecifier') {
                                const newImportDeclaration = {
                                    ...item,
                                    type: 'ImportDefaultSpecifier'
                                }
                                const newStringLiteral = `${libraryName}/${libraryDirectory}/${
                                    toLowerCase ? transCamel(imported.name) : imported.name
                                }`
                                path.insertAfter(t.importDeclaration([newImportDeclaration], t.stringLiteral(newStringLiteral)))
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
