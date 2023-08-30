export default function InputText(props) {
    return (
        <>
            <div className="col">
                <div className="input-group mb-3">
                    <input id='text_top' className="form-control w-100" type="text" name="textTop" value={props.memeTextTop} placeholder="Text top" onChange={props.funChangeText} />
                </div>
            </div>

            <div className="col">
                <div className="input-group mb-3">
                    <input id='text_bottom' className="form-control w-100" type="text" name="textBottom" value={props.memeTextBottom} placeholder="Text bottom" onChange={props.funChangeText} />
                </div>
            </div>
        </>
    )
}