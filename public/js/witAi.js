"use strict"
var recognition = null;
var inAction = null;
var saveDrink = null;
var saveEntities = null;
function sendWitAi(msg) {
    let entities = {
        _abort: null,
        _quanlity: null,
        _drink: null,
        _menu: null
    }
    let data = { message: msg }
    postWit('/wit/message', data, (res) => {
        console.log(res)
        if (res.entities.abort) {
            entities._abort = true;
        }
        if (res.entities.options) {
            res.entities.options.forEach(op => {
                metaData.forEach(m => {
                    if (op.metadata == m.value)
                        entities[m.value] = op.value
                })
            })
            if (saveDrink) {
                metaData.forEach(m => {
                    if (!saveDrink.options[m.value])
                        saveDrink.options[m.value] = entities[m.value]
                })
                addBill(saveDrink);
                saveDrink = null;
            }
        }
        if (res.entities.quanlity) {
            entities._quanlity = res.entities.quanlity[0].value;
            if (saveEntities) {
                saveEntities._quanlity = entities._quanlity;
                handleOrder(saveEntities);
                saveEntities = null;
            }
        }
        if (res.entities.drinks) {
            entities._drink = res.entities.drinks[0].value;
        }
        if (res.entities.menus) {
            entities._menu = res.entities.menus[0].value;
        }
        if (res.entities.have && res.entities.y_n) {
            if (entities._drink)
                quesDrink(entities)
            if (entities._menu)
                handleMenu(entities._menu)
            if (!entities._drink && !entities._menu)
                speak('Hiện bên mình chưa có bạn vui lòng chọn nước khác nha.');
        }
        if (!res.entities.have || !res.entities.y_n && !res.entities.listed) {
            if (entities._drink)
                handleOrder(entities)
            if (entities._menu)
                handleMenu(entities._menu)
        }
        if (res.entities.have && res.entities.listed) {

        }
    })
}
var quesDrink = (entities) => {
    speak('Có bạn');
    saveEntities = entities;
}
var handleOrder = (entities) => {
    let drinkOder = {
        name: entities._drink,
        quanlity: entities._quanlity,
        options: {}
    }
    let options = [];
    let findD = drinksData.find(d => { return d.name.toLowerCase() === drinkOder.name.toLowerCase() });
    if (findD)
        options = findD.options.slice();
    if (!entities._abort) {
        if (options.length > 0) {
            let res = '';
            options.forEach(m => {
                metaData.forEach(_m => {
                    if (m == _m._id) {
                        if (!entities[_m.value])
                            res += ', ' + _m.question;
                        else
                            drinkOder.options[_m.value] = entities[_m.value]
                    }
                })
            })
            if (res != '') {
                saveDrink = drinkOder;
                speak('Bạn muốn dùng' + res)
            }
            else
                addBill(drinkOder)
        }
        else {
            addBill(drinkOder)
        }
    } else {
        updateBill(entities._drink)
    }
}

var handleMenu = (menu) => {
    let exist = menuDrink.find(m => {
        return m.name.toLowerCase() == menu.toLowerCase();
    })
    if (exist) {
        speak('Bạn muốn dùng loại ' + menu + ' nào?')
    } else {
        speak('Hiện bên mình chưa có bạn vui lòng chọn nước khác nha.')
    }
}