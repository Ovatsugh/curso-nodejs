const chalk = require('chalk')


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question('Qual a sua linguagem preferida? ', (linguagem) => {
    console.log(`sua liguagem escolhida foi: ${chalk.green(linguagem)}`)
    readline.close()
    setTimeout(() => {
        console.clear()
    }, 2000)
})