import { useState } from 'react';
import InputText from './InputText';
import Meme from './Meme';

export default function Main() {
    const [meme, setMeme] = useState({
        textTop: '',
        textBottom: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg',
    });

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
                    <InputText memeTextTop={meme.textTop} memeTextBottom={meme.textBottom} funChangeText={changeText} />
                </div>

                <Meme meme={meme} setMeme={setMeme} />
            </div>
        </main >
    )
}