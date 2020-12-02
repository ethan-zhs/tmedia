module.exports = {
    extends: [        
        'plugin:@typescript-eslint/recommended',        
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended', 
        'plugin:vue/essential',        // 开启vue eslint 自动检测
        'plugin:react/recommended',
        "prettier",
        "prettier/vue"                
    ],
    plugins: ["vue", "react", "@typescript-eslint"],
    settings: {             //自动发现React的版本，从而进行规范react代码
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    }, 
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        parser: '@typescript-eslint/parser',
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/camelcase": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0
    }
};