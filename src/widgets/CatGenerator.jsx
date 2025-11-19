import { useState, useEffect } from 'react'
import '../styles/CatGenerator.css'

const imageURL = 'https://cataas.com/cat';

export default function CatGenerator() {
    const [img, setImg] = useState(null);

    async function fetchData() {
        const result = await fetch(imageURL);
        const imageBlob = await result.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
        console.log(result);
    }

    function handleClick(e) {
        e.stopPropagation();
        fetchData();
    }

    return (
        <div className='cat-generator-div'>
            <img className='image-cat' src={img} alt='a cute image of a cat'></img>
            <button className='generateCatButton' onClick={(e) => handleClick(e)}>Generate cat pic!!!</button>
        </div>
    );
}