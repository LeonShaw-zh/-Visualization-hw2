var tab = echarts.init(document.getElementById('tab'));
var btn = document.getElementById("vpbutton");
var currentindex = 0;
var currentcity = citys[0];
var valueOrPer = true;

function initial(){
    tab.setOption({
        title : {
            text: '2013-2017年'+currentcity+'房地产收益',
            x:'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ["商品房收入","房地产投资"]
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type : 'category',
            boundaryGap : false,
            data : years
        },
        yAxis: {
            type : 'value'
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
    for(var year in years)
        if(valueOrPer)
            data = data.concat(consin[city_index[currentcity]][years[year]]);
        else
            data = data.concat(((consin[city_index[currentcity]][years[year]]/consout[city_index[currentcity]][years[year]]*100)-0.01).toFixed(2));

    var serie = {"name": "商品房收入",
                    "type": 'line',
                    "stack": 'cons',
                    "label": {
                    "normal": {
                        "show": true,
                        "position": 'bottom'
                    }
                    },
                    "areaStyle":{},
                    "data":data
                };
    series = series.concat(serie);
    // sum
    var sumdata = [];
    for(var year in years)
        if(valueOrPer)
            sumdata = sumdata.concat(consout[city_index[currentcity]][years[year]]);
        else
            sumdata = sumdata.concat(100);
    series = series.concat({
        "name": "房地产投资",
        "type": 'line',
        "stack": '总计',
        "label": {
            "normal": {
                "show": true,
                "position": 'top',
                "textStyle": { "color": '#000' },
                "formatter": function(v) {
                    return "支出" + (v.value)
                }
            }
        },
        "areaStyle":{normal: {}},
        "itemStyle": { 
            "normal": { 
                "color": 'rgba(128, 128, 128, 0.1)'
            } 
        },
        "data": sumdata
    });
    // 更新
    var option = tab.getOption();
    option.title[0].text = '2013-2017年'+currentcity+'房地产收益';
    option.series = series;
    tab.setOption(option); 
}

function Scroll(e){
    currentindex = currentindex + parseInt(e.wheelDelta/100);
    currentindex = (currentindex<0)?0:currentindex;
    currentindex = (currentindex>=citys.length)?citys.length-1:currentindex;
    currentcity = citys[currentindex];
    flushData();
}

