var tab = echarts.init(document.getElementById('tab'));
var btn = document.getElementById("vpbutton");
var yearstart = 0;
var yearend   = years.length-1;
var valueOrPer = true;

function initial(){
    tab.setOption({
        title : {
            text: years[yearstart]+"年到"+years[yearend]+'年浙江省城市房地产收益',
            x:'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ["商品房收入","房地产投资"]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: citys
        }
    });

    // document.getElementById('tab').onmousewheel = Scroll;
    document.onkeydown = keydownaction;
    btn.onclick = function(){
        valueOrPer = !valueOrPer;
        flushData();
    };
    flushData();
}

function flushData(){
    var series = [];
    var data = [];
    var sumdata = [];
    for(var city in citys){
        var temsumin  = 0;
        var temsumout = 0;
        for(var i=yearstart; i<=yearend; i++){
            temsumin  += parseFloat(consin[city_index[citys[city]]][years[i]]);
            temsumout += parseFloat(consout[city_index[citys[city]]][years[i]]);
        }
        console.log(temsumin);
        if(valueOrPer){
            data = data.concat(temsumin.toFixed(2));
            sumdata = sumdata.concat(temsumout.toFixed(2));
        }else{
            data = data.concat(((temsumin/temsumout*100)-0.01).toFixed(2));
            sumdata = sumdata.concat(100);
        }
    }
    series = series.concat({
        "name": '商品房收入',"type": 'bar',"stack": 'GDP',
        "label": {
            "normal": {
                "show": true,
                "position": 'inside',
                "formatter": '{c}'
            }
        },
        "data":data
    });
    series = series.concat({
        "name": '房地产投资',
        "type": 'bar',
        "stack": '总计',
        "barGap": '-100%',
        "label": {
            "normal": {
                "show": true,
                "position": 'right',
                "textStyle": { "color": '#000' }
            }
        },
        "itemStyle": { 
            "normal": { 
                "color": 'rgba(128, 128, 128, 0)',
                "borderWidth": 0.5,
                "borderColor": '#000'
            } 
        },
        "data": sumdata
    });
    // 更新
    var option = tab.getOption();
    option.title[0].text = years[yearstart]+"年到"+years[yearend]+'年浙江省城市房地产收益';
    option.series = series;
    tab.setOption(option); 
}

function keydownaction(e){
    var keyNum = window.event?e.keyCode:e.which;
    // left
    if(keyNum == 37){
        yearstart = (yearstart==0)?0:yearstart-1;
    }
    // up
    if(keyNum == 38){
        yearend = (yearend==years.length-1)?years.length-1:yearend+1;
    }
    // right
    if(keyNum == 39){
        yearstart = (yearstart==years.length-1)?years.length-1:yearstart+1;
    }
    // down
    if(keyNum == 40){
        yearend = (yearend==0)?0:yearend-1;
    }
    if(yearstart>yearend){
        yearstart = yearend;
    }
    flushData();
}

