import ListedContact from "./listedContact";

function ContactsList(props) {
  const { contacts1, setContacts1, setContactId, upH, user } = props;

  if (Array.isArray(contacts1)) {
    const mappedarray = contacts1.map((contact) => {
    var timeAndDate;
    if (contact.lastMessage != null) {
        var dateString = contact.lastMessage.created;
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toLocaleDateString(); 
        const formattedTime = dateObject.toLocaleTimeString();
        timeAndDate = formattedDate + " " + formattedTime;
    }
    return (
        <ListedContact
        key={contact.id}
        id={contact.id}
        contactName={contact.user.displayName}
        picture={contact.user.profilePic}
        date={contact.lastMessage ? timeAndDate : null}
        lastMessage={contact.lastMessage ? contact.lastMessage.content: null}
        setContactId={setContactId}
        upH={upH}
        setContacts1={setContacts1}
        contacts1={contacts1}
        user={user}
        />
    );
  });

    return <>{mappedarray}</>;
  } else {
    console.log("contacts1 is not an array or is null/undefined.");
    return null;
  }
}

export default ContactsList;
