module.exports = {
    plugins: [
        [
            'postcss-preset-env',
            {
                'browsers': [
                    'last 2 version',
                    '>1%'
                ]
            }
        ]
    ]
};
