module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'ios >= 5',
                'android >= 4.0'
            ]
        }),
        require('postcss-plugin-px2rem')({
            rootValue: 37.5
        })
    ]
};
