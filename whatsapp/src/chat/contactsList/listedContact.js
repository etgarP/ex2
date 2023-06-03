import ContactImage from "../contactImage"
import ContactName from "../contactName"
import Date from "./date"
import LastMessage from "./lastMassage"
import { applyMessagesListed } from './getMessages.js'
import { useNavigate } from 'react-router-dom'

function ListedContact(props) {
    const { id, picture, contactName, date = "", lastMessage = "", setContactId, upH, setContacts, user } = props
    const navigate = useNavigate()

    // change the contact to the contact chosen
    const changeContact = async () => {
        try {
            await applyMessagesListed(user, id, setContacts)
            setContactId(id)
        } catch (error) {
            window.alert("Disconnected, please log in.")
            navigate('/')
        }
    }
    return (
        // the contacted list person which is a button
        <button type={`button`} className={`list-group-item list-group-item-action person no-border-radius`}
            onClick={changeContact} onMouseMove={upH}>
            <div className="row">
                <div className={`row`}>
                    {/* the image of the contact */}
                    <ContactImage picture={picture}></ContactImage>
                    <div className="col desc-col">
                        <div className="row">
                            {/* the name of the contact */}
                            <ContactName contactName={contactName}></ContactName>
                            {/* the date of the last message the contact recieved */}
                            <Date date={date}></Date>
                        </div >
                        {/* the last message the contact recieved */}
                        <LastMessage lastMessage={lastMessage}></LastMessage>
                    </div>
                </div>
            </div>
        </button>
    )
}
export default ListedContact