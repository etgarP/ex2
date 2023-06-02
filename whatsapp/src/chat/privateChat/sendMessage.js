import { useRef, useState } from "react"
import { postReqAuthorized } from "../../postReq"
import { applyMessages } from "../contactsList/getMessages"
import { getReq } from "../../getReq"

function SendMessage(props) {
    const { user, setContacts, contactId } = props
    const inputRef = useRef(null)
    const [value, setValue] = useState("")
    // enter sends the message
    // sending the message when pressing on button/enter
    const reGetContacts = async () => {
        try {
            const url = "http://localhost:12345/api/Chats"
            var res = await getReq(url, user.token)
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
            throw error
        }
    }
    const sendButtonHandler = async () => {
        if (inputRef.current.value.trim() !== '') {
            let message = inputRef.current.value.trim();
            const newMessage = { msg: message }
            try {
                const url = `http://localhost:12345/api/Chats/${contactId}/Messages`
                var res = await postReqAuthorized(newMessage, url, user.token)
                if(res.status===400){
                    window.alert("Invalid request parameters.") 
                } else if (res.status === 401) {
                    console.log("Unauthorized token.")
                    window.alert("Authorization expired. Please log in again.")
                } else if (res.status === 404) {
                    window.alert("There is no such chat.")
                }
            } catch (error) {
                console.log("error in sendMessage.js", error)
                throw error
            }
            setValue("")
            await reGetContacts();
            applyMessages(user, contactId, setContacts)
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            sendButtonHandler()
        }
    }
    return (
        <div className="input-group message-box" id="send-text">
            {/* message textbox */}
            <input type="text" className="form-control write-message-box" placeholder="New message here..." ref={inputRef}
                value={value} onChange={(ev) => { setValue(ev.target.value) }} onKeyDown={handleKeyDown}
                aria-label="Recipient's username with two button addons"></input>
            {/* send icon button*/}
            <button type="button" className="icon-button" onClick={sendButtonHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                    className="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
            </button>
        </div>
    )
}

export default SendMessage