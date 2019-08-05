var btn = $('.result');

var restBtn = $('.bt');
var bmi = 0;
var data = JSON.parse(localStorage.getItem('dataKey')) || [];
// var data =[];
var deleteBtn = $('.content1')[0];

updateList(data);

// 添加紀錄
function updateList(data) {
    var str = '';
    for (i = 0; i < data.length; i++) {
        str +=
            `<div class="content">
            <div class="smallBox" style="background-color: ${data[i].color} "></div>
                <h1> ${data[i].ch} </h1>
                    <div class="contentValue">
                        <span>BMI <samp class="bmi"> ${data[i].BMI} </samp></span>
                        <span>height<samp class="height"> ${data[i].height} cm</samp></span>
                        <span>weight<samp class="weight"> ${data[i].weigth} kg</samp></span>
                    </div>
                    <span class="date"> ${data[i].time} <a href="#" data-index= ${i} >移除</a></span>
            </div>
        </div>`;
    };
    $('.record .content1').html(str);
    // $('.record .smallBox').css('background-color', data[i].color);
    localStorage.setItem('dataKey', JSON.stringify(data));

    console.log(deleteBtn)
};

//刪除紀錄
deleteBtn.addEventListener('click', dataDelete);


function dataDelete(e) {
    e.preventDefault();
    var index = e.target.dataset.index;
    // console.log(index);
    if (e.target.tagName !== 'A') { return };
    console.log(index)
    data.splice(index, 1);
    localStorage.setItem('dataKey', JSON.stringify(data));
    updateList(data);
}

btn.click(function() {
    var heightValue = Number($('.heightValue').val());
    var weightValue = Number($('.weightValue').val());
    bmi = weightValue / ((heightValue / 100) * (heightValue / 100));
    bmi = bmi.toFixed(2);
    console.log(bmi);

    //輸入框=0或空白
    if (heightValue <= 0 || weightValue <= 0) {
        alert('輸入錯誤');
        return;
    }

    if (bmi < 18.5) {
        //過輕
        $('.result').css('display', 'none');
        $('.bt').css('display', 'unset');
        $('.green p').html(bmi);
        $('.green').css('display', 'flex');
        $('.green').css('border-color', '#31BAF9');
        $('.green').css('color', '#31BAF9');
        $('.bt h1').css('color', '#31BAF9');
        $('.bt h1').html('過輕');
    } else if (bmi >= 18.5 && bmi < 24) {
        //理想
        $('.result').css('display', 'none');
        $('.bt').css('display', 'unset');

        $('.green p').html(bmi);
        $('.green').css('display', 'flex');
        $('.green').css('border-color', '#86D73E');
        $('.green').css('color', '#86D73E');

        $('.bt h1').css('color', '#86D73E');
        $('.bt h1').html('理想');
    } else if (24 <= bmi && bmi < 27) {
        //過重
        $('.result').css('display', 'none');
        $('.bt').css('display', 'unset');

        $('.green p').html(bmi);
        $('.green').css('display', 'flex');
        $('.green').css('border-color', '#FF982D');
        $('.green').css('color', '#FF982D');

        $('.bt h1').css('color', '#FF982D');
        $('.bt h1').html('過重');
    } else if (27 <= bmi && bmi < 30) {
        //輕度肥胖
        $('.result').css('display', 'none');
        $('.bt').css('display', 'unset');

        $('.green p').html(bmi);
        $('.green').css('display', 'flex');
        $('.green').css('border-color', '#FF6C02');
        $('.green').css('color', '#FF6C02');

        $('.bt h1').css('color', '#FF6C02');
        $('.bt h1').html('輕度肥胖');
    } else if (30 <= bmi && bmi < 35) {
        //中度肥胖
        $('.result').css('display', 'none');
        $('.bt').css('display', 'unset');

        $('.green p').html(bmi);
        $('.green').css('display', 'flex');
        $('.green').css('border-color', '#FF6C02');
        $('.green').css('color', '#FF6C02');

        $('.bt h1').css('color', '#FF6C02');
        $('.bt h1').html('中度肥胖');
    } else if (bmi >= 35) {
        //重度肥胖
        $('.result').css('display', 'none');
        $('.bt').css('display', 'unset');

        $('.green p').html(bmi);
        $('.green').css('display', 'flex');
        $('.green').css('border-color', '#FF1200');
        $('.green').css('color', '#FF1200')

        $('.bt h1').css('color', '#FF1200');
        $('.bt h1').html('重度肥胖');
    }

    var date = new Date();
    todo = {
        ch: $('.bt h1').text(),
        BMI: bmi,
        weigth: weightValue,
        height: heightValue,
        color: $('.green').css('color'),
        time: date.toLocaleDateString(),
    }
    data.push(todo);
    updateList(data);

});

//重新測試
restBtn.click(function reset() {
    $('.heightValue').val('');
    $('.weightValue').val('');
    bmi = 0;
    $('.result').css('display', 'flex');
    $('.green').css('display', 'none');

    $('.bt').css('display', 'none');
});