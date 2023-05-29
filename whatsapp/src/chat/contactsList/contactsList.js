import ListedContact from "./listedContact"

function ContactsList(props) {
    const { contacts, setContactId, upH } = props
    // creates an array of contacts list
    const mappedarray = contacts.map(contact =>
        <ListedContact
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