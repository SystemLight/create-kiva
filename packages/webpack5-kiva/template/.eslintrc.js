const path = require('path');
const fs = require('fs');

// https://eslint.org/docs/user-guide/configuring/
class EslintRecommendConfig {
  constructor() {
    this.cwd = process.cwd()
    this.isTsProject = fs.existsSync(path.resolve(this.cwd, 'tsconfig.json'));
    this.packageJSON = require(path.join(this.cwd, 'package.json')) // package.json文件信息对象
    this.dependencies = Object.keys({
      ...this.packageJSON['devDependencies'],
      ...this.packageJSON['dependencies']
    }) // 项目依赖库数组，用于判定包含什么框架
    this.config = {}
  }

  build() {
    this.buildBasic()
    this.buildParser()
    this.buildFormatter()
    this.buildPlugin()
    this.buildConfig()
    this.toConfig()

    return this
  }

  buildBasic() {
    this.config.root = true
    this.config.env = {
      browser: true,
      es2022: true,
      node: true
    }
    this.config.settings = {}
    this.config.extends = [
      'eslint:recommended'
    ]

    if (this.isTsProject) {
      this.config.extends.push(
        'plugin:@typescript-eslint/recommended' // @typescript-eslint/eslint-plugin
      )
    }

    if (this.dependencies.includes('react')) {
      this.config.settings.react = {
        version: 'detect'
      }

      this.config.extends.push(
        'plugin:react/recommended', // eslint-plugin-react
        'plugin:react-hooks/recommended' // eslint-plugin-react-hooks
      )
    }

    return this
  }

  buildParser() {
    // ts解析器：https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser
    // js解析器：https://www.npmjs.com/package/@babel/eslint-parser
    if (this.isTsProject) {
      this.config.parser = '@typescript-eslint/parser'
      this.config.parserOptions = {}
    } else {
      this.config.parser = '@babel/eslint-parser'
      let presets = ['@babel/preset-env']
      let plugins = []
      if (this.dependencies.includes('react')) {
        presets.push('@babel/preset-react')
      }
      if (this.dependencies.includes('@babel/plugin-proposal-decorators')) {
        plugins.push(
          // 装饰器属性，https://babel.dev/docs/en/babel-plugin-proposal-decorators
          [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true
            }
          ]
        )
      }
      this.config.parserOptions = {
        requireConfigFile: false,
        babelOptions: {
          presets: presets,
          plugins: plugins
        }
      }
    }

    Object.assign(this.config.parserOptions, {
      sourceType: 'module',
      ecmaVersion: 2022
    })

    return this
  }

  buildFormatter() {
    return this
  }

  buildPlugin() {
    return this
  }

  buildConfig() {
    this.config.rules = {
      'require-jsdoc': 'off',
      'no-invalid-this': 'off',
      'linebreak-style': 'off',
      'max-len': 'off',
      'no-unused-vars': 'off',
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ],
      'arrow-parens': [
        'error',
        'always'
      ],
      'comma-dangle': [
        'error',
        {
          'arrays': 'never',
          'objects': 'never',
          'imports': 'never',
          'exports': 'never',
          'functions': 'never'
        }
      ],
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1
        }
      ],
      'padded-blocks': [
        'error',
        'never'
      ],
      'space-before-function-paren': [
        'error',
        {
          'asyncArrow': 'always',
          'anonymous': 'always',
          'named': 'never'
        }
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          'max': 1
        }
      ]
    }

    if (this.isTsProject) {
      Object.assign(this.config.rules, {
        '@typescript-eslint/no-var-requires': 'off'
      })
    }
    return this
  }

  toConfig(debug) {
    if (debug) {
      console.log(this.config)
    }
    return this.config
  }
}

module.exports = new EslintRecommendConfig().build().toConfig();
