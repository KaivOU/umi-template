module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier', 'unused-imports'],
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-underscore-dangle': 0,
    'no-template-curly-in-string': 0,
    'max-classes-per-file': ['error', 2], // https://cn.eslint.org/docs/rules/max-classes-per-file
    'max-params': ['error', 7],
    '@typescript-eslint/no-require-imports': 'off',
    'no-undef': 'off',
    'no-extend-native': 'off',
    'max-nested-callbacks': ['error', 5],
    complexity: ['error', 60],
    'prettier/prettier': 'error',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'no-console': 2,
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'no-eq-null': 2, // 不允许对null用==或者!=
    'no-eval': 2, // 不允许使用eval()
    'no-empty': 2, // 不允许出现空的代码块
    'no-extra-boolean-cast': 2, // 不允许出现不必要的布尔值转换
    'no-extra-semi': 2, // 不允许出现不必要的分号
    'no-inner-declarations': ['error', 'functions'], // 不允许在嵌套代码块里声明函数
    'no-irregular-whitespace': 2, // 不允许出现不规则的空格
    'no-sparse-arrays': 2, // 数组中不允许出现空位置
    radix: 2, // 使用parseInt时强制使用基数来指定是十进制还是其他进制
    'no-undef-init': 2, // 不允许初始化变量时给变量赋值undefined
    camelcase: [
      2,
      {
        properties: 'never',
      },
    ], // 强制驼峰命名规则
    'no-multiple-empty-lines': [
      2,
      {
        max: 2,
      },
    ], // 空行最多不能超过两行
    'no-var': 2, // 使用let和const代替var
    'no-unused-expressions': 2, // 不允许无用的表达式
    'no-redeclare': 2, // 不允许变量重复声明
    'no-new-wrappers': 2, // 不允许使用new String，Number和Boolean对象
    'no-debugger': 2, // 不允许出现debugger语句
    'no-dupe-args': 2, // 函数定义的时候不允许出现重复的参数
    'no-dupe-keys': 2, // 对象中不允许出现重复的键
    'no-duplicate-case': 2, // switch语句中不允许出现重复的case标签
    'use-isnan': 2, // 要求检查NaN的时候使用isNaN()
    'default-case': 2, // 在switch语句中需要有default语句
    'unused-imports/no-unused-imports': 'error',
    'prefer-regex-literals': 0,
  },
};
