import ListedContact from "./listedContact"
import { getReq } from "../../getReq"

function ContactsList(props) {
    const { contacts, setContactId, upH } = props 
    //todo 
    // , token
    // async function getContacts(){
    //     try {
    //         const token = (await res.text()).trim()
    //         const url = "http://localhost:5000/api/Users/Chats" 
    //         var res = await getReq(url, token) 
    //         const array = await res.json()
    //         console.log(array)
    //         // if (res.ok) {
    //         //     return;
    //         // } else {
    //         //     setError("Wrong Credentials")
    //         //     return;
    //         // }
    //     } catch (error){
    //         // console.error('Error', error)
    //         // setError("Oops! Our server seems to be taking a coffee break ☕️. We're working hard to fix it and get things back on track. Please bear with us and try again shortly. Thank you for your patience!")
    //     }
    // }
    

    // creates an array of contacts list
    const mappedarray = contacts.map(contact =>
        <ListedContact
            key = {contact.id}
            id={contact.id}
            contactName={contact.contactName}
            picture={contact.picture}
            date={contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].date : ''}
            lastMessage={contact.messages.length > 0 ? contact.messages[contact.messages.length - 1].content : ''}
            setContactId={setContactId}
            upH={upH}
        ></ListedContact>)
    return (
        <>
            {/* prints an array of contacts list */}
            {mappedarray}
        </>
    )
}
export default ContactsList