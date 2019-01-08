var input = document.getElementById("excel-file");
var citys = ["杭州市","宁波市","嘉兴市","湖州市","绍兴市","舟山市","温州市","金华市","衢州市","台州市","丽水市"];
var city_index = {"杭州市":0,"宁波市":1,"嘉兴市":2,"湖州市":3,"绍兴市":4,"舟山市":5,"温州市":6,"金华市":7,"衢州市":8,"台州市":9,"丽水市":10};
var types = ["第一产业", "第二产业", "第三产业"];
var years = [2013,2014,2015,2016,2017];
var GDP=[], perGDP=[], industrys=[[],[],[]];

input.onchange = function(e){
    var files = e.target.files;
    var reader = new FileReader();
    reader.onload = function(ev) {
        try {
            var data = ev.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                }); // 以二进制流方式读取得到整份excel表格对象
        } catch (e) {
            console.log('文件类型不正确');
            return;
        }
        GDP       = GDP.concat(XLSX.utils.sheet_to_json(workbook.Sheets["生产总值（亿元）"]));
        perGDP    = perGDP.concat(XLSX.utils.sheet_to_json(workbook.Sheets["人均生产总值（亿元）"]));
        industrys[0] = industrys[0].concat(XLSX.utils.sheet_to_json(workbook.Sheets["第一产业（亿元）"]));
        industrys[1] = industrys[1].concat(XLSX.utils.sheet_to_json(workbook.Sheets["第二产业（亿元）"]));
        industrys[2] = industrys[2].concat(XLSX.utils.sheet_to_json(workbook.Sheets["第三产业（亿元）"]));

        citys.sort(function(x,y){
            return GDP[city_index[y]][2017] -
                GDP[city_index[x]][2017];
        });

        initial();
    };
    reader.readAsBinaryString(files[0]);
};



