import { useRef, useState } from "react"
import { deleteReq } from "../deleteReq"
import { getReq } from "../getReq"

function DeleteContactIcon(props) {
    const { setContacts1, contacts1, token, contactId } = props
    const inputRef = useRef(null)
    const [value, setValue] = useState("")
    // deletes contact from contacts list
    async function deletePersonFromServer(id) {
        try {
            const url = `http://localhost:5000/api/Chats/${id}`
            const data = { id: id }
            var res = await deleteReq(data, url, token)
            if (res.ok) {
            } else {
                //todo
            }
            return res.ok
        } catch (error) {
            //todo
        }
    }

    const reGetContacts = async () => {
        try {
            const url = "http://localhost:5000/api/Chats"
            var res = await getReq(url, token);
            var gotten = await res.json();
            if (Array.isArray(gotten)) {
                setContacts1(gotten);
            } else {
                // Handle the case where the response is not a valid array
                console.error("Invalid data format: ", gotten);
            }
        } catch (error) {

        }
    }

    const deletePersonButtonHandler = async () => {
        let ok = await deletePersonFromServer(contactId)
        if(ok){
            reGetContacts()
        }
        setValue("")
    }
    return (
        <div className="col-2 center align-right">
            {/* Delete person icon modal */}
            <button onClick={deletePersonButtonHandler} className="icons-background no-border" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-dash no-borderFicon" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                </svg>
            </button>
        </div>
    )
}
export default DeleteContactIcon