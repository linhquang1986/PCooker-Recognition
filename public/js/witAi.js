"use strict"
var recognition = null;
var inAction = null;
var drinkOption = null;
function sendWitAi(msg) {
    let entities = {
        _abort: null,
        _quanlity: null,
        _drink: null,
        _menu: null,
        nhietdo: null,
        milk: null
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
            if (drinkOption) {
                metaData.forEach(m => {
                    if (!drinkOption.option[m.value])
                        drinkOption.option[m.value] = entities[m.value]
                })
                addBill(drinkOption);
                drinkOption = null;
            }
        }
        if (res.entities.quanlity) {
            entities._quanlity = res.entities.quanlity[0].value;
        }
        if (res.entities.drinks) {
            let _meta = null;
            entities._drink = res.entities.drinks[0].value;
            if (res.entities.drinks[0].metadata)
                _meta = res.entities.drinks[0].metadata.split(',').map(String);
            handleOrder(entities, _meta)
        }
        if (res.entities.menus) {
            entities._menu = res.entities.menus[0].value;
            if (!entities._drink)
                handleMenu(entities._menu)
        }
    })
}

var handleOrder = (entities, _meta) => {
    let drinkOder = {
        name: entities._drink,
        option: {
            nhietdo: entities.nhietdo,
            milk: entities.milk
        },
        quanlity: entities._quanlity
    }
    let options = [];
    let findD = drinksData.find(d => { return d.name.toLowerCase() === drinkOder.name.toLowerCase() });
    if (findD)
        options = findD.options;
    if (!entities._abort) {
        if (options.length > 0) {
            let res = '';
            options.forEach(m => {
                metaData.forEach(_m => {
                    if (m == _m._id)
                        res += ', ' + _m.question;
                })
            })
            if (res != '') {
                drinkOption = drinkOder;
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
        speak('Hiện ' + menu + ' chưa có trong thực đơn, bạn vui lòng chọn menu khác.')
    }
}