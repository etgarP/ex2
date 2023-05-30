import { useState } from "react"
import Username from "./user-name"
import Password from "./password"
import { useNavigate } from 'react-router-dom'
import { postReq } from './postReq.js'
import { getReq } from './getReq.js'

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
        try {
            var res = await postReq(data, "http://localhost:5000/api/Tokens");
            console.log(res.status)
            const token = (await res.text()).trim()
            const url = `http://localhost:5000/api/Users/${username}` 
            var res2 = await getReq(url, token) 
            console.log(res2.status)
            const user = await res2.json()
            if (res2.ok) {
                setUser(user)
                console.log(user)
                // navigate('/chat')
                return;
            } else {
                setError("Wrong Credentials")
                return;
            }
        } catch (error){
            // console.error('Error', error)
            setError("Oops! Our server seems to be taking a coffee break ☕️. We're working hard to fix it and get things back on track. Please bear with us and try again shortly. Thank you for your patience!")
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