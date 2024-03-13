async function shorternUrl() {
    const url = document.getElementById('url').value;
    await fetch(`http://localhost:8001/url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    }).then((data) => {
        return data.json();
    }).then((data) => {
        //console.log(data)
        document.getElementById('shortenedUrl').innerHTML = `Shortened URL: <a href="http://localhost:8001/url/${data.id}" target="_blank">http://localhost:8001/url/${data.id}</a>`;
    })
        .catch(() => {
            document.getElementById('shortenedUrl').innerHTML = `Error in shortening the URL`;
        })
}