var agent;

self.onmessage = e => {
	switch(e.data.action) {
        case "initialize":
            agent = e.data.agent;

            break;
        case "request":
            const xhr = new XMLHttpRequest();
                
            xhr.open("POST", agent, false);
            xhr.withCredentials = true;

            try {
                xhr.send(JSON.stringify(e.data.request));
                
                self.postMessage({
                    status: xhr.status,
                    responseText: xhr.responseText
                });
            } catch (e) {
                self.postMessage({
                    status: -1,
                    exception: e
                });
            }

            break;
    }
};