import CustomError from "../CustomError";

class MissingCreateBandInfos extends CustomError {
    constructor(){
        super(422, "Band name, band music genre and band responsible required.")
    }
}

export default MissingCreateBandInfos