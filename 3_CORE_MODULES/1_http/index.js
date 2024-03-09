const http = require('http')

const server = http.createServer((req, res) => {
    res.write('Oi mudo')
    res.end()
})

server.listen(3000, () => {
    console.log('Work!')
})