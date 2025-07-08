const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const apiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file) => {

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);

    try {
        const res = await fetch(apiUrl, { method: "POST", body: data, });

        if (!res.ok) {
            throw new Error("Image upload failed");
        }

        const fileData = await res.json();
        return fileData.url;
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        return null;
    }
};
