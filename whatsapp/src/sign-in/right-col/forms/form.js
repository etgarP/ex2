import { useState } from "react"
import Username from "./user-name"
import Password from "./password"
import { useNavigate } from 'react-router-dom'
import {postReq} from './postReq.js'

function Form({ users, setUser }) {
    // needed to use navigate in and inner function context
    const navigate = useNavigate()
    // saves the name password and error
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    // checks if the details are correct and if so connects to chat page and saves user info
    async function handleSubmit(e) {
        e.preventDefault()
        const data = { username: username, password : password }
        
        try {
            var res = await postReq(data, "http://localhost:5000/api/Tokens");
            console.log(res.status)
            const token = (await res.text()).trim()
            console.log(token)
            if (res.ok) {
                // setUser({username, token})
                navigate('/chat')
            } else {
                setError('Wrong Credentials')
            }
        } catch (error){
            console.error('Error', error)
            setError('An error occured. Please try again.')
        }
        
        // const user = users.find(user => user.name === name && user.password === password)
        // if (user) {
        //     setUser(user)
        //     // changes the page
        //     navigate('/chat')
        // }
        // else {
        //     // says wrong credentials in the bottom of the page
        //     setError("Wrong Credentials")
        // }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Username setUsername={setUsername}></Username>
            <Password setPassword={setPassword}></Password>
            <button type="submit" className="btn btn-primary">Login</button>
            <br />
            <small id="passwordHelpBlock" className="form-text text-danger small-txt">{error}</small>
        </form>
    )
}
export default Form