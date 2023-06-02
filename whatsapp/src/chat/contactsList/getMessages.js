import { getReq } from "../../getReq"

async function getMesseges(id, user) {
    try {
        const url = `http://localhost:12345/api/Chats/${id}/Messages`
        const res = await getReq(url, user.token);
        if(res.status===400){
            window.alert("Invalid request parameters.") 
        } else if (res.status === 401) {
            console.log("Unauthorized token.")
            window.alert("Authorization expired. Please log in again.")
        } else if (res.status === 404) {
            window.alert("There is no such chat.")
        }
        const data = await res.json();
        if (Array.isArray(data)) {
            return data;
        } else {
            // Handle the case where the response is not a valid array
            console.error("Invalid data format: ", data);
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function applyMessages(user, id, setContacts) {
    try {
        var messages = await getMesseges(id, user)
    } catch (error) {
        console.log("error at apply messeges")
        return
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