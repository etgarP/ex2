import { useState } from "react"
import Username from "./user-name"
import Password from "./password"
import { useNavigate } from 'react-router-dom'
import { postReq } from '../../../postReq.js'
import { getReq } from '../../../getReq.js'

function Form({ setUser, setContacts }) {
    // needed to use navigate in and inner function context
    const navigate = useNavigate()
    // saves the name password and error
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // checks if the details are correct and if so connects to chat page and saves user info
    async function handleSubmit(e) {
        e.preventDefault()
        async function getChats() {
            try {
                const url = "http://localhost:12345/api/Chats"
                var res = await getReq(url, user.token);
                if (res.status === 401) {
                    console.log("Unauthorized token.")
                    window.alert("Authorization expired. Please log in again.")
                }
                var gotten = await res.json();
                if (Array.isArray(gotten)) {
                    setContacts(gotten);
                } else {
                    // Handle the case where the response is not a valid array
                    console.error("Invalid data format: ", gotten);
                }
            } catch (error) {
                console.log(error)
            }
        }

        const data = { username: name, password: password }
        try {
            const url = "http://localhost:12345/api/Tokens"
            var res = await postReq(data, url)
            if (res.status === 409) {
                window.alert("User doesnt exists.")
                return;
            } else if (res.status === 400) {
                console.log("Invalid request parameters");
                window.alert("User doesnt exists.")
                return;
            } else if (!res.ok) {
                return;
            }
            const token = (await res.text()).trim()
            const url2 = `http://localhost:12345/api/Users/${name}`
            var res2 = await getReq(url2, token)
            if (res2.status === 401) {
                console.log("Unauthorized token.")
                window.alert("Authorization expired. Please log in again.")
                return;
            } else if (res2.status === 404) {
                console.log("User not found");
                return;
            }
            var user = await res2.json()
            user = { ...user, token: token };
            if (res2.ok) {
                setUser(user)
                navigate('/chat')
                getChats();
                return;
            } else {
                setError("Wrong Credentials")
                return;
            }
        } catch (error) {
            console.error('Error', error)
            setError("Oops! Our server seems to be taking a coffee break ☕️. We're working hard to fix it and get things back on track. Please bear with us and try again shortly. Thank you for your patience!")
        }
    }

    // the form itself
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