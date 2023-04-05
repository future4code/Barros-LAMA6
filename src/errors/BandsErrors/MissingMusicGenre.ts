import CustomError from "../CustomError";

class MissingMusicGenre extends CustomError {
    constructor(){
        super(422, "Music genre required.")
    }
}

export default MissingMusicGenre