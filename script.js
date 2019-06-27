function sisoku(sign, first, second, third) {
    switch (sign) {
        case "kasan":
            document.fm.third.value = eval(document.fm.first.value) + eval(document.fm.second.value);
            break;
        case "genzan":
            document.fm.third.value = eval(document.fm.first.value) - eval(document.fm.second.value);
            break;
        case "kakezan":
            document.fm.third.value = eval(document.fm.first.value) * eval(document.fm.second.value);
            break;
        case "warizan":
            document.fm.third.value = eval(document.fm.first.value) / eval(document.fm.second.value);
            break;
    }
}

function nenrei() {
    var today = new Date();
    today = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    var birthday = parseInt(document.fm.year.value, 10) * 10000 + parseInt(document.fm.month.value, 10) * 100 + parseInt(document.fm.day.value, 10);
    document.fm.C_4.value = Math.floor((today - birthday) / 10000);
}
function dateCheck(year, month, day) {
    var y = Number(document.getElementsByName(year)[0].value);
    var m = Number(document.getElementsByName(month)[0].value);
    var day = document.getElementsByName(day)[0];
    var d = Number(day.value);
    if (y && m) {
        var ds = new Date(y, m, 0);
        var dsn = Number(ds.getDate());
        var html = '<option value="1">1</option>';
        for (var i = 2; i <= dsn; i++) {
            if (i === d) {
                html += '<option value="' + i + '" selected>' + i + '</option>';
            }
            else {
                html += '<option value="' + i + '">' + i + '</option>';
            }
        }
        day.innerHTML = html;
    }
}
var d = 0;
function kaiten(x) {
    var e = document.getElementById("img1");
    d = d + x;
    e.style.transform = "rotate(" + d + "deg)";
}
function submitItem() {
    var todoItems = [];
    var todoItem = document.getElementById('item').value;
    todoItems.push(todoItem);
    for (var i = 0; i < todoItems.length; i++) {
        var li = document.createElement('li');
        li.textContent = todoItems[i]
        document.getElementById('todoList').appendChild(li);
    }
}
function removeItem() {
    const todoItem = document.getElementById('todoList');
    const sai = todoItem.lastElementChild;
    todoItem.removeChild(sai);

}
