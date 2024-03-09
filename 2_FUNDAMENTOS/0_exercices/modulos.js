const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual o seu nome?'
    },
    {
        name: 'p2',
        message: 'Qual a sua idade?'
    }
]).then((result) => {
    console.log(`${chalk.bgYellow.black(`meu nome é ${result['p1']} e minha idade é ${result['p2']}`)}`)
    
}).catch((err) => {
    console.log(err)
});