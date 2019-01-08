var input = document.getElementById("excel-file");
var citys = ["杭州市","宁波市","嘉兴市","湖州市","绍兴市","舟山市","温州市","金华市","衢州市","台州市","丽水市"];
var city_index = {"杭州市":0,"宁波市":1,"嘉兴市":2,"湖州市":3,"绍兴市":4,"舟山市":5,"温州市":6,"金华市":7,"衢州市":8,"台州市":9,"丽水市":10};
var years = [2013,2014,2015,2016,2017];
var outsum=[], consout=[], consin=[];

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
        outsum  = outsum.concat(XLSX.utils.sheet_to_json(workbook.Sheets["固定资产投资（亿元）"]));
        consout = consout.concat(XLSX.utils.sheet_to_json(workbook.Sheets["房地产开发投资（亿元）"]));
        consin  = consin.concat(XLSX.utils.sheet_to_json(workbook.Sheets["商品房销售额（亿元）"]));

        citys.sort(function(x,y){
            return outsum[city_index[y]][2017] -
                outsum[city_index[x]][2017];
        });

        initial();
    };
    reader.readAsBinaryString(files[0]);
};



