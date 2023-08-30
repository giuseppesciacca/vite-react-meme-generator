export default function Controller(props) {

    return (
        <div id='controller_text_container'>
            <p>Wich text you wanna move?</p>

            <input type="radio" name="topOrBottom" onClick={props.funcChoiceWichText} value="top" id='top' defaultChecked={props.texPosTop === 'top'} disabled={props.memeTextTopLength === 0 ? true : ''} />
            <label htmlFor="top" className="me-3" >Top</label>

            <input type="radio" name="topOrBottom" id="bottom" onClick={props.funcChoiceWichText} value="bottom" defaultChecked={props.texPosTop === 'bottom'} disabled={props.memeTextBottomLength === 0 ? true : ''} />
            <label htmlFor="top">Bottom</label>

            <br />

            <button className='btn_violet btn_controller' id='button_top' onClick={props.funMoveText}> ↑ </button>
            <br />
            <button className='btn_violet btn_controller' id='button_left' onClick={props.funMoveText}>←</button>
            <button className='btn_violet btn_controller' id='button_right' onClick={props.funMoveText}>→</button>
            <br />
            <button className='btn_violet btn_controller' id='button_bottom' onClick={props.funMoveText}>↓</button>
        </div>
    )
}