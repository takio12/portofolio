//年齢計算の初期値、年、月、日をセットする。
window.addEventListener('load', function () { selectYearMonthDay(); });
//addevebtListenerで下記1から4までの関数にかんしてそれぞれのid要素でイベント登録
window.onload = function () {
    document.getElementById("add_up").addEventListener('click', function () { sisokuCalculate("add"); });
    document.getElementById("do_subtraction").addEventListener('click', function () { sisokuCalculate("subtraction"); });
    document.getElementById("do_multiplication").addEventListener('click', function () { sisokuCalculate("multiply"); });
    document.getElementById("divide").addEventListener('click', function () { sisokuCalculate("divide_do"); });
    document.getElementById("rotation").addEventListener('click', function () { rotate(180); });
    document.getElementById("todo_add").addEventListener('click', function () { addItem(); });
    document.getElementById("todo_remove").addEventListener('click', function () { removeItem(); });
    document.getElementById("age_culcurate").addEventListener('click', function () { currentAge(); });
    document.getElementById("year").addEventListener('change', function () { oldYearUpdate(); });
    document.getElementById("month").addEventListener('change', function () { oldYearUpdate(); });

}



function selectYearMonthDay() {
    var selectYear = document.getElementById('year');
    for (var year = 1948; year < 2021; year++) {
        var optionYear = document.createElement("option");
        optionYear.value = year;
        optionYear.innerHTML = year;
        selectYear.appendChild(optionYear);
    }
    var selectmonth = document.getElementById('month');
    for (var month = 1; month < 13; month++) {
        var optionMonth = document.createElement("option");
        optionMonth.value = month;
        optionMonth.innerHTML = month;
        selectmonth.appendChild(optionMonth);
    }
    var selectday = document.getElementById('day');
    for (var day = 1; day < 32; day++) {
        var optionDay = document.createElement("option");
        optionDay.value = day;
        optionDay.innerHTML = day;
        selectday.appendChild(optionDay);
    }

}
/*
1.四則演算関数:演算子の符号により場合分けを実行し演算結果を算出
*/
function sisokuCalculate(sign) {
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
function currentAge() {
    var today = new Date();
    today = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    var birthday = parseInt(document.fm.year.value, 10) * 10000 + parseInt(document.fm.month.value, 10) * 100 + parseInt(document.fm.day.value, 10);
    document.fm.C_4.value = Math.floor((today - birthday) / 10000);
}
/*
2.西暦の年月日を変更するとその値を年齢計算の値に更新する
*/
function oldYearUpdate() {
    var updateYear = Number(document.getElementById('year').value);
    var updateMonth = Number(document.getElementById('month').value);
    var selDay = document.getElementById('day');

    //閏年を計算する関数を変数として受け取る
    var leapYear = function (year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    //閏年以外の月の日数を配列に受け取る。
    var monthLimitDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //閏年の時
    if (leapYear(updateYear)) {
        if (updateMonth === 2) {
            //日の要素を全て消す
            while (0 < selDay.childNodes.length) {
                selDay.removeChild(selDay.childNodes[0]);
            }
            //2月は29日に再設定
            for (var day = 1; day < 30; day++) {
                var optionDay = document.createElement("option");
                optionDay.value = day;
                optionDay.innerHTML = day;
                selDay.appendChild(optionDay);
            }
        } else if (updateMonth !== 2) { 
            //2月以外の月は、月の日数分再設定
            while (0 < selDay.childNodes.length) {
                selDay.removeChild(selDay.childNodes[0]);
            }
            for (var day = 1; day <= monthLimitDay[updateMonth - 1]; day++) {
                var optionDay = document.createElement("option");
                optionDay.value = day;
                optionDay.innerHTML = day;
                selDay.appendChild(optionDay);
            }
        }
    } else {//閏年以外の月は、月の日数で再設定する。
        //日の要素を全て消す
        while (0 < selDay.childNodes.length) {
            selDay.removeChild(selDay.childNodes[0]);
        }
        //月により、日数を再設定
        for (var day = 1; day <= monthLimitDay[updateMonth - 1]; day++) {
            var optionDay = document.createElement("option");
            optionDay.value = day;
            optionDay.innerHTML = day;
            selDay.appendChild(optionDay);
        }
    }
}
/*
3.画像の回転
*/
//x軸に対しての回転
//現在の角度
var currentAngle = 0;
function rotate(angle) {
    var pictureSelect = document.getElementById("img1");
    //現在の角度更新
    currentAngle = currentAngle + angle;
    pictureSelect.style.transform = "rotate(" + currentAngle + "deg)";
}
/*
4-1.todolist　の追加関数
リストの上限を16に設定して、下限を0に設定して、
その間でしかリストを追加できないように設定。
*/
var listCount = 0;

function addItem() {
    if (listCount < 17) {
        var todoItems = [];
        var todoItem = document.getElementById('item').value;
        var result = todoItems.push(todoItem);
        listCount++;
        for (var listElement = 0; listElement < todoItems.length; listElement++) {
            var todoList = document.createElement('li');
            todoList.textContent = todoItems[listElement];
            document.getElementById('todoList').appendChild(todoList);
        }
    }
}
/*
4-2.todolist　の削除関数
　　一番後に追加した要素を削除する
*/
function removeItem() {
    if (listCount > 0) {
        listCount--;
        const todoItem = document.getElementById('todoList');
        const lastElement = todoItem.lastElementChild;
        todoItem.removeChild(lastElement);
    }
}