import CustomError from "../CustomError";

class MissingLoginInfos extends CustomError {
    constructor(){
        super(422, "User e-mail and password required.")
    }
}

export default MissingLoginInfos