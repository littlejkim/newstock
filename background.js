chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request.date)
        var xhr = new XMLHttpRequest();

        xhr.open("GET", 'http://13.125.105.168/company?companyname=' + request.name + "&date=" + request.date,  false);
        xhr.send();

        var result = xhr.responseText;
        sendResponse({
            data: result
        });
    });