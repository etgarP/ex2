import { useState } from "react"
import Username from "./user-name"
import Password from "./password"
import { useNavigate } from 'react-router-dom'

function Form({ setUser }) {
    // needed to use navigate in and inner function context
    const navigate = useNavigate()
    // saves the name password and error
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    // checks if the details are correct and if so connects to chat page and saves user info
    function handleSubmit(e) {
        e.preventDefault()
        var user = true;
        if (user) {
            setUser("")
            // changes the page
            navigate('/chat')
        }
        else {
            // says wrong credentials in the bottom of the page
            setError("Wrong Credentials")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Username setName={setName}></Username>
            <Password setPassword={setPassword}></Password>
            <button type="submit" className="btn btn-primary">Login</button>
            <br />
            <small id="passwordHelpBlock" className="form-text text-danger small-txt">{error}</small>
        </form>
    )
}
export default Form