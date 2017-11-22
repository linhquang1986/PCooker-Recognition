"use strict"
var menuDrink = null;
function _startorder() {
    $('.listmenu').show();
    $('.drinks').show();
    $('#mic-icon').hide();
    get('/drink/getAllMenu', data => {
        menuDrink = data;
        renderMenu(data)
    })
}

function _free() {
    stopRecording();
    start();
    $('#mic-icon').show();
    $('.listmenu').hide();
    $('.drinks').hide();
}

function getDrink(menuId) {
    get('/drink/getDrinkByMenu/' + menuId, data => {
        renderDrink(data);
    })
}