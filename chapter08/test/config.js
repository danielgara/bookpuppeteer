module.exports = ({
    local: {
        baseURL : 'http://localhost:8080/',
        username: 'admin@gmail.com',
        password: 'admin',
        launchOptions: { headless: false },
        productImage: 'https://www.dropbox.com/s/swg9bdr0ejcbtrl/img9.jpg?raw=1',
        timeout: 50000,
    },
    test: {},
    prod: {}
})[process.env.TESTENV || 'local'];