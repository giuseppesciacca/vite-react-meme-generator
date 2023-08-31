import { useState, useEffect, useRef } from 'react';
import Controller from './Controller';

export default function Meme(props) {
    const [allMemeImages, setAllMemeImages] = useState([]);

    /**
     * populating array allMemeImages
     */
    useEffect(() => {
        let ignore = false;
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            if (!ignore) {
                setAllMemeImages(data.data.memes);
            }
        };

        getMemes();

        return () => {
            ignore = true;
        };

    }, []);

    /**
    * onClick change Img on screen
    */
    function getRandomImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length);

        const newUrlImg = allMemeImages[randomNumber].url;

        props.setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: newUrlImg
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

    const memeRef = useRef(null);

    /**
     * 
     */
    function downloadMeme() {

        htmlToImage.toJpeg(memeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'my-meme-name.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

    return (
        <>
            <div className='container position-relative'>
                <button onClick={getRandomImage} className="btn_violet w-75 text-white p-2 rounded-2 mb-3">Get a new meme image</button>

                <div id='meme' ref={memeRef} className='mb-3'>
                    <img className='preview img-fluid text-center' src={props.meme.randomImage} alt="" />

                    <p style={{ top: textPosition.text_top.top, left: textPosition.text_top.left }} className='position-absolute meme__top meme__text w-auto'>{props.meme.textTop} </p>

                    <p style={{ bottom: textPosition.text_bottom.top, left: textPosition.text_bottom.left }} className='meme__bottom meme__text position-absolute w-auto'>{props.meme.textBottom} </p>
                </div>
                {/* /#meme */}
            </div>

            {(props.meme.textTop.length > 0 || props.meme.textBottom.length > 0) &&
                <Controller funcChoiceWichText={choiceTopOrBottomText} texPosTop={textPosition.topOrBottom} memeTextTopLength={props.meme.textTop.length} memeTextBottomLength={props.meme.textBottom.length} funMoveText={moveText} />
            }

            <button className='btn_violet text-white rounded-2' onClick={downloadMeme}>Download meme</button>
        </>
    )
}