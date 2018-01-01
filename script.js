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
        this.displayName = 'BankAccount';
        this.id = 'BankAccount';
        this.rpDisplayName = 'BankAccount';
        this.accountHistory = [];
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
    //public withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction,
    BankAccount.prototype.withdrawMoney = function (amount, description, transactionOrigin) {
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
        switch (this.accountType) {
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
                }
                else {
                    this.balance -= amount;
                }
                break;
            case AccountType.retirement:
                var d = new Date();
                var bDay = this.accountHolderBirthDate;
                var age = d.getFullYear() - bDay.getFullYear();
                // Determines if their b-day has occured this year and accounts for it if it has not.
                if (d.getMonth() <= bDay.getMonth() && d.getDate() < bDay.getDate())
                    age--;
                if (age < 60)
                    amount *= 1.1, output.amount = amount;
                output.resultBalance = this.balance - amount;
                if (this.balance - amount < 0) {
                    output.success = false;
                    output.errorMessage = 'Insufficient funds.';
                    return output;
                }
                this.balance -= amount;
        }
        //The below part should satisfy the requirement that an object be returned, and it will also write to the history.
        //this.accountHistory.push(transaction);
        return output;
    };
    BankAccount.prototype.depositMoney = function (amount, description) {
        this.balance += amount;
        var day = new Date();
        var transaction = {
            success: true,
            amount: amount,
            resultBalance: this.balance,
            transactionDate: day,
            description: description,
            errorMessage: ''
        };
        this.accountHistory.push(transaction);
        return transaction;
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
    bankAccounts.push(new BankAccount('dank', bDay, type));
}
var d = new Date();
d.setFullYear(1800);
createBankAccount("DankboisAccount", d, AccountType.retirement);
console.log(bankAccounts[0].depositMoney(100000, 'Got an epic freelance job with some weird client in Uganda.'));
