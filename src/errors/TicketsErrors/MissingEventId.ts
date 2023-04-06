import CustomError from "../CustomError";

class MissingEventId extends CustomError {
    constructor(){
        super(422, "Event id required.")
    }
}

export default MissingEventId