export const checkImage = (file) => {
    let err = "";
    if(!file){
        return err = "File does not exist.";
    }
//?1 mb
    if(file.size > 1024 * 1024){
         return (err = "File size must be less than 1 Mb.");
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      return (err = "Image must be jpeg or png.");
    }

    return err;
}

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const formData = new FormData();

        if(item.camera){
            formData.append("file", item.camera);
        }else{
            formData.append("file", item);  
        }

        let x = Math.floor(Math.random() * 10000);
        // var pi = String(generateString(5));
        formData.append("upload_preset", "WCEACHIEVEMENTS");
        formData.append("public_id", "test"+x);
        formData.append("api_key", "712178238192867");
        // formData.append("signature", "bfd09f95f331f558cbd1320e67aa8d488770583e");


        await fetch("https://api.cloudinary.com/v1_1/dcnzisojf/image/upload", {
            method: "POST",
            body: formData
        }).then(async (res)=>{
            const data = await res.json();
            console.log(data);
            imgArr.push({ public_id: data.public_id, url: data.secure_url });
        }).catch((err)=>{
            console.log(err)
            imgArr.push({ public_id: x, url: "Error in Uploading images" });
        })
        
      
    }
    return imgArr;
}