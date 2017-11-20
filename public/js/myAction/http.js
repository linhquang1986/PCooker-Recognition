"use strict"
// var serverUrl = 'http://10.100.0.225:5000'; Lan
var serverUrl = 'http://118.69.133.91:5000'; // server public  
var get = (url, callback) => {
    $.ajax({
        type: 'GET',
        url: serverUrl + url,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: data => {
            callback(data);
        }
    })
}

var post = (url, data, callback) => {
    $.ajax({
        type: 'POST',
        url: serverUrl + url,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(data),
        success: data => {
            callback(data);
        }
    })
}