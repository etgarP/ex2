import ContactImage from "../contactImage"
import ContactName from "../contactName"
import Date from "./date"
import LastMessage from "./lastMassage"
import { applyMessagesListed } from './getMessages.js'
import { useNavigate } from 'react-router-dom'
import { socket } from "../../sockets/socket"
import { useEffect } from "react"
import Badge from './badge.js'
import { useState } from 'react'

function ListedContact(props) {
    const [ badge, setBadge ] = useState(0)
    const { contactId, id, picture, contactName, date = "", lastMessage = "", setContactId, upH, setContacts, user } = props
    const navigate = useNavigate()
    useEffect(()=>{ //todo =
        const handleHello = (sentId) => {
            if(id===sentId&&id!=contactId){
                setBadge(badge + 1)
                console.log('inside ', contactName)
            }
            console.log('outside')

        }
        socket.on('idmsg', handleHello)
        return () => {
            // Unregister event listeners and disconnect socket
            socket.off('idmsg', handleHello);
          };
          
    })
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
                            <Badge unReadNum={badge} setNum={setBadge} contactId={contactId} id={id} />
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