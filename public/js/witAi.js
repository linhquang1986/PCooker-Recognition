"use strict"
var recognition = null;
var inAction = null;
var drinkOption = null;
function speak(msg) {
    responsiveVoice.speak(msg, "Vietnamese Male");
}
function sendWitAi(msg) {
    let abort = null;
    let data = { message: msg }
    postWit('/wit/message', data, (res) => {
        console.log(res)
        if (res.entities.abort) {
            abort = true;
        }
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
        if (res.entities.nhietdo) {
            let nhietdo = res.entities.nhietdo[0].value;
            if (drinkOption) {
                addBill(drinkOption.name, drinkOption.quanlity, nhietdo);
            }
        }
        if (res.entities.drinks) {
            let _drink = res.entities.drinks[0].value;
            let _meta = res.entities.drinks[0].metadata;
            let nhietdo = null;
            let _quanlity = null;
            if (res.entities.nhietdo) {
                nhietdo = res.entities.nhietdo[0].value;
            }
            if (res.entities.quanlity) {
                _quanlity = res.entities.quanlity[0].value;
            }
            if (!abort) {
                if (_meta == 'nhietdo') {
                    if (nhietdo) {
                        addBill(_drink, _quanlity, nhietdo);
                    } else {
                        let data = {
                            name: _drink,
                            quanlity: _quanlity
                        }
                        drinkOption = data;
                        responsiveVoice.speak('Bạn muốn nóng hay đá', "Vietnamese Male")
                    }
                } else {
                    if (res.entities.quanlity) {
                        _quanlity = res.entities.quanlity[0].value;
                        addBill(_drink, _quanlity)
                    }
                    else {
                        addBill(_drink)
                    }
                }
            } else {
                updateBill(_drink)
            }
        }
    })
}