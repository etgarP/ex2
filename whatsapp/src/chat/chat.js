import TopLeft from './topLeft/topLeft'
import TopRight from './topRight'
import PrivateChat from './privateChat/privateChat'
import { useState, useRef, useEffect } from 'react'
import './chat.css'
import ContactsList from './contactsList/contactsList'

function Chat(props) {
    const { user, setUser, middleElement, setContacts1, contacts1 } = props
    const [contacts, setContacts] = useState([])
    const [contactId, setContactId] = useState(-1)
    const topElem = useRef(null)
    const bottom = useRef(null)
    const [elementHeight, setElementHeight] = useState(0)
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
    })

    return (
        <>
            <div className='chat-area'>
                <div className="row row-cols-2 no-margin" ref={topElem}>
                    {/* TopLeft holds the user info from login*/}
                    <TopLeft token={user.token} picture={user.profilePic} displayName={user.displayName} setContacts1={setContacts1} contacts1={contacts1} setUser={setUser}></TopLeft>
                    {/* TopRight holds the info of contact we talk to */}
                    <TopRight contacts1={contacts1} contactId={contactId} user={user} setContacts1={setContacts1}></TopRight>
                </div>
                <div className="row row-cols-2 no-margin" ref={bottom} style={{ height: `${elementHeight}px` }}>
                    <div className="col-5 no-padding" id='bottom-left'>
                        <div className="list-group">
                            {/* ContactsList holds the list of all contacts */}
                            <ContactsList contacts1={contacts1} setContactId={setContactId} setContacts1={setContacts1} upH={updateHeight} user={user}></ContactsList>
                        </div>
                    </div>
                    {/* PrivateChat holds the whole chat section */}
                    <PrivateChat user={user} setContacts1={setContacts1} contacts1={contacts1} setContacts={setContacts} contactId={contactId} contacts={contacts}></PrivateChat>
                </div>
            </div>
        </>
    )
}

export default Chat
