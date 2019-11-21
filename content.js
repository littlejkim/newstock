// content.js
var datetime = $("span.t11").text()

function parseStringToDate(datetime) {
    // 문자열 regex로 분리
    var split = new Array();
    split = datetime.split(" ");

    // 년월일
    var year = split[0].substring(0, 4);
    var month = split[0].substring(5, 7);
    var day = split[0].substring(8, 10);

    // 오후 오전 구분
    if (split[1] == "오후") {
        var isPm = true;
    } else {
        var isPm = false;
    }

    // 두자리 수 한자리 수 구분
    if (split[2].length == 4) {
        var hour = split[2].substring(0, 1);
        var minute = split[2].substring(2, 4)
    } else {
        var hour = split[2].substring(0, 2);
        var minute = split[2].substring(3, 5)
    }

    // 날짜 반환
    //return (year + "-" + month + "-" + day + " " + hour + ":" + minute + (isPm == true ? "PM" : "AM")).toLocaleString("en-US")
    return (year + "." + month + "." + day)

}



// chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
//     var selection = window.getSelection().toString();
//     console.log(selection);
//     var parsedDate = parseStringToDate(datetime);
//     console.log(parsedDate);

//     chrome.runtime.sendMessage({
//         name: selection,
//         date: parsedDate
//     }, function (response) {
//     console.log(response.data);
//     sendResponse(response.data)
//     });

//   });


document.addEventListener("click", function () {
    
    var selection = window.getSelection().toString();
    console.log("Double clicked")
    var parsedDate = parseStringToDate(datetime)
    console.log(parsedDate)
    console.log(selection)
    chrome.runtime.sendMessage({
        name: selection,
        date: parsedDate,
        origin: "content"
    }, function (response) {
        console.log(response.data);

        chrome.runtime.onMessage.addListener(function contentToPopup(message,sender,sendResponse){
            
            response["date"] = parsedDate;
            response["name"] = selection;
            sendResponse(response);
            chrome.runtime.onMessage.removeListener(contentToPopup);
        });
        
    });
});


