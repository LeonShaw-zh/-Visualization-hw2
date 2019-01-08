var tab = echarts.init(document.getElementById('tab'));
var btn = document.getElementById("vpbutton");
var currentyear = years[0];
var valueOrPer = true;

function initial(){
    tab.setOption({
        title : {
            text: currentyear+'年浙江省城市房地产收益',
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

    document.getElementById('tab').onmousewheel = Scroll;
    btn.onclick = function(){
        valueOrPer = !valueOrPer;
        flushData();
    };
    flushData();
}

function flushData(){
    var series = [];
    var data = [];
    for(var city in citys)
        if(valueOrPer)
            data = data.concat(consin[city_index[citys[city]]][currentyear]);
        else
            data = data.concat(((consin[city_index[citys[city]]][currentyear]/consout[city_index[citys[city]]][currentyear]*100)-0.01).toFixed(2));

    var serie = {"name": '商品房收入',"type": 'bar',"stack": 'GDP',
                    "label": {
                        "normal": {
                            "show": true,
                            "position": 'inside',
                            "formatter": '{c}'
                        }
                    },
                    "data":data
                };
    series = series.concat(serie);
    // sum
    var sumdata = [];
    for(var city in citys)
        if(valueOrPer)
            sumdata = sumdata.concat(consout[city_index[citys[city]]][currentyear]);
        else
            sumdata = sumdata.concat(100);
    series = series.concat({
        "name": '房地产投资',
        "type": 'bar',
        "stack": '总计',
        "barGap": '-100%',
        "label": {
            "normal": {
                "show": true,
                "position": 'right',
                "textStyle": { "color": '#000' },
                "formatter": ""
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
    option.title[0].text = currentyear+'年浙江省城市房地产收益';
    option.series = series;
    tab.setOption(option); 
}

function Scroll(e){
    currentyear = currentyear + parseInt(e.wheelDelta/100);
    currentyear = (currentyear<2013)?2013:currentyear;
    currentyear = (currentyear>2017)?2017:currentyear;
    flushData();
}

