import ListedContact from "./listedContact"

function ContactsList(props) {
  const { contacts, setContacts, setContactId, contactId, upH, user } = props

  if (Array.isArray(contacts)) {
    // mapping the contacts list
    const mappedarray = contacts.map((contact) => {

      // checking if has last massage. if it does-handle.
      var timeAndDate
      if (contact.lastMessage != null) {
        var dateString = contact.lastMessage.created;
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toLocaleDateString();
        const formattedTime = dateObject.toLocaleTimeString();
        timeAndDate = formattedDate + " " + formattedTime;
      }

      // adding contact to mapped array  
      return (
        <ListedContact
          key={contact.id}
          id={contact.id}
          contactId={contactId}
          contactName={contact.user.displayName}
          picture={contact.user.profilePic}
          date={contact.lastMessage ? timeAndDate : null}
          lastMessage={contact.lastMessage ? contact.lastMessage.content : null}
          setContactId={setContactId}
          upH={upH}
          setContacts={setContacts}
          contacts={contacts}
          user={user}
        />
      )
    })

    // the final contacts list
    return <>{mappedarray}</>
  } else {
    // if contacts list is empty
    return null
  }
}

export default ContactsList
