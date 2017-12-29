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
  checkBankAccounts();
}, 1000);

class BankAccount {
  public accountHolderName: string;
  public accountHolderBirthDate: Date;
  public balance: number;
  //public withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction,
  public withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin) {
    console.log(amount);
  }
  public depositMoney(amount: number, description: string) {
    console.log(amount);
  }
  public accountHistory: Transaction[];
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
    switch (+accountType) {
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
  bankAccounts.push(new BankAccount('dank', new Date(), AccountType.retirement));
}
