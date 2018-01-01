function checkBankAccounts() {
  for (var i = 0; i < bankAccounts.length; i++){
    bankAccounts[i].balance *= (1 + (bankAccounts[i].accountType / 100 / 12));
  }
}

var lastMonth;

setInterval(function () {
  var d = new Date();
  var thisMonth = d.getMonth();
  if (thisMonth == lastMonth) return;
  lastMonth = thisMonth;
  checkBankAccounts()
}, 1000);

class BankAccount implements Account {
  public displayName: string = 'BankAccount';
  public id: string = 'BankAccount';
  public rpDisplayName: string = 'BankAccount';
  public accountHolderName: string;
  public accountHolderBirthDate: Date;
  public balance: number;
  public accountHistory: Transaction[] = [];
  //public withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction,
  public withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
    var day = new Date();
    var output = {
      success: true,
      amount: amount,
      resultBalance: this.balance - amount,
      transactionDate: day,
      description: description,
      errorMessage: ''
    };
    if (this.balance - amount < 0) {
      output.success = false;
      output.errorMessage = 'Insufficient funds.';
      return output;
    }
    switch(this.accountType){
      case AccountType.checking:
        this.balance -= amount;
        break;
      case AccountType.savings:
        if (transactionOrigin != TransactionOrigin.branch) {
          if (this.accountHistory.length >= 6) {
            output.success = false;
            output.errorMessage = 'Limit on phone and web transactions reached.';
            return output;
          }
          this.balance -= amount;
          this.accountHistory.push(output);
        } else {
          this.balance -= amount;
        }
        break;
      case AccountType.retirement:
        var d = new Date();
        var bDay = this.accountHolderBirthDate;
        var age = d.getFullYear() - bDay.getFullYear();
        // Determines if their b-day has occured this year and accounts for it if it has not.
        if (d.getMonth() <= bDay.getMonth() && d.getDate() < bDay.getDate()) age--;
        if (age < 60) amount *= 1.1, output.amount = amount;
          output.resultBalance = this.balance - amount;
        if (this.balance - amount < 0) {
          output.success = false;
          output.errorMessage = 'Insufficient funds.';
          return output;
        }
        this.balance -= amount;
        //read age, fine additional money on basis of age.
    }
    //The below part should satisfy the requirement that an object be returned, and it will also write to the history.
    //this.accountHistory.push(transaction);
    return output;
  }
  public depositMoney(amount: number, description: string): Transaction {
    this.balance += amount;
    let day = new Date();
    var transaction = {
      success:true,
      amount:amount,
      resultBalance: this.balance,
      transactionDate:day,
      description:description,
      errorMessage:'',
    }
    this.accountHistory.push(transaction);
    return transaction;
  }
  public advanceDate(numberOfDays: number) {
    console.log(numberOfDays);
  }
  public accountType: AccountType;
  constructor (
    // When new BankAccount() is called this area defines the available arguments. Arguments are typed here.
    name: string,
    bDay: Date,
    accountType: AccountType
  ) {
    this.accountHolderName = name;
    this.accountHolderBirthDate = bDay;
    this.accountType = accountType;
    switch (accountType) {
      case AccountType.checking:
        this.balance = 1000;
        break;
      case AccountType.savings:
        this.balance = 10000;
        break;
      case AccountType.retirement:
        this.balance = 100000;
        break;
      default:
        this.balance = 0;
    }
  }
}

enum TransactionOrigin {
  web = 1,
  phone = 2,
  branch = 3
}

enum AccountType {
  checking = 1,
  savings = 2,
  retirement = 3
}

interface Account {
  accountHolderName: string;
  accountHolderBirthDate: Date;
  balance: number;
  // We assign the function, this just declares it.
  withdrawMoney(amount: number,
                description: string,
                transactionOrigin: TransactionOrigin): Transaction;
  depositMoney(amount: number,
  description: string): Transaction;
  // array of transactions
  accountHistory: Transaction[];
  advanceDate(numberOfDays: number);
  accountType: AccountType;
}

interface Transaction {
  success: boolean;
  // amount will be positive for deposits and negative for withdrawals:
  amount: number;
  // resultBalance will be unchanged from the previous balance when success is false.
  resultBalance: number;
  transactionDate: Date;
  description: string;
  // errorMessage will be an empty string when success is true:
  errorMessage: string;
}

var bankAccounts = [];

function createBankAccount(name: string, bDay: Date, type: AccountType) {
  bankAccounts.push(new BankAccount('dank', bDay, type));
}
var d = new Date();
d.setFullYear(1800);
createBankAccount("DankboisAccount", d, AccountType.retirement);
console.log(bankAccounts[0].depositMoney(100000, 'Got an epic freelance job with some weird client in Uganda.'));
