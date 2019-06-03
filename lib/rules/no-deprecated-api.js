/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { CALL, CONSTRUCT, READ, ReferenceTracker } = require("eslint-utils")

/**
 * Makes a replacement message.
 *
 * @param {string|null} replacedBy - The text of substitute way.
 * @returns {string} Replacement message.
 */
function toReplaceMessage(replacedBy) {
    return replacedBy ? `. Use ${replacedBy} instead` : ""
}

/**
 * Convert a given path to name.
 * @param {symbol} type The report type.
 * @param {string[]} path The property access path.
 * @returns {string} The name.
 */
function toName(type, path) {
    const baseName = path.join(".")
    return type === ReferenceTracker.CALL
        ? `${baseName}()`
        : type === ReferenceTracker.CONSTRUCT
            ? `new ${baseName}()`
            : baseName
}

module.exports = {
    meta: {
        docs: {
            description: "disallow deprecated APIs",
            category: "Best Practices",
            recommended: true,
            url:
                "https://github.com/ayqy/eslint-plugin-deprecated/blob/v8.0.1/docs/rules/no-deprecated-api.md",
        },
        type: "problem",
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    modules: {
                        type: "object",
                    },
                    globals: {
                        type: "object",
                    },
                    messageTemplates: {
                        type: "object",
                        properties: {
                            "normal": {
                                "type": "string",
                                "default": ""
                            },
                            "noReplacedBy": {
                                "type": "string",
                                "default": ""
                            },
                            "noSince": {
                                "type": "string",
                                "default": ""
                            },
                            "neither": {
                                "type": "string",
                                "default": ""
                            }
                        }
                    }
                },
                additionalProperties: false,
            },
        ],
    },
    create(context) {
        const options = context.options[0] || {}
        const modules = convertInternalKeys(options.modules || {});
        const globals = convertInternalKeys(options.globals || {});
        const defaultMessageTemplate = "{{name}} was deprecated since v{{version}}{{replace}}.";

        const messageTemplates = Object.assign({
            normal: defaultMessageTemplate,
            noReplacedBy: "{{name}} was deprecated since v{{version}}{{replace}}.",
            noSince: "{{name}} was deprecated{{replace}}."
        }, options.messageTemplates || {});

        /**
         * Reports a use of a deprecated API.
         *
         * @param {ASTNode} node - A node to report.
         * @param {string} name - The name of a deprecated API.
         * @param {{since: number, replacedBy: string}} info - Information of the API.
         * @returns {void}
         */
        function reportItem(node, name, info) {
            const messageTemplate = options.messageTemplates ? messageTemplates[getMessageTplType(info)] : defaultMessageTemplate;

            context.report({
                node,
                loc: node.loc,
                message: messageTemplate,
                data: {
                    name,
                    version: info.since,
                    replace: options.messageTemplates ? (info.replacedBy || '') :
                        toReplaceMessage(info.replacedBy),
                },
            })
        }

        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope(), {
                    mode: "legacy",
                })

                for (const report of tracker.iterateGlobalReferences(globals)) {
                    const { node, path, type, info } = report
                    const name = toName(type, path)

                    reportItem(node, `'${name}'`, info)
                }
                for (const report of [
                    ...tracker.iterateCjsReferences(modules),
                    ...tracker.iterateEsmReferences(modules),
                ]) {
                    const { node, path, type, info } = report
                    const name = toName(type, path)
                    const suffix = path.length === 1 ? " module" : ""

                    reportItem(node, `'${name}'${suffix}`, info)
                }
            },
        }
    },
}

const INTERNAL_KEY_MAP = {
    '[CALL]': CALL,
    '[READ]': READ,
    '[CONSTRUCT]': CONSTRUCT,
};

function convertInternalKeys(apiJSON) {
    // There may be references in apiJSON definition, reserve it
    // e.g. globals = { process: modules.process }
    if (!apiJSON.hasOwnProperty) {
        return apiJSON;
    }

    let result = Object.create(null);

    for (let key in apiJSON) {
        if (apiJSON.hasOwnProperty(key)) {
            const element = apiJSON[key];
            // 转换key
            if (key in INTERNAL_KEY_MAP) {
                key = INTERNAL_KEY_MAP[key];
            }
            if (Object.prototype.toString.call(element) === "[object Object]") {
                result[key] = convertInternalKeys(element);
            }
            else {
                result[key] = element;
            }
        }
    }

    return result;
}

function getMessageTplType(info) {
    const tplTypes = [];

    if (!info.replacedBy) {
        tplTypes.push('noReplacedBy');
    }
    if (!info.since) {
        tplTypes.push('noSince');
    }

    return tplTypes.length > 1 ? 'neither' : tplTypes[0] || 'normal';
}
