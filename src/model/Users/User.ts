enum UserRole {
    ADMIN = "admin",
    NORMAL = "normal"
}

class User {
    constructor(
        private id: string,
        private full_name: string,
        private email: string,
        private password: string,
        private role: UserRole
    ){
    }
}

export default User