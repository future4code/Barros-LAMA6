import CustomError from "../CustomError";

class MissingEventName extends CustomError {
    constructor(){
        super(422, "Event name required.")
    }
}

export default MissingEventName