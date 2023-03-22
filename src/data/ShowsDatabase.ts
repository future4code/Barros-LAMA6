import Show from "../model/Shows/Show";
import BaseDatasabe from "./BaseDatabase";

class ShowsDatabase extends BaseDatasabe {
    TABLE_NAME = "lama_shows"

    createShow = async (newShow: Show) => {
        await ShowsDatabase.connection(this.TABLE_NAME).insert(newShow)       
    }
}

export default ShowsDatabase