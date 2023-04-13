import CustomError from "../CustomError";

class BandExisting extends CustomError {
    constructor(){
        super(409, "This band already exists.")
    }
}

export default BandExisting