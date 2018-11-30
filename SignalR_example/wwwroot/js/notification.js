"use strict";
console.log("Loading notification.js");
var connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();

connection.on("ReceiveMessage", function(user, message){
console.log(user + message);
var li = document.createElement("li");
li.textContent = message;
document.getElementById("messagesList").appendChild(li);

});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    console.log("Sending: "+message);
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});