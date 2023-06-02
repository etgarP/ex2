import { getReq } from "../../getReq"

//todos

async function getMesseges(id, user) {
    try {
        const url = `http://localhost:12345/api/Chats/${id}/Messages`
        var res = await getReq(url, user.token);
        var data = await res.json();
        if (Array.isArray(data)) {
            return data;
        } else {
            // Handle the case where the response is not a valid array
            console.error("Invalid data format: ", data);
        }
    } catch (error) {
        //todo
    }
}

export async function applyMessages(user, id, setContacts) {
    try {
        var messages = await getMesseges(id, user)
    } catch (error) {
        // todo: add actions maybe
        console.log("error at apply messeges")
    }
    setContacts(contacts => {
        const index = contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            const updatedContact = {
                ...contacts[index],
                messages: messages
            };
            const updatedContactsList = [
                ...contacts.slice(0, index),
                updatedContact,
                ...contacts.slice(index + 1)
            ];
            return updatedContactsList;
        }
        return contacts;
    });
}