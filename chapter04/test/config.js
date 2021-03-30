module.exports = ({
    local: {
        baseURL : 'http://localhost:8080/',
        username: 'admin@gmail.com',
        password: 'admin',
        productToTestName: 'Macbook Pro 13.3\' Retina MF841LL/A',
        productToTestId: 1,
        launchOptions: { headless: false },
        timeout: 50000,
    },
    test: {},
    prod: {}
})[process.env.TESTENV || 'local'];