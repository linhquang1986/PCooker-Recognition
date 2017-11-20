"use strict"
var serverUrl = 'http://localhost:5000';
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