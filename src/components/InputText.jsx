export default function InputText(props) {
    return (
        <>
            <div className="col">
                <input id='text_top' className="w-100" type="text" name="textTop" value={props.memeTextTop} placeholder="Text top" onChange={props.funChangeText} />
            </div>

            <div className="col">
                <input id='text_bottom' className="w-100" type="text" name="textBottom" value={props.memeTextBottom} placeholder="Text bottom" onChange={props.funChangeText} />
            </div>
        </>
    )
}