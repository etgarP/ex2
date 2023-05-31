import ContactImage from "../contactImage"
import ContactName from "../contactName"
import Date from "./date"
import LastMessage from "./lastMassage"
import defaultUserAvatar from '../pictures/default-avatar.jpg'
import { getReq } from "../../getReq"

function ListedContact(props) {
    const { id, picture, contactName, date = "", lastMessage = "", setContactId, upH, setContacts1, contacts1, user } = props
    function setMesseges() {

    }
    async function getMesseges(id) {
        try {
            const url = `http://localhost:5000/api/Chats/${id}/Messages`
            var res = await getReq(url, user.token);
            var data = await res.json();
            if (Array.isArray(data)) {
                return data;
            } else {
                // Handle the case where the response is not a valid array
                console.error("Invalid data format: ", data);
            }
        } catch (error) {

        }
    }
    // change the contact to the contact chosen
    const changeContact = async () => {
        var messages = await getMesseges(id)
        setContacts1(contacts1 => {
            const index = contacts1.findIndex(contact => contact.id === id);
            if (index !== -1) {
                const updatedContact = {
                    ...contacts1[index],
                    messages: messages
                };
                const updatedContactsList = [
                    ...contacts1.slice(0, index),
                    updatedContact,
                    ...contacts1.slice(index + 1)
                ];
                return updatedContactsList;
            }
            return contacts1;
        });
        console.log(contacts1)
        console.log(contacts1[0].messages)
        // console.log(contacts1[0].messages[0].content)
        // console.log(contacts1[0].messages[0].created)
        // console.log(contacts1[0].messages[0].id)
        // if (contacts1[0].messages[0].sender != null)
        //     console.log(contacts1[0].messages[0].sender.username)
        setContactId(id)
    }
    return (
        // the contacted list person which is a button
        <button type={`button`} className={`list-group-item list-group-item-action person no-border-radius`}
            onClick={changeContact} onMouseMove={upH}>
            <div className="row">
                <div className={`row`}>
                    {/* the image of the contact */}
                    <ContactImage picture={picture}></ContactImage>
                    <div class="col desc-col">
                        <div class="row">
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