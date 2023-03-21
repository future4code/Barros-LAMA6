import CustomError from "../CustomError";

class InvalidRole extends CustomError {
    constructor(){
        super(422, "Role must be 'admin' or 'normal'.")
    }
}

export default InvalidRole