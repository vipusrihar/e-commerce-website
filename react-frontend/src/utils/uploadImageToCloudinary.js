const upload_preset = "online_Food"
const cloud_name = "dymiyk4zl"
const apiUrl = "https://api.cloudinary.com/v1_1/dymiyk4zl/image/upload";


export const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset",upload_preset);
    data.append("cloud_name",cloud_name);

    const res = await fetch (apiUrl, {
        method :"POST",
        body : data
    });

    const fileData = await res.json();
    return fileData.url;
}