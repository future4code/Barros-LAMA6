import CustomError from "../CustomError";

class MissingSignUpInfos extends CustomError {
    constructor(){
        super(422, "User full name, e-mail, password and role required.")
    }
}

export default MissingSignUpInfos