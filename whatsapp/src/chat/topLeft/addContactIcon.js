import { useRef, useState } from "react"
import defaultProfilePicture from '../pictures/Default_ProfilePicture.png'
import { postReqAuthorized } from "../../postReq"
import { getReq } from "../../getReq"

function AddContactIcon(props) {
    const { setContacts1, token } = props
    const inputRef = useRef(null)
    const [value, setValue] = useState("")
    // adding contact to contacts list
    async function getNewContacts(username) {
        try {
            const url = "http://localhost:5000/api/Chats"
            var res = await getReq(url, token)
            if (res.ok) {
                var newContacts = await res.json()
                const newContact = newContacts.find((contact)=>{
                    if(contact.user.username===username){
                        return contact
                    }
                })
                setContacts1((prevContacts) => ([...prevContacts, newContact]))

            } else {
                //todo
            }
        } catch (error) {

        }
    }

    async function addPersonToServer(input) {
        try {
            const url = "http://localhost:5000/api/Chats"
            const data = { username: input }
            var res = await postReqAuthorized(data, url, token)
            //todo delete
            if (res.ok) {
                window.alert("person added successfully");
            } else if (res.status === 400) {
                window.alert("Wrong username");
            } else if (res.status === 401) {
                window.alert("Unauthorized token. Please refresh the page and start again.");
            } else {
                //todo
            }
            return res.ok
        } catch (error) {
            // console.error('Error', error)
            // setError("Oops! Our server seems to be taking a coffee break ☕️. We're working hard to fix it and get things back on track. Please bear with us and try again shortly. Thank you for your patience!")
        }
    }


    const addPersonButtonHandler = async () => {
        let input = inputRef.current.value
        if (input) {
            let ok = addPersonToServer(input)
            if(ok){
                getNewContacts(input)
            }
            setValue("")
        }
    }


    return (
        <div className="col-2 center align-right">
            {/* Add person icon modal */}
            <button className="icons-background no-border" type="button" data-bs-toggle="modal" data-bs-target="#addPersonModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-add no-borderFicon" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                </svg>
            </button>
            {/* Modal */}
            <div className="modal fade" id="addPersonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add new contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/* Input */}
                        <div className="modal-body">
                            <input className="full-width" placeholder="Contact's identifier" ref={inputRef}
                                value={value} onChange={(ev) => { setValue(ev.target.value) }}></input>
                        </div>
                        {/* Add button */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addPersonButtonHandler}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddContactIcon