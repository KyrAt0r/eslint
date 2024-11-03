import pluginNext from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import plaginNext from "@next/eslint-plugin-next";

export const eslint = ({ jsxA11y = false, next = false, ...options }, ...configs) => {

    if (next) {
        configs.unshft({
            plugins: {
                'kukuruznick-next': pluginNext
            },
            name: 'kukuruznick/next',
            rules: {
                ...Object.entries({ ...plaginNext.configs.recommended.rules }).reduce(
                    (acc, [key, value]) => {
                        acc[key.replace('@next/next', 'kukuruznick-next')] = value;
                        return acc;
                    },
                    {}
                )
            }
        })
    }

    if (options.react) {
        configs.unshft({
            plugins: {
                'kukuruznick-react': pluginReact
            },
            name: 'kukuruznick/react',
            settings: {
                react: {
                  version: 'detect'
                }
            },
            rules: {
                ...Object.entries(pluginReact.configs.recommended.rules).reduce((acc, [key, value]) => {
                    acc[key.replace('react', 'kukuruznick-react')] = value;
                    return acc;
                }, {}),
                'kukuruznick-react/prop-types': 'off',
                'kukuruznick-react/react-in-jsx-scope': 'off',
                'kukuruznick-react/function-component-definition': [
                    'error',
                    {
                        namedComponents: ['arrow-function'],
                        unnamedComponents: 'arrow-function'
                      }
                ],
                'kukuruznick-react/checked-requires-onchange-or-readonly': ['off', {
                    ignoreMissingProperties: false,
                    ignoreExclusiveCheckedAttribute: false
                  }],
                'kukuruznick-react/jsx-boolean-value': ['error', 'never', { always: [] }],
                'kukuruznick-react/jsx-handler-names': ['off', {
                    eventHandlerPrefix: 'handle',
                    eventHandlerPropPrefix: 'on',
                  }],
                'kukuruznick-react/jsx-indent-props': ['error', 2],
                'kukuruznick-react/jsx-key': 'off',
            }
        })
    }

    if (options.imports) {
        configs.unshft({
            plugins: {
                'kukuruznick-simple-import-sort': pluginSimpleImportSort,
            },
            name: 'kukuruznick/imports',
            rules: {
                'sort-imports': 'off',
                'import/order': 'off',
                'import/extensions': 'off',
                'plugin-simple-import-sort/exports': 'error',
                'plugin-simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            ['^react', '^@?\\w'],
                            ['^@(kukuruznick-core/.*|$)'],
                            ['^@(([\\/.]?\\w)|assets|test-utils)'],
                            ['^\\u0000'],
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            ['^.+\\.s?css$']
                          ]
                    }
                ],
            }
        })
    }
}
