import { useState, useEffect } from 'react';

export default function Meme() {
    const [meme, setMeme] = useState({
        textTop: '',
        textBottom: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    });

    const [allMemeImages, setAllMemeImages] = useState([]);

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
            .catch(err => console.error(err))
    }, []);

    /**
     * onClick change Img on screen
     */
    function getRandomImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length);

        const newUrlImg = allMemeImages[randomNumber].url;

        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: newUrlImg
        }));
    }

    /**
     * 
     * @param {object} event 
     */
    function changeText(event) {
        setMeme(prevMeme => ({
            ...prevMeme,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <main id="app_main" className="py-5">
            <div className="container text-center form">
                <div className="row row-cols-2 g-3 pb-3">
                    <div className="col">
                        <input id='text_top' className="w-100" type="text" name="textTop" value={meme.textTop} placeholder="Text top" onChange={changeText} />
                    </div>

                    <div className="col">
                        <input id='text_bottom' className="w-100" type="text" name="textBottom" value={meme.textBottom} placeholder="Text bottom" onChange={changeText} />
                    </div>
                </div>

                <button onClick={getRandomImage} className="w-75 text-white p-2 rounded-2">Get a new meme image</button>

                <div id='meme' className='position-relative'>
                    <img className='img-fluid text-center py-3' src={meme.randomImage} alt="" />
                    <p className='meme__top meme__text position-absolute'>{meme.textTop} </p>
                    <p className='meme__bottom meme__text position-absolute'>{meme.textBottom} </p>
                </div>
                {/* /#meme */}

            </div>
        </main>
    )
}