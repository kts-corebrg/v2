; "use strict";

(() => {
    var agent;
    const
        INTERVAL = 10000;
    
    const
        updater = new Worker("/js/post_request.js"),
        listener = new Worker("/js/post_request.js"),
        updateRequest = {
            command: "echo"
        },
        listenRequest = {
            command: "listen"
        };
    var requestTime;

    updater.onmessage = e => {
        onUpdate(e.data.status, new Date().getTime() - requestTime);

        setTimeout(update, INTERVAL);
    };
    
    listener.onmessage = e => {
        const
            status = e.data.status,
            event = JSON.parse(e.data.responseText);

        listenRequest.eventID = event.eventID +1;

        if (status == 200) {
            onEvent(status, event);
                
            listen();
        } else {
            setTimeout(listen, 1000);
        }
    };
    
    window.startThread = url => {
        agent = url;
        
        update();

        listen();
    };
    
    function update() {
        requestTime = new Date().getTime();
        
        updater.postMessage([agent, updateRequest]);
    }

    function listen() {
        listener.postMessage([agent, listenRequest]);
    }
})();
