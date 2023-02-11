import env from "./validateEnv";
import { v2 as cloudinary } from 'cloudinary'

type Image = {
    url: string,
    publicId: string
}

export async function cloudUpload(image: any): Promise<Image> {
    cloudinary.config({
        cloud_name: env.CLOUD_NAME,
        api_key: env.API_KEY,
        api_secret: env.API_SECRET,
    });

    const options = {
        width: 300,
        height: 300,
        gravity: "faces",
        crop: "fill",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        folder: env.FOLDER_NAME,
    };

    const result = await cloudinary.uploader.upload(image.tempFilePath, options);

    return { url: result.url, publicId: result.public_id };


}