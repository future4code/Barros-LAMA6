import CustomError from "../CustomError";

class BandNotExisting extends CustomError {
    constructor(){
        super(404, "This band does not exist.")
    }
}

export default BandNotExisting