export class User{
    constructor (firstName, lastName, email, password, role = "basic", businessName) {
        this.firstName = firstName.trim().toLowerCase();
        this.lastName = lastName.trim().toLowerCase();
        this.email = email.trim().toLowerCase();
        this.#password = password;
        this.role = role;
        this.businessName = businessName.trim().toLowerCase();
    }
}