module.exports = {
    env: {
        "browser": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    overrides: [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: [
        "react"
    ],
    rules: {
        // 例如，对于未引入的文件，你可以启用 'import/no-unresolved' 规则
      "no-unused-vars": 1, //不能有声明后未被使用的变量或参数
      "no-use-before-define": 2, //未定义前不能使用
  },
  ignorePatterns: ['node_modules/', 'dist/']
}
