export class BankAccount {
    id: String;
    userID: String;
    accountNumber: Number;
    address = {
        country: '',
        county: '',
        state: '',
        zipcode: ''
    };
    cardHolderName: String;
    cardExpiryDate: String;
    CVV: Number;
}