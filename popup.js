chrome.tabs.query({'active': true,'currentWindow':true},function(tab){
    chrome.tabs.sendMessage(tab[0].id,"", function(response){
      
      var jsondata = JSON.parse(response.data)
      
      console.log(response)
      

      var compName = ""
      var date = ""
      var closingPrice = ""
      var sikka = ""
      var highPrice = ""
      var comparedValue = ""
      var lowPrice = ""
      var tradedAmount = ""
      
      for(var i = 0; i < 9; i++){
        if (jsondata[i].date == response.date){
          compName = response.name
          date = response.date
          closingPrice = parseInt(jsondata[i].closingPrice)
          sikka = parseInt(jsondata[i].sikka)
          highPrice = parseInt(jsondata[i].highPrice)
          lowPrice = parseInt(jsondata[i].lowPrice)
          tradedAmount = parseInt(jsondata[i].tradedAmount)
          if(i < 9){
            var tempComparedValue = (parseInt(jsondata[i].closingPrice) - parseInt(jsondata[i+1].closingPrice))
            if (tempComparedValue){
              comparedValue = tempComparedValue
            }
            else {
              comparedValue = parseInt(jsondata[i].comparedValue)
            }
          }
        }
      }

      if(comparedValue < 0){
        document.getElementById("comparedValue").style.color = "rgb(0, 80, 255)"
      } else if (comparedValue > 0){
        document.getElementById("comparedValue").style.color = "red"
      }

      document.getElementById("compName").innerHTML = compName
      document.getElementById("date").innerHTML = date
      document.getElementById("closingPrice").innerHTML = closingPrice.toLocaleString()
      document.getElementById("sikka").innerHTML = sikka.toLocaleString()
      document.getElementById("highPrice").innerHTML = highPrice.toLocaleString()
      document.getElementById("lowPrice").innerHTML = lowPrice.toLocaleString()
      document.getElementById("tradedAmount").innerHTML = tradedAmount.toLocaleString()
      document.getElementById("comparedValue").innerHTML = comparedValue.toLocaleString()
    });
  });