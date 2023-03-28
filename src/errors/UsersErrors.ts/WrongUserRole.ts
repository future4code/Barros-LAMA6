import CustomError from "../CustomError";

class WrongUserRole extends CustomError {
    constructor(){
        super(409, "Only 'admin' users can create a band or a show.")
    }
}

export default WrongUserRole