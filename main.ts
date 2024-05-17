#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 4000;
let myPin = 2040;

console.log(chalk.blue("\n\tATM MACHINE\n"));

let pinAnswer = await inquirer.prompt([
    {
        name:"pin",
        type:"number",
        message:"Please enter your pin:"
    }
])

if (pinAnswer.pin === myPin){
    console.log(chalk.green("Correct Pin Code"))

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Please select an option: ",
            type: "list",
            choices: ["withdraw","check balance"]
        }
    ])
    
    if (operationAns.operation === "withdraw"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select withdrawl method:",
                choices: ["Fast cash","Enter amount"]
            }
        ])
        if  (withdrawAns.withdrawMethod === "Fast cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select amount to withdraw:",
                    choices: [500,1000,2000,5000,10000,50000]
                }
            ])
            if (fastCashAns.fastCash > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} Withdraw Sucessfully`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter amount to withdraw:"
                }
            ])
            if (amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Sucessfully`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance"){
        console.log(`Your Account Balance is: ${myBalance}`)
    }
}
else {
    console.log(chalk.red("Pin Is Incorrect, Try Again!"));
} 
