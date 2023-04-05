import CustomError from "../CustomError";

class MissingEndTime extends CustomError {
    constructor(){
        super(422, "End time required.")
    }
}

export default MissingEndTime