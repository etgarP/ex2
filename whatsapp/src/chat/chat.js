import TopLeft from './topLeft/topLeft'
import TopRight from './topRight'
import PrivateChat from './privateChat/privateChat'
import { useState, useRef, useEffect } from 'react'
import './chat.css'
import ContactsList from './contactsList/contactsList'
import { getReq } from '../getReq'

function Chat(props) {
    const { user, setUser, middleElement } = props
    const [contacts, setContacts] = useState([])
    const [contactId, setContactId] = useState(-1)
    const topElem = useRef(null)
    const bottom = useRef(null)
    const [elementHeight, setElementHeight] = useState(0)
    const [contacts2, setContacts2] = useState([])
    // adjust the height to fill the area
    const updateHeight = () => {
        const newHeight = middleElement.current.offsetHeight - topElem.current.offsetHeight
        setElementHeight(newHeight)
    }
    // adjusting the height and resizing on each render
    useEffect(() => {
        updateHeight()
        window.addEventListener('resize', updateHeight)
        return () => {
            window.removeEventListener('resize', updateHeight)
        }
    }, [])

    async function getChats() {
        try {
            const url = "http://localhost:5000/api/Chats"
            var res = await getReq(url, user.token);
            var gotten = await res.json();
            if (Array.isArray(gotten)) {
                setContacts2(gotten);
            } else {
                // Handle the case where the response is not a valid array
                console.error("Invalid data format: ", gotten);
            }
        } catch (error) {

        }
    }
    getChats();

    return (
        <>
            <div className='chat-area'>
                <div className="row row-cols-2 no-margin" ref={topElem}>
                    {/* TopLeft holds the user info from login*/}
                    <TopLeft picture={user.profilePic} displayName={user.displayName} setContacts={setContacts} setUser={setUser}></TopLeft>
                    {/* TopRight holds the info of contact we talk to */}
                    <TopRight contacts={contacts} contactId={contactId}></TopRight>
                </div>
                <div className="row row-cols-2 no-margin" ref={bottom} style={{ height: `${elementHeight}px` }}>
                    <div className="col-5 no-padding" id='bottom-left'>
                        <div className="list-group">
                            {/* ContactsList holds the list of all contacts */}
                            <ContactsList contacts={contacts} setContactId={setContactId} upH={updateHeight}></ContactsList>
                        </div>
                    </div>
                    {/* PrivateChat holds the whole chat section */}
                    <PrivateChat setContacts={setContacts} contactId={contactId} contacts={contacts}></PrivateChat>
                </div>
            </div>
        </>
    )
}

export default Chat
