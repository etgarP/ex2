export async function postReq(data, url) {
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return res.status;
    } catch (error) {
        // Handle the error here
        // console.error('An error occurred:', error);
        throw error; // Rethrow the error to propagate it to the caller
    }
}