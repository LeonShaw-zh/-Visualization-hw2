var tab = echarts.init(document.getElementById('tab'));
var btn = document.getElementById("vpbutton");
var currentindex = 0;
var currentcity = citys[0];
var valueOrPer = true;

function initial(){
    tab.setOption({
        title : {
            text: '2013-2017年'+currentcity+'GDP',
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
            data: types.concat("总计")
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
    for(var type in types){
        var data = [];
        for(var year in years)
            if(valueOrPer)
                data = data.concat(industrys[type][city_index[currentcity]][years[year]]);
            else
                data = data.concat(((industrys[type][city_index[currentcity]][years[year]]/GDP[city_index[currentcity]][years[year]]*100)-0.01).toFixed(2));

        var serie = {"name": types[type],
                     "type": 'line',
                     "stack": 'GDP',
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
    }
    // sum
    var sumdata = [];
    for(var year in years)
        if(valueOrPer)
            sumdata = sumdata.concat(GDP[city_index[currentcity]][years[year]]);
        else
            sumdata = sumdata.concat(100);
    series = series.concat({
        "name": '总计',
        "type": 'line',
        "stack": '总计',
        "label": {
            "normal": {
                "show": true,
                "position": 'top',
                "textStyle": { "color": '#000' },
                "formatter": function(v) {
                    return "总计：" + (v.value)
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
    option.title[0].text = '2013-2017年'+currentcity+'GDP';
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

