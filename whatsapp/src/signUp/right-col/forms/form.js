import ConfirmPassword from "./confirmPassword"
import DisplayName from "./displayName"
import Password from "./password"
import Picture from "./picture"
import Username from "./username"
import { useState } from "react"
import {
    validateUsername, validatePassword, validateConfirmPass, validateDisplayName,
    validatePicture
} from "./submitFuncs.js"
import { useNavigate } from 'react-router-dom'

function Form({ users, setUsers }) {
    // needed to use the function in an inner function context
    const navigate = useNavigate()
    //sets states for all of the fields
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [picture, setPicture] = useState('')
    // sets the state for the explanation lines for all of the fields
    const [reqUText, setRUText] = useState("Your username must be 5-20 characters long, and may contain letters, numbers and '_'.")
    const [reqCpText, setCpText] = useState("Must match entered password.")
    const [reqDnext, setDnText] = useState("Your Displayname must be 3-20 characters long, and may contain letters, numbers and spaces")
    const [reqPiText, setPiText] = useState("You must upload a picture of the following formats: .jpg, .jpeg, .png, with a max size of 5MB.")
    const [reqPext, setPText] = useState("Your password must be 8-20 characters long, must contain a uppercase letter, lower case charecter and a number.")
    // on submit, if the input are valid, saves them and go to sign in page
    function handleSubmit(e) {
        e.preventDefault()
        // check the field is valid and changes the explanation text if its not valid
        var nameFlag = validateUsername(name, users, setRUText)
        var passFlag = validatePassword(password, setPText)
        var cPassFlag = validateConfirmPass(password, cPassword, setCpText)
        var dNameFlag = validateDisplayName(displayName, setDnText)
        var picFlag = validatePicture(picture, setPiText)

        // if all are valid, we add the details and move to sign in page
        if (nameFlag && passFlag && cPassFlag && dNameFlag && picFlag) {
            const newUser = {
                name: name, password: password,
                displayName: displayName, picture: picture
            }
            setUsers([...users, newUser])
            // goes to sign in
            navigate('/')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {/* all of the fields */}
            <Username text={reqUText} setText={setRUText} value={name} set={setName} name={name}></Username>
            <Password text={reqPext} setText={setPText} value={password} set={setPassword}></Password>
            <ConfirmPassword text={reqCpText} setText={setCpText} value={cPassword} set={setCPassword}></ConfirmPassword>
            <DisplayName text={reqDnext} setText={setDnText} value={displayName} set={setDisplayName}></DisplayName>
            <Picture text={reqPiText} setText={setPiText} value={picture} set={setPicture}></Picture>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    )
}
export default Form