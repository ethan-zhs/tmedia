"use strict";
module.exports = function (api) {
    api && api.cache(true);
    return {
        "presets": [
            ["@babel/preset-env", {
                "modules": false,
                "targets": {
                    "browsers": [
                        "ie >=9",
                        "last 2 version",
                        "> 5%",
                        "not dead"
                    ]
                },
                "useBuiltIns": "usage"
            }],
            "@babel/preset-react",
            "@babel/preset-typescript"
        ],
        "plugins": [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-modules-commonjs",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-export-default-from",
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
        ]
    }
}
