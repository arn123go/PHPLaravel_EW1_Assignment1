// This part is script main.

// Think of the class 'BankAccount' as a candidate/form to apply for an account in the 'Bank'.
class BankAccount {
  accountNumber = 0;
  ownerName = "";
  balance = 0;

  constructor(accountNumber, name, balance, activated = false) {
    this.accountNumber = accountNumber;
    this.ownerName = name;
    this.balance = balance;
    this.activated = activated;
  }

  deposit(amount) {
    if (typeof amount != "number" || amount <= 0 || this.activated == false) {
      return console.log("\nInvalid attempt!");
    }
    this.balance += amount;
  }

  withdraw(amount) {
    if (typeof amount != "number" || amount <= 0 || this.activated == false) {
      return console.log("\nInvalid attempt!");
    } else if (amount > this.balance) {
      return console.log(`\nInsufficient funds`);
    }
    this.balance -= amount;
  }

  getBalance() {
    if (this.activated == true) {
      return this.balance;
    }
    return console.log("\nInvalid attempt!");
  }

  displayAccountInfo() {
    if (this.activated == true) {
      return console.log(
        `\nAccount Info\nAccount number: ${this.accountNumber}\nOwner name: ${this.ownerName}\nBalance: $${this.balance}`
      );
    }
    return console.log("\nInvalid attempt!");
  }
}

// Creating some data for seeding...
let accountsBackup = [
  new BankAccount(1001, "Abdul Latif", 10000, true),
  new BankAccount(1002, "Rumman Ahmed", 15000, true),
  new BankAccount(1003, "Samira Akter", 20000, true),
];

// Think of the class 'Bank' as a storage which holds valid accounts as a manager.
class Bank {
  // This variable will hold all the accounts
  database = [];

  constructor() {
    this.database = accountsBackup;
  }

  // Last account number
  lastAccountNumber() {
    return this.database[this.database.length - 1].accountNumber;
  }

  // Generating the next new account number
  newAccountNumber(){
    return this.lastAccountNumber() + 1;
  }

  // Find the index of the account in the database
  findAccountIndex(accountNumber) {
    for (let i = 0; i < this.database.length; i++) {
      if (this.database[i].accountNumber == accountNumber) {
        return i;
      }
    }
    return false;
  }

  // Add a fresh new account
  addAccount(account) {
    let error = "";

    // account number generation or validation
    if (account.accountNumber === null) {
      account.accountNumber = this.newAccountNumber();
    } else if (
      typeof account.accountNumber == "number" &&
      account.accountNumber > 0
    ) {
      if (this.findAccountIndex(account.accountNumber) !== false) {
        error += "\nDuplicate account number!";
      }
    } else {
      error += "\nInvalid account number!";
    }

    // owner name validation
    if (typeof account.ownerName != "string" || account.ownerName.length == 0) {
      error += "\nInvalid owner name!";
    }

    // balance validation
    if (typeof account.balance != "number" || account.balance <= 0) {
      error += "\nInvalid balance!";
    }

    // finalizing things...
    if (error) {
      console.log(error);
    } else {
      account.activated = true;
      this.database.push(account);
      console.log("\nNew account created!");
    }
  }
}
// ------------------------------------------------------------------------------------------------------
// This part is for editing and checking output.
// Think of the class 'Bank' as a storage which holds valid accounts as a manager.
// Think of the class 'BankAccount' as a candidate/form to apply for account in the 'Bank'.

// The bank
const bank = new Bank();

console.log(`\n(See source code in "script.js")\n`);

console.log("\nSumon goes to create his account in the bank...");

// Sumon goes to create his account in the bank...
const sumon = new BankAccount(1004, "Sumon Hasan", 5000);
bank.addAccount(sumon);

// Jabir goes to create his account in the bank with the same account number as Sumon...  Jabir will get error.
// Jabir must provide a unique account number, or 'null' as account number so that the bank auto-generates a unique account number for him.
const jabir = new BankAccount(1004, "Jabir Ahmed", 7000);
bank.addAccount(jabir);

// Sumon is using his account...
console.log("\nSumon is doing different activities with his bank account...");
sumon.deposit(10000);
sumon.withdraw(2000);
console.log(`\nSumon's current balance: $${sumon.getBalance()}`);
sumon.withdraw(15000);
sumon.displayAccountInfo();