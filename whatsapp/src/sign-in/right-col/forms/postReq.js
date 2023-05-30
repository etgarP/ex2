export async function postReq(data, url) {
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return res;
    } catch (error) {
        throw error; // Rethrow the error to propagate it to the caller
    }
}