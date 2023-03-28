import CustomError from "../CustomError";

class ShowNotExisting extends CustomError {
    constructor(){
        super(404, "This show does not exist.")
    }
}

export default ShowNotExisting