import Show from "../model/Shows/Show";
import BaseDatasabe from "./BaseDatabase";

class ShowsDatabase extends BaseDatasabe {
    TABLE_NAME = "lama_shows"

    getAllShows = async () => {
        return await ShowsDatabase.connection(this.TABLE_NAME).select("*")
    }

    createShow = async (newShow: Show) => {
        await ShowsDatabase.connection(this.TABLE_NAME).insert(newShow)       
    }
    
    findShow = async (bandId: string) => {
        return await ShowsDatabase.connection(this.TABLE_NAME).select("*").where("band_id", bandId)        
    }

    getFestivalDaySchedule = async (weekDay: string) => {
        return await ShowsDatabase.connection(this.TABLE_NAME).select("lama_bands.name", "lama_bands.music_genre")
        .where("week_day", weekDay)
        .join("lama_bands", "band_id", "=", "lama_bands.id")
        .orderBy("start_time")
    }
}

export default ShowsDatabase