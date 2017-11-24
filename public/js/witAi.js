"use strict"
var recognition = null;
var inAction = null;
function speak(msg) {
    responsiveVoice.speak(msg, "Vietnamese Male");
}
function sendWitAi(msg) {
    let abort = checkAbortDrink(msg);
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
        }
        if (res.entities.drinks) {
            let _drink = res.entities.drinks[0].value;
            if (abort == 0) {
                addBill(_drink)
                responsiveVoice.speak('Bạn chọn ' + _drink, "Vietnamese Male")
            } else {
                updateBill(_drink)
            }
        }
    })
}