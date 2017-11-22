"use strict"
//var domain = 'http://10.100.0.225:5000';// Lan
var domain = 'http://118.69.133.91:5000'; // server public   
var domainLocal = 'http://localhost:3030'; //local
var get = (url, callback) => {
    $.ajax({
        type: 'GET',
        url: domain + url,
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
        url: domain + url,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(data),
        success: data => {
            callback(data);
        }
    })
}

var put = (url, id, data, callback) => {
    $.ajax({
        type: 'PUT',
        url: domain + url + id,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: JSON.stringify(data),
        success: data => {
            callback(data);
        }
    })
}
var _delete = (url, id, callback) => {
    $.ajax({
        type: 'DELETE',
        url: domain + url + id,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: data => {
            callback(data);
        }
    })
}