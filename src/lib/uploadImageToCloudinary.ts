export async function uploadImageToCloudinary(ImageFile: File) {
    const formData = new FormData();
    formData.append('file', ImageFile);
    formData.append('upload_preset', 'blog-posts'); // Replace with your upload preset

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,{
        method:"POST",
        body:formData
    })

    if(!res.ok){
        throw new Error("failed to upload image")
    }
    const data = await res.json()
    return data.secure_url as string
}