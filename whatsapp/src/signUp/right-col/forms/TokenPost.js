export async function postReq(data, url) {
    const res = await fetch(url, {
        'method': 'post',
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(data) 
    });
    return res.status;
}