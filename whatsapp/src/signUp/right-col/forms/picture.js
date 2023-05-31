import { useState } from 'react'
function Picture({ value, set, text, setText }) {
    // sets the state using the value that changed
    const [picture, setPicture] = useState("");
    function setInfo(e) {
        const file = e.target.files[0]
        set(file)
        const fileReader = new FileReader();
        fileReader.onload = async function (event) {
            const base64Image = event.target.result;
            setPicture(base64Image);
        }
        fileReader.readAsDataURL(file);
    }
    // removes error text on click of the input
    function changeReq(e) {
        setText("You must upload a picture of the following formats: .jpg, .jpeg, .png, with a max size of 5MB.")
    }
    return (
        <>
            {/* Picture*/}
            <div className="mb-3">
                <label htmlFor="validationDefaultUsername">Picture</label>
                <input type="file" onClick={changeReq} onChange={setInfo} className="form-control" accept="image/*" id="formFile" required></input>
                <small id="passwordHelpBlock" className="form-text text-muted small-txt">
                    {text}
                </small>
            </div>
        </>
    )
}
export default Picture