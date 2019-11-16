// content.js
// var datetime = $("span.t11").text()

function parseStringToDate(datetime) {
    // 문자열 regex로 분리
    var split = new Array();
    split = datetime.split(" ");

    // 년월일
    var year = split[0].substring(0, 4);
    var month = split[0].substring(5, 7);
    var day = split[0].substring(8, 10);

    // 오후 오전 구분
    if(split[1] == "오후") {
        var isPm = true;
    } else {
        var isPm = false;
    }   

    // 두자리 수 한자리 수 구분
    if(split[2].length == 4) {
        var hour = split[2].substring(0, 1);
        var minute = split[2].substring(2, 4)
    } else {
        var hour = split[2].substring(0, 2);
        var minute = split[2].substring(3, 5)
    }

    // 날짜 반환
    return new Date(year + "-" + month + "-" + day + " " + hour + ":" + minute)

}

// console.log(parseStringToDate(datetime))

// chrome.runtime.sendMessage({code: "005930"}, function(response) {
//     console.log(response.data);
//   });


//선택된 텍스트로 nametoCode실행. 실행후 코드가 나오면(선택된 텍스트가 valid면) sendMessage. 실행후 코드가 안나오면(선택된 텍스트가 invalid면) 아무것도 안함. 
document.addEventListener("click", function(){
    var selection = window.getSelection().toString();
        chrome.runtime.sendMessage({name: selection}, function(response) {
        console.log(response.data);   
        });
    });
//

    
