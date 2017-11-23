"use strict"
var renderById = (content, domId) => {
    let dom = $('#' + domId);
    dom.append(content);
}
var renderByClass = (content, domClass) => {
    let dom = $('.' + domClass);
    dom.append(content);
}
var renderMenu = (data) => {
    $('.listmenu').empty();
    data.forEach(function (item) {
        let menuIntent = "<div class='col-md-4 panel panel-success'>"
            + '<div class="panel-heading text-center">'
            + item.name
            + "</div>"
            + '</div>'
        renderByClass(menuIntent, 'listmenu')
    }, this);
}
var renderDrink = (data) => {
    $('.drinks').empty();
    data.forEach(item => {
        let drinkIntent = '<li class="list-group-item">' + item.name + '<span class="badge">' + item.price + ' Đ</span></li>';
        renderByClass(drinkIntent, 'drinks')
    })
}