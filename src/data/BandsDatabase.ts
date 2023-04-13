import Band from "../model/Bands/Band";
import BaseDatasabe from "./BaseDatabase";

class BandsDatabase extends BaseDatasabe {
    TABLE_NAME = "lama_bands"

    createBand = async (newBand: Band) => {
        await BandsDatabase.connection(this.TABLE_NAME).insert(newBand)
    }

    findBandByName = async (name: string) => {
        return await BandsDatabase.connection(this.TABLE_NAME).select("*").whereLike("name", name)
    }

    findBandById = async (bandId: string) => {
        return await BandsDatabase.connection(this.TABLE_NAME).select("*").whereLike("id", bandId)
    }
}

export default BandsDatabase