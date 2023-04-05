import CustomError from "../CustomError";

class WrongPassword extends CustomError {
    constructor(){
        super(422, "Wrong password.")
    }
}

export default WrongPassword