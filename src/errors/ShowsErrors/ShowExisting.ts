import CustomError from "../CustomError";

class ShowExisting extends CustomError {
    constructor(){
        super(409, "This band's show already exists.")
    }
}

export default ShowExisting