const http = require('http')

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text/html')
    res.end('<h1>Hello World<h1><p>testando<p>')
})

server.listen(3000, () => {
    console.log('Work!')
})