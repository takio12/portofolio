//addevebtListenerで下記1から4までの関数にかんしてそれぞれのid要素でイベント登録
window.onload = function() {
    document.getElementById("add_up").addEventListener('click', function (){sisoku_calculate("add");}, false);
    document.getElementById("do_subtraction").addEventListener('click',  function (){sisoku_calculate("subtraction");}, false);
    document.getElementById("do_multiplication").addEventListener('click',function (){sisoku_calculate("multiply");}, false);
    document.getElementById("divide").addEventListener('click', function (){sisoku_calculate("divide_do");}, false);
    document.getElementById("rotation").addEventListener('click', function (){rotate(180);}, false);
    document.getElementById("todo_add").addEventListener('click', function (){add_item();}, false);
    document.getElementById("todo_remove").addEventListener('click', function (){removeItem();}, false);
    document.getElementById("year").addEventListener('change', function (){dateCheck('year', 'month', 'day');}, false);
    document.getElementById("month").addEventListener('change', function (){dateCheck('year', 'month', 'day');}, false);
    document.getElementById("day").addEventListener('change', function (){dateCheck('year', 'month', 'day');}, false);
    document.getElementById("age_culcurate").addEventListener('click', function (){currentage();}, false);

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
function dateCheck(year, month, day) {
    var update_year = Number(document.getElementsByName(year)[0].value);
    var update_month = Number(document.getElementsByName(month)[0].value);
    var up_day = document.getElementsByName(day)[0];
    var update_day = Number(day.value);
    //もし、年と月が確定したら
    if (update_year && update_month) {
        //日付関数を使用して日付を設定
        var dayof_birthday = new Date(update_month, update_month, 0);
        //現時点での日付を設定
        var dsn = Number(dayof_birthday.getDate());
        var html = '<option value="1">1</option>';
        for (var first_select_day = 2; first_select_day <= dsn; first_select_day++) {
            if (first_select_day === update_day) {
                html += '<option value="' + first_select_day + '" selected>' + first_select_day + '</option>';
            }
            else {
                html += '<option value="' + first_select_day + '">' + first_select_day + '</option>';
            }
        }
        day.innerHTML = html;
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
var list_count=0;

function add_item() {
　if(list_count<17){
    var todoItems = [];
    var todoItem = document.getElementById('item').value;
    var result= todoItems.push(todoItem);
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
    if(list_count>0){
        list_count--;
    const todoItem = document.getElementById('todoList');
    const lastelement = todoItem.lastElementChild;
    todoItem.removeChild(lastelement);
    }
}
