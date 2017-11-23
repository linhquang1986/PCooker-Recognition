var editMenu = null;
var dataMenu = null;
//render data to table
var renderTableMenu = (data) => {
    let menu = $('#tableMenu');
    menu.find('tbody').empty();
    for (let i = 0; i < data.length; i++) {
        let index = i + 1;
        let intent = `<tr index="${i}"><td>${index}</td><td>${data[i].name}</td><td><button onclick='delMenu("${data[i]._id}")' class='btn btn-danger'>Del</button><td><tr>`
        menu.append(intent);
    }
    //select row and bind data
    menu.children('tbody').find('tr').click((e) => {
        if (e.target.localName === 'td') {
            let index = e.currentTarget.attributes[0].value;
            editMenu = data[index]
            $('#menuName').val(editMenu.name);
        }
    })
}
var renderDropdowMenu = (data) => {
    let dropdow = $('#menuDrink');
    dropdow.empty();
    data.forEach(item => {
        let option = `<option value="${item._id}">${item.name}</option>`
        dropdow.append(option);
    })
}
//get data menu
var getAllMenu = () => {
    get('/drink/getAllMenu', data => {
        dataMenu = data;
        renderTableMenu(data);
        renderDropdowMenu(data);
    })
}
getAllMenu();
//delete menu
var delMenu = (id) => {
    _delete('/drink/delMenu/', id, (res) => {
        if (res.success)
            getAllMenu();
    })
}
//clear input
var clearForm = (form) => {
    $(form).find('input').val('');
    editMenu = null;
    editDrink = null;
}
//handle submit
var submitForm = (form) => {
    let error = false;
    let data = $(form).serializeArray();
    let menuData = {
        name: null
    }
    //validate
    data.forEach(item => {
        if (item.value === "") {
            $(form).find('.error').html('Please complete information').show();
            error = true;
            setTimeout(() => {
                $(form).find('.error').hide()
            }, 2000)
            return;
        } else {
            menuData.name = item.value
        }
    });
    //if no error
    if (!error) {
        //check add or edit
        if (!editMenu)
            post('/drink/addMenu', menuData, (res) => {
                clearForm(form);
                getAllMenu();
            })
        else {
            put('/drink/editMenu/', editMenu._id, menuData, (res) => {
                clearForm(form);
                getAllMenu();
            })
        }
    }
}