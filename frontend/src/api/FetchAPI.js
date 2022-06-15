
export const FetchApi = (url,method,contentType,param) => {
    fetch(url, {
        method: method,
        header: {
            'Content-Type': contentType,
        },
        body: JSON.stringify(param)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}