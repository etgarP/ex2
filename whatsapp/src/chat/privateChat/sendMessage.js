import { useRef, useState } from "react"

let newMessageId = 1

function SendMessage(props) {
    const { setContacts, contactId } = props
    const inputRef = useRef(null)
    const [value, setValue] = useState("")
    // enter sends the message
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            sendButtonHandler()
        }
    }
    // sending the message when pressing on button/enter
    const sendButtonHandler = () => {
        if (inputRef.current.value.trim() !== '') {
            // creating info on message put in array
            const date = new Date()
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
            const currentDateTime = `${date.toLocaleDateString()} ${currentTime}`
            const newMessage = { id: newMessageId++, content: inputRef.current.value, side: 'right', date: currentDateTime }
            // puts the message info in the array of the person by the contactId (active person)
            setContacts(prevContacts => {
                const newContacts = prevContacts.map(contact => {
                    if (contactId === contact.id) {
                        const updatedMesages = [...contact.messages, newMessage]
                        return { ...contact, messages: updatedMesages }
                    }
                    return contact
                })
                return newContacts
            })
            // deletes the input value
            setValue("")
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