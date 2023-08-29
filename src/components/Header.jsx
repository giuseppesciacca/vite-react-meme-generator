import trollFace from '../assets/images/troll-face.png'

export default function Header() {

    return (
        <header id='app_header' className='d-flex align-items-center px-5 text-white'>
            <img src={trollFace} alt="troll Face meme" />
            <h1 className='ps-3 me-auto'>Meme Generator</h1>

            <h5>React Course - Project 3</h5>
        </header>
    )
}