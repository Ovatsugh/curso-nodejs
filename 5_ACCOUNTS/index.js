const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { verify } = require('crypto')
operation()

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair']
    }]).then((res) => {
        const response = res['action']

        if (response === 'Criar conta') {
            createAccout()
        } else if (response === 'Consultar saldo') {
            showBalance()

        } else if (response === 'Depositar') {
            deposit()

        } else if (response === 'Sacar') {
            withdraw()

        } else if (response === 'Sair') {
            console.log(chalk.bgBlue.red('Saindo do programa...'))
            setTimeout(() => {
                console.clear()
                process.exit()
            }, 2000)
        }

    }).catch((err) => {
        console.log(err)
    })
}

function createAccout() {
    console.log(chalk.bgGreen.black('[ Obrigado por escolher nosso banco! ] '))
    console.log(chalk.green('Insira as opções da conta: '))
    buildAccount()
}

function buildAccount() {
    inquirer.prompt([{
        name: 'nameAccount',
        message: 'Insira o nome da conta'
    }]).then((res) => {

        accountName = res['nameAccount']

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {

            console.log(chalk.bgRed.black('Essa conta já existe! Escolha outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(err)
        })


        console.log(chalk.green('parabens a sua conta foi criada!'))
        operation()

    }).catch((err) => {
        console.log(err)
    })
}

function deposit() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Insira o nome da conta'
        }
    ]).then((res) => {
        const accountName = res['accountName']
        if (!verifyAccount(accountName)) {
            deposit()
            return
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Insira a quantia'
            }
        ]).then((res) => {
            const amount = res['amount']
            //add an amount
            addAmount(accountName, amount)

        }).catch((err) => {
            console.log(err)
        })

    })

}

function withdraw() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Insira o nome da conta'
        }
    ]).then((res) => {
        const accountName = res['accountName']
        if (!verifyAccount(accountName)) {
            withdraw()
            return
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Insira a quantia'
            }
        ]).then((res) => {
            const amount = res['amount']
            //remove an amoun

            removeAmount(accountName, amount)

        }).catch((err) => {
            console.log(err)
        })

    })

}


//verify if an account exist

function verifyAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.red(`Essa conta não existe, escolha outro nome!`))
        return false
    }
    return true


}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    })

    console.log(chalk.green(`Você depositou R$${amount} da conta ${accountName} com sucesso`))
    operation()
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
       return withdraw()
    }

    if(amount <= 0 || amount > getAccount(accountName).balance) {
        console.log(chalk.bgRed.black("Você não pode realizar essa operação"))
       return withdraw()
        
    }


    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    })

    console.log(chalk.green(`Você sacou R$${amount} da conta ${accountName} com sucesso`))
    return operation()
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)

}

function showBalance() {

    inquirer.prompt([
        {
            name: 'nameAccount',
            message: 'Insira o nome da conta que deseja consultar'
        }
    ]).then((res) => {
        const accountName = res['nameAccount']
        if (!verifyAccount(accountName)) {
            showBalance()
            return;
        }
        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`A conta ${accountName} possui R$${accountData.balance}`))
        operation()

    }).catch((err) => {
        console.log(err)
    })
}
