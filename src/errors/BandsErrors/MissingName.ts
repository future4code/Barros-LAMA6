import CustomError from "../CustomError";

class MissingName extends CustomError {
    constructor(){
        super(422, "Name required.")
    }
}

export default MissingName