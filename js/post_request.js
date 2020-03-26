self.onmessage = e => {
	const xhr = new XMLHttpRequest();
	
	xhr.open("POST", e.data[0], false);
	xhr.withCredentials = true;
    
    try {
        xhr.send(JSON.stringify(e.data[1]));
    } catch (e) {
    }
    
    self.postMessage({
        status: xhr.status,
        responseText: xhr.responseText
    });
};