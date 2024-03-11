import React, { useRef, useState } from 'react'
import './ImageGenerator.css';
import default_img from '../Assets/default_image.svg';
const ImageGenerator = () => {

    const [image_url, setImageUrl] = useState("/");
    let inputRef = useRef(null);

    const imageGenerator = async ()=>{
        if(inputRef.current.value===""){
            return 0;
        }
        const response =await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers :{
                    "Content-type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent" : "Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );

        let data = await response.json();
        let data_array = data.data;
        setImageUrl(data_array[0].url);

    }

  return (
    <div className='ai-img-generator'>
        <div className='header'>AI Image <span>Generator</span></div>
        <div className='img-loading'>
            <div className='image'><img style={{width:"300px", height:"300px"}} src={image_url ==="/"?default_img : image_url} alt="" /></div>
        </div>
        <div className='search-box'>
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
            <div className='generate-btn' onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator