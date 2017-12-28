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
    withdrawMoney(amount: number,
                  description: string,
                  transactionOrigin: TransactionOrigin) : Transaction;
    depositMoney(amount: number
    description: string) : Transaction;
    accountHistory : Transaction[];
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