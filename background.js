chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", 'http://13.125.105.168/' + request.code, false);
        xhr.send();

        var result = xhr.responseText;
        sendResponse({
            data: result
        });
    });