import CustomError from "../CustomError";

class MissingBandId extends CustomError {
    constructor(){
        super(422, "Band id required.")
    }
}

export default MissingBandId