//Falling back to ES5 in the browser for compatibility.
var address = "http://localhost:3000/data";

//Using an XHR to grab the JSON data from the server.
getTimelineData = function() {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    createTimeline(JSON.parse(this.responseText));
  });
  oReq.addEventListener("error", errorHandler);
  oReq.open("GET", address);
  oReq.send();
}

errorHandler = function() {
  console.error("Failed to load data from " + address + ".");
}

createTimeline = function(data) {
  //operate on the data here
  console.log(data.date); //confirm what we've received
}

getTimelineData();