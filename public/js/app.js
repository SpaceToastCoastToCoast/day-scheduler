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

//Get event length in minutes
getEventLength = function(start, end) {
  //Given "09:30" and "10:15", should return "45":
  var startHour = parseFloat(start.slice(0, 2));
  var startMinute = parseFloat(start.slice(3, start.length));
  var endHour = parseFloat(end.slice(0, 2));
  var endMinute = parseFloat(end.slice(3, end.length));
  console.log(startHour, startMinute, endHour, endMinute);

  return ((endHour - startHour) * 60) + (endMinute - startMinute);
}

createTimeline = function(data) {
  var timeline = document.getElementById("timeline");
  var hours = document.getElementById("hours");
  var stylesheet = document.styleSheets[0];
  //operate on the data here
  console.log(data.date); //confirm what we've received

  var dayStart = data.events[0].start;
  var totalDayLength = getEventLength(dayStart,
                      data.events[data.events.length - 1].end);

  for(var i = 0; i < totalDayLength / 60; i++) {
    var hour = document.createElement("li");
    hour.className = "hour";
    hour.innerHTML = (parseFloat(dayStart) + i) + ":00";
    hours.appendChild(hour);
  }

  for(var i = 0; i < data.events.length; i++) {
    var row = document.createElement("li");
    var event = document.createElement("div");
    var title = document.createElement("h3");
    var times = document.createElement("span");
    var startTime = data.events[i].start;
    var endTime = data.events[i].end;
    var length = getEventLength(startTime, endTime);
    var startOffset = startTime.replace(":", "");
    var width = (length / totalDayLength) * 100;
    var margin = (getEventLength(data.events[0].start, startTime) / totalDayLength) * 100;

    title.innerHTML = data.events[i].title;
    times.innerHTML = startTime + " - " + endTime;
    event.appendChild(title);
    event.appendChild(times);

    event.className = "event length" + length + " start" + startOffset;

    stylesheet.insertRule(".length" + length +
                          "{ width: " + width + "%; }", 0);
    stylesheet.insertRule(".start" + startOffset +
                          "{ margin-left: " + margin + "%; }", 0);

    row.className = "row";
    row.appendChild(event);
    timeline.appendChild(row);
  }

}

getTimelineData();