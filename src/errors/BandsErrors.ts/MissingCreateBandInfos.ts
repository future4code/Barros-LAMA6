import CustomError from "../CustomError";

class MissingCreateBandInfos extends CustomError {
    constructor(){
        super(422, "User token, band name, band music genre and band responsible required.")
    }
}

export default MissingCreateBandInfos