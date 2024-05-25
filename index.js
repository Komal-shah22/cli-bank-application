#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class BanckAccount {
    balance;
    transactionHistory;
    name;
    age;
    gender;
    mobileNo;
    constructor(name, age, gender, mobileNo) {
        this.balance = 0;
        this.transactionHistory = [];
        this.gender = gender;
        this.mobileNo = mobileNo;
        this.name = name;
        this.age = age;
    }
    deposit(amount) {
        if (amount <= 1000) {
            this.balance += amount;
            this.transactionHistory.push(`Deposited ${amount}`);
            console.log(chalk.bold.italic.magenta(`Deposited ${amount} successfuly. \n`));
        }
        else if (amount > 1000) {
            this.balance += amount - 1;
            this.transactionHistory.push(`Deposited ${amount}`);
            console.log(chalk.bold.italic.magenta(`Deposited ${amount} successfuly. \n`));
        }
        else {
            console.log(chalk.bold.italic.magenta(`Invalid Input...\n`));
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push(`withdraw ${amount}`);
            console.log(chalk.bold.italic.magenta(`withdraw ${amount} successfully. \n`));
        }
        else {
            console.log(chalk.bold.italic.magenta(`Insufficient Funds or Invalid Amount\n`));
        }
    }
    updateAccountInfo(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        console.log(chalk.bold.italic.magenta(`Your Account Information Has Been Updated Successfuly .\n`));
    }
    viewAccountInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Gender: ${this.gender}`);
        console.log(`Mobile Number: ${this.mobileNo}`);
        console.log(`Balance: ${this.balance}`);
    }
    checkBalance() {
        console.log(`You balance is : ${this.balance} Rupees..`);
    }
    getTransactionHistory() {
        console.log(`Transaction History:`);
        this.transactionHistory.forEach((transaction) => console.log(transaction));
    }
}
async function startBankManegement() {
    console.log(chalk.bold.italic.bgWhite.blue(`\n\t\t\tWelcome T0 Bank Application!\n`));
    console.log(chalk.bold.italic.cyan(`Please enter you details to countinue...\n`));
    const { name, age, gender, mobileNo } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: chalk.bold.italic.blue('Enter your full Name :')
        },
        {
            type: 'number',
            name: 'age',
            message: chalk.bold.italic.blue('Enter your Age :')
        },
        {
            type: 'list',
            name: 'gender',
            message: chalk.bold.italic.blue('select Your gender :'),
            choices: ['Male', 'Female', 'Other']
        },
        {
            type: 'number',
            name: 'mobileNo',
            message: chalk.bold.italic.blue('Enter your Mobile Number:')
        }
    ]);
    const banckAccount = new BanckAccount(name, age, gender, mobileNo);
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: chalk.bold.italic.red.underline('\nwhat would you like to do\n\n'),
                choices: ['Show Profile', 'Update Account Information', 'Deposit', 'Withdraw', 'Check Balance', 'View Transaction History', 'Exit']
            }
        ]);
        switch (action) {
            case 'Show Profile':
                banckAccount.viewAccountInfo();
                break;
            case 'Update Account Information':
                const { newName, newAge, newGender } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newName',
                        message: chalk.bold.italic.blue('Enter your new name'),
                    },
                    {
                        type: 'number',
                        name: 'newAge',
                        message: chalk.bold.italic.blue('Enter your new age'),
                    },
                    {
                        type: 'input',
                        name: 'newName',
                        message: chalk.bold.italic.blue('Select your newGender'),
                        choices: ['Male', 'Female', 'Other']
                    },
                ]);
                banckAccount.updateAccountInfo(newName, newAge, newGender);
                break;
            case 'Deposit':
                const { depositAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'depositAmount',
                        message: chalk.bold.italic.green('\nEnter the amount to deposit')
                    },
                ]);
                banckAccount.deposit(depositAmount);
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'WithdrawAmount',
                        message: chalk.bold.italic.green('\nEnter the amount to Withdraw')
                    },
                ]);
                banckAccount.deposit(withdrawAmount);
                break;
            case 'Check Balance':
                banckAccount.checkBalance();
                break;
            case 'View Transaction History':
                banckAccount.getTransactionHistory();
                break;
            case 'Exit':
                console.log(chalk.bold.italic.bgGrey.blue(`\n\t\t\tEXITING BANK APPLICATION ..SEE YOU NEXT TIME !\n`));
                return;
        }
    }
}
startBankManegement();
