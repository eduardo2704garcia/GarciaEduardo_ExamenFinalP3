export default[
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            'semi': ['error', 'always'], //regña para punto y coma
            'quotes': ['error', 'single'] //regla para comillas simples
        }
    }
];