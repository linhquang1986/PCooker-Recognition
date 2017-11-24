"use strict"
var menuDrink = null;
var drinksData = null;
var billData = [];
function _startorder() {
    $('.listmenu').show();
    $('.drinks').show();
    $('#mic-icon').hide();
    get('/drink/getAllMenu', data => {
        menuDrink = data;
        renderMenu(data)
    })
}

function _call() {
    responsiveVoice.speak("Bạn muốn tôi giúp gì", "Vietnamese Male")
}

function _free() {
    stopRecording();
    start();
    $('#mic-icon').show();
    $('.listmenu').hide();
    $('.drinks').hide();
}

function updateBill(_drink) {
    //responsiveVoice.speak('Bạn muốn bỏ ' + _drink + ' đúng không?', "Vietnamese Male", { rate: 1.2 });
    let dr = drinksData.find(drink => { return drink.name.toLowerCase() == _drink.toLowerCase() })
    if (dr) {
        let drinkInBill = $('.ordersDrinks').find(`[drinkId=${dr._id}]`);
        drinkInBill.remove();
        billData.filter(drink => drink.toLowerCase() !== _drink.toLowerCase())
    }
}
function checkAbortDrink(msg) {
    let abort = 0;
    msg.search('vỏ') >= 0 && abort++;
    msg.search('bỏ') >= 0 && abort++;
    msg.search('hủy') >= 0 && abort++;
    msg.search('huy') >= 0 && abort++;
    msg.search('võ') >= 0 && abort++;
    return abort;
}
function addBill(_drink) {
    drinksData.forEach(drink => {
        if (_drink.toLowerCase() == drink.name.toLowerCase()) {
            horverDrink(drink._id)
            billData.push(_drink)
            let drinkInBill = $('.ordersDrinks').find(`[drinkId=${drink._id}]`);
            if (drinkInBill.length == 0) {
                let bill = $('.orders').find('.ordersDrinks')
                let drinkIntent = '<li class="list-group-item drink-item" drinkId="' + drink._id + '"><p class="quanlity">' + 1 + '</p>' + drink.name + '<span class="badge">' + drink.price + ' Đ</span></li>';
                bill.append(drinkIntent)
            } else {
                let quanlityE = drinkInBill.find('.quanlity');
                let badge = drinkInBill.find('.badge')
                let quanlity = parseInt(quanlityE.html()) + 1;
                let price = quanlity * drink.price;

                quanlityE.html(quanlity)
                badge.html(price + ' Đ')
            }
        }
    })
}

function horverDrink(id) {
    let li = $('.drinks').find(`[drinkId=${id}]`)
    li.addClass('animate-flicker');
    setTimeout(() => {
        li.removeClass('animate-flicker');
    }, 2000)
}

function getDrink(menuId) {
    get('/drink/getDrinkByMenu/' + menuId, data => {
        renderDrink(data);
    })
}

function getAllDrink(callback) {
    get('/drink/getAllDrink', data => {
        drinksData = data;
        callback(data);
    })
}