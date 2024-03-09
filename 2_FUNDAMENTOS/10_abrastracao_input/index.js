const inquirer = require('inquirer')

inquirer.prompt([
    {
        name: 'p1',
        message: 'how areu'
    },

    {
        name: 'p2',
        message: 'what is your name'
    }
]).then((res) => {
    console.log(res)
}).catch((err)=> {
    console.log(err)
})