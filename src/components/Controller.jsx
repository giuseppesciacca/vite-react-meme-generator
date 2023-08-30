export default function Controller(props) {

    return (
        <section id='controller_text_container'>
            <h6>Which text do you want to move?</h6>

            <div className="d-flex justify-content-center gap-3">
                <div class="form-check">
                    <input type="radio" className="form-check-input" name="topOrBottom" onClick={props.funcChoiceWichText} value="top" id='top' defaultChecked={props.texPosTop === 'top'} disabled={props.memeTextTopLength === 0 ? true : ''} />
                    <label htmlFor="top" className="form-check-label" >Top</label>
                </div>
                <div class="form-check">
                    <input type="radio" className="form-check-input" name="topOrBottom" id="bottom" onClick={props.funcChoiceWichText} value="bottom" defaultChecked={props.texPosTop === 'bottom'} disabled={props.memeTextBottomLength === 0 ? true : ''} />
                    <label htmlFor="top" className="form-check-label">Bottom</label>
                </div>
            </div>
            {/* /radio-button */}

            <div id="controller_button_container">
                <button className='btn_violet btn_controller' id='button_top' onClick={props.funMoveText}>↑</button>
                <br />
                <button className='btn_violet btn_controller' id='button_left' onClick={props.funMoveText}>←</button>
                <button className='btn_violet btn_controller' id='button_right' onClick={props.funMoveText}>→</button>
                <br />
                <button className='btn_violet btn_controller' id='button_bottom' onClick={props.funMoveText}>↓</button>
            </div>
            {/* /#controller_button_container */}
        </section>
    )
}