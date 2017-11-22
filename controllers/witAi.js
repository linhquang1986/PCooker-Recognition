"use strict"
var Wit = require('../middleware').wit;
var appConfig = require('../config')

var witAiAccessToken = appConfig.wit_ai.myAccessToken;
let wit = new Wit(witAiAccessToken);
exports.message = (req, res) => {
    let message = req.body.message;
    wit.sent(message, (rs) => {
        res.send(rs)
    });
}