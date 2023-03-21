import CustomError from "../CustomError";

class MissingGetBandInfos extends CustomError {
    constructor(){
        super(422, "Band name or band id required to get the band details.")
    }
}

export default MissingGetBandInfos