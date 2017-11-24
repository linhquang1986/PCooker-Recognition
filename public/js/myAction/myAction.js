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
    msg.search('vo') >= 0 && abort++;
    msg.search('bo') >= 0 && abort++;
    msg.search('huy') >= 0 && abort++;
    msg.search('vo') >= 0 && abort++;
    msg.search('xoa') >= 0 && abort++;
    return abort;
}
function locdau(_str) {
    var str;
    str = _str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
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