function checkBankAccounts() {
    for (var i = 0; i < bankAccounts.length; i++) {
        bankAccounts[i].balance *= (1 + (bankAccounts[i].accountType / 100 / 12));
    }
}
var lastMonth;
setInterval(function () {
    var d = new Date();
    var thisMonth = d.getMonth();
    if (thisMonth == lastMonth)
        return;
    lastMonth = thisMonth;
    checkBankAccounts();
}, 1000);
var BankAccount = /** @class */ (function () {
    function BankAccount(
        // When new BankAccount() is called this area defines the available arguments. Arguments are typed here.
        name, bDay, accountType) {
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
    //public withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction,
    BankAccount.prototype.withdrawMoney = function (amount, description, transactionOrigin) {
        console.log(amount);
    };
    BankAccount.prototype.depositMoney = function (amount, description) {
        console.log(amount);
    };
    BankAccount.prototype.advanceDate = function (numberOfDays) {
        console.log(numberOfDays);
    };
    return BankAccount;
}());
var TransactionOrigin;
(function (TransactionOrigin) {
    TransactionOrigin[TransactionOrigin["web"] = 1] = "web";
    TransactionOrigin[TransactionOrigin["phone"] = 2] = "phone";
    TransactionOrigin[TransactionOrigin["branch"] = 3] = "branch";
})(TransactionOrigin || (TransactionOrigin = {}));
var AccountType;
(function (AccountType) {
    AccountType[AccountType["checking"] = 1] = "checking";
    AccountType[AccountType["savings"] = 2] = "savings";
    AccountType[AccountType["retirement"] = 3] = "retirement";
})(AccountType || (AccountType = {}));
var bankAccounts = [];
function createBankAccount(name, bDay, type) {
    bankAccounts.push(new BankAccount('dank', new Date(), AccountType.retirement));
}
