import ListedContact from "./listedContact";

//todos

function ContactsList(props) {
  const { contacts, setContacts, setContactId, upH, user } = props;

  if (Array.isArray(contacts)) {
    const mappedarray = contacts.map((contact) => {
      var timeAndDate;
      if (!contact) {
      }
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
          lastMessage={contact.lastMessage ? contact.lastMessage.content : null}
          setContactId={setContactId}
          upH={upH}
          setContacts={setContacts}
          contacts={contacts}
          user={user}
        />
      );
    });

    return <>{mappedarray}</>;
  } else {
    // todo
    console.log("contacts is not an array or is null/undefined.");
    return null;
  }
}

export default ContactsList;
