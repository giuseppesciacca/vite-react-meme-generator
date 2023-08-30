import { useState, useEffect, useRef } from 'react';
import InputText from './InputText';
import Controller from './Controller';

export default function Meme() {
    const [meme, setMeme] = useState({
        textTop: '',
        textBottom: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg',
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

    const [textPosition, setTextPosition] = useState({
        text_top: {
            top: 0,
            left: 0
        },
        text_bottom: {
            top: 0,
            left: 0
        },
        topOrBottom: ''
    });

    /**
     * 
     * @param {*} e 
     */
    function choiceTopOrBottomText(e) {
        let isTopOrButton = e.target.value

        setTextPosition(prevTextPosition => ({
            ...prevTextPosition,
            topOrBottom: isTopOrButton
        }))
    }

    /**
     * 
     */
    function moveText(e) {
        let id = (e.target.id);

        const textPositionOnChange = {
            'button_top': { top: -16, left: 0 },
            'button_right': { top: 0, left: -16 },
            'button_left': { top: 0, left: +16 },
            'button_bottom': { top: +16, left: 0 },
        }

        if (textPosition.topOrBottom === 'top' && textPositionOnChange[id]) {
            setTextPosition(prevtextPosition => ({
                ...prevtextPosition,
                text_top: {
                    ...prevtextPosition.text_top,
                    top: prevtextPosition.text_top.top + textPositionOnChange[id].top,
                    left: prevtextPosition.text_top.left - textPositionOnChange[id].left,
                }
            }))
        } else if (textPosition.topOrBottom === 'bottom' && textPositionOnChange[id]) {
            setTextPosition(prevtextPosition => ({
                ...prevtextPosition,
                text_bottom: {
                    ...prevtextPosition.text_bottom,
                    top: prevtextPosition.text_bottom.top - textPositionOnChange[id].top,
                    left: prevtextPosition.text_bottom.left - textPositionOnChange[id].left,
                }
            }))
        }
    }

    /**
     * 
     */
    function download() {

        const previewArea = document.querySelector('.preview');

        htmlToImage.toJpeg(previewArea)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'my-meme-name.jpeg';
                link.href = dataUrl;
                link.click();
            });

    }

    const memeRef = useRef(null);

    return (
        <main id="app_main" className="py-5">
            <div className="container text-center form">
                <div className="row row-cols-2 g-3 pb-3">
                    <InputText memeTextTop={meme.textTop} memeTextBottom={meme.textBottom} funChangeText={changeText} />
                </div>

                <button onClick={getRandomImage} className="btn_violet w-75 text-white p-2 rounded-2">Get a new meme image</button>

                <div ref={memeRef} id='meme' className=' position-relative'>
                    <img className='preview img-fluid text-center py-3' src={meme.randomImage} alt="" />

                    <p style={{ top: textPosition.text_top.top, left: textPosition.text_top.left }} className='position-absolute meme__top meme__text'>{meme.textTop} </p>

                    <p style={{ bottom: textPosition.text_bottom.top, left: textPosition.text_bottom.left }} className='meme__bottom meme__text position-absolute'>{meme.textBottom} </p>
                </div>

                {(meme.textTop.length > 0 || meme.textBottom.length > 0) &&
                    <Controller funcChoiceWichText={choiceTopOrBottomText} texPosTop={textPosition.topOrBottom} memeTextTopLength={meme.textTop.length} memeTextBottomLength={meme.textBottom.length} funMoveText={moveText} />
                }

                <button className='btn_violet text-white rounded-2' onClick={download}>Download meme</button>
            </div>
        </main >
    )
}