import CustomError from "../CustomError";

class MissingStartTime extends CustomError {
    constructor(){
        super(422, "Start time required.")
    }
}

export default MissingStartTime