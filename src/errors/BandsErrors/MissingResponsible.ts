import CustomError from "../CustomError";

class MissingResponsible extends CustomError {
    constructor(){
        super(422, "Responsible required.")
    }
}

export default MissingResponsible