"use strict"
var recognition = null;
var inAction = null;
function speak(msg) {
    responsiveVoice.speak(msg, "Vietnamese Male");
}
function sendWitAi(msg) {
    console.log(inAction)
    let data = { message: msg }
    postWit('/wit/message', data, (res) => {
        console.log(res)
        if (res.entities.statements) {
            let action = res.entities.statements[0].value
            inAction = action;
            window[action]();
        }
        if (res.entities.action) {
            let text = res.entities.action[0].value;
            responsiveVoice.speak(text, "Vietnamese Male")
        }
        if (res.entities.menus) {
            let _menu = res.entities.menus[0].value;
            menuDrink && menuDrink.forEach(item => {
                if (_menu.toLowerCase().trim().search(item.name.toLowerCase().trim()) >= 0)
                    getDrink(item._id)
            })
        }
        if (res.entities.drinks) {
            let _drink = res.entities.drinks[0].value;
            responsiveVoice.speak('Bạn chọn ' + _drink, "Vietnamese Male")
        }
    })
}
// function start() {
//     try {
//         if (recognition)
//             recognition = null;
//         //each system will support other methods
//         recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
//         //about language support: https://cloud.google.com/speech/docs/languages
//         recognition.lang = 'vi-VN';
//         recognition.interimResults = false;
//         recognition.maxAlternatives = 1;
//         recognition.start();
//         recognition.onresult = function (event) {
//             //your process handle
//             let text = event.results[0][0].transcript;
//             console.log('You said: ', text);
//             sendWitAi(text);
//         };
//         // if you do not speaking for a while, it will turn itself off
//         // to recording forever, need should restart recording
//         recognition.onend = () => {
//             start();
//         }
//     }
//     catch (e) {
//         console.error('Brower is not support!');
//     }
// }
// //start recording
// //getMenu()
// start();