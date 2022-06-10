
const FetchApi = (url,method,contentType,param, callback) => {
    fetch(url, {
        method: method,
        header: {
            'Content-Type': contentType,
        },
        body: JSON.stringify(param)
    })
    .then(response => response.json())
    .then(data => {
        callback(data);
    })
}

export default FetchApi;