import Message from "./message"
import SendMessage from "./sendMessage"
import background from "../pictures/whotsApp.png"

function PrivateChat(props) {
    const { setContacts, contactId, contacts } = props
    const contact = contacts.find(contact => contact.id === contactId)
    // default background when no contact was chosen yet
    if (!contact) {
        return (
            <div className="col-7 right-side whots-container" id='bottom-right'>
                <img src={background} className="background-img" />
            </div>
        )
    }
    // creates chat log in the chat
    const mappedarray = contact.messages.map(message =>
        <Message
            key={message.id}
            content={message.content}
            side={message.side}
        ></Message>)
    return (
        <div className="col-7 right-side" id='bottom-right'>
            <div className="page-within">
                <section className="message-rapper">
                    {/* prints the chat log */}
                    {mappedarray}
                </section>
            </div>
            {/* send message area */}
            <SendMessage setContacts={setContacts} contactId={contactId}></SendMessage>
        </div>
    )
}
export default PrivateChat