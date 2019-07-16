//年齢計算の初期値、年、月、日をセットする。
window.addEventListener('load', function () { select_year_month_day(); }, false);
//addevebtListenerで下記1から4までの関数にかんしてそれぞれのid要素でイベント登録
window.onload = function () {
    document.getElementById("add_up").addEventListener('click', function () { sisoku_calculate("add"); }, false);
    document.getElementById("do_subtraction").addEventListener('click', function () { sisoku_calculate("subtraction"); }, false);
    document.getElementById("do_multiplication").addEventListener('click', function () { sisoku_calculate("multiply"); }, false);
    document.getElementById("divide").addEventListener('click', function () { sisoku_calculate("divide_do"); }, false);
    document.getElementById("rotation").addEventListener('click', function () { rotate(180); }, false);
    document.getElementById("todo_add").addEventListener('click', function () { add_item(); }, false);
    document.getElementById("todo_remove").addEventListener('click', function () { removeItem(); }, false);
    document.getElementById("age_culcurate").addEventListener('click', function () { currentage(); }, false);
    document.getElementById("year").addEventListener('change', function () { oldyear_update(); }, false);
    document.getElementById("month").addEventListener('change', function () { oldyear_update(); }, false);

}



function select_year_month_day() {
    var selectyear = document.getElementById('year');
    for (var year = 1948; year < 2021; year++) {
        var optionyear = document.createElement("option");
        optionyear.value = year;
        optionyear.innerHTML = year;
        selectyear.appendChild(optionyear);
    }
    var selectmonth = document.getElementById('month');
    for (var month = 1; month < 13; month++) {
        var optionmonth = document.createElement("option");
        optionmonth.value = month;
        optionmonth.innerHTML = month;
        selectmonth.appendChild(optionmonth);
    }
    var selectday = document.getElementById('day');
    for (var day = 1; day < 32; day++) {
        var optionday = document.createElement("option");
        optionday.value = day;
        optionday.innerHTML = day;
        selectday.appendChild(optionday);
    }

}
/*
1.四則演算関数:演算子の符号により場合分けを実行し演算結果を算出
*/
function sisoku_calculate(sign) {
    switch (sign) {
        case "add":
            document.fm.result_add.value = eval(document.fm.add_first.value) + eval(document.fm.add_second.value);
            //alert("te");
            break;
        case "subtraction":
            document.fm.result_sub.value = eval(document.fm.sub_first.value) - eval(document.fm.sub_second.value);
            break;
        case "multiply":
            document.fm.result_multi.value = eval(document.fm.multi_first.value) * eval(document.fm.multi_second.value);
            break;
        case "divide_do":
            document.fm.result_div.value = eval(document.fm.div_first.value) / eval(document.fm.div_second.value);
            break;
    }
}

/*
2.西暦の年月日を入れると現在の年齢を算出
*/
function currentage() {
    var today = new Date();
    today = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    var birthday = parseInt(document.fm.year.value, 10) * 10000 + parseInt(document.fm.month.value, 10) * 100 + parseInt(document.fm.day.value, 10);
    document.fm.C_4.value = Math.floor((today - birthday) / 10000);
}
/*
2.西暦の年月日を変更するとその値を年齢計算の値に更新する
*/
function oldyear_update() {
    var update_year = Number(document.getElementById('year').value);
    var update_month = Number(document.getElementById('month').value);
    var sel_day = document.getElementById('day');

    //閏年を計算する関数を変数として受け取る
    var leap_year = function (year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    //閏年以外の月の日数を配列に受け取る。
    var monthlimit_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //閏年の時
    if (leap_year(update_year)){
        if(update_month === 2){
            //日の要素を全て消す
            while (0 < sel_day.childNodes.length) {
                sel_day.removeChild(sel_day.childNodes[0]);
            }
            //2月は29日に再設定
            for (var day = 1; day < 30; day++) {
                var optionday = document.createElement("option");
                optionday.value = day;
                optionday.innerHTML = day;
                sel_day.appendChild(optionday);
            }
        }else if(update_month !== 2){ 
            //2月以外の月は、月の日数分再設定
            while (0 < sel_day.childNodes.length) {
                sel_day.removeChild(sel_day.childNodes[0]);
            }
            for (var day = 1; day <=monthlimit_day[update_month - 1]; day++) {
                var optionday = document.createElement("option");
                optionday.value = day;
                optionday.innerHTML = day;
                sel_day.appendChild(optionday);
            }
        }
    }else{//閏年以外の月は、月の日数で再設定する。
        //日の要素を全て消す
            while (0 < sel_day.childNodes.length) {
                sel_day.removeChild(sel_day.childNodes[0]);
            }
        //月により、日数を再設定
            for (var day = 1; day <= monthlimit_day[update_month - 1]; day++) {
                var optionday = document.createElement("option");
                optionday.value = day;
                optionday.innerHTML = day;
                sel_day.appendChild(optionday);
            }
    }
}
/*
3.画像の回転
*/
//x軸に対しての回転
//現在の角度
var current_angle = 0;
function rotate(angle) {
    var picture_select = document.getElementById("img1");
    //現在の角度更新
    current_angle = current_angle + angle;
    picture_select.style.transform = "rotate(" + current_angle + "deg)";
}
/*
4-1.todolist　の追加関数
リストの上限を16に設定して、下限を0に設定して、
その間でしかリストを追加できないように設定。
*/
var list_count = 0;

function add_item() {
    if (list_count < 17) {
        var todoItems = [];
        var todoItem = document.getElementById('item').value;
        var result = todoItems.push(todoItem);
        list_count++;
        for (var list_element = 0; list_element < todoItems.length; list_element++) {
            var todo_list = document.createElement('li');
            todo_list.textContent = todoItems[list_element];
            document.getElementById('todoList').appendChild(todo_list);
        }
    }
}
/*
4-2.todolist　の削除関数
　　一番後に追加した要素を削除する
*/
function removeItem() {
    if (list_count > 0) {
        list_count--;
        const todoItem = document.getElementById('todoList');
        const lastelement = todoItem.lastElementChild;
        todoItem.removeChild(lastelement);
    }
}