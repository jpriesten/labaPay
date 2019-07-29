export class BankAccount {
    id: String;
    userId: String;
    accountNumber: Number;
    address = {
        country: '',
        county: '',
        state: '',
        zipcode: ''
    };
    fullname: String;
}