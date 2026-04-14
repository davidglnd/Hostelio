class User {
    constructor(id, firstName, email, password, role = "basic", lastName, businessName) {
        this.id = id || crypto.randomUUID();
        this.firstName = firstName.trim().toLowerCase() || "";
        this.email = email?.trim().toLowerCase() || "";
        this.password = password;
        this.role = role;
        this.lastName = lastName?.trim().toLowerCase() || "";
        this.businessName = businessName?.trim().toLowerCase() || "";
    }

    get fullName() {
    return `${this.firstName} ${this.lastName}`;
    }
}

export default User

