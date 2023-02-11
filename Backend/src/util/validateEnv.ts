import { cleanEnv } from "envalid";
import { num, port, str } from "envalid/dist/validators";

export default cleanEnv(process.env,{

    DB_URL: str(),
    WEBSITE_URL: str(),
    APP_SECRET:str(),
    CLOUD_NAME:str(),
    API_KEY:str(),
    API_SECRET:str(),
    FOLDER_NAME:str(),

    SALT_ROUNDS: num(),

    PORT:port()

});