import * as xlsx from 'xlsx'
class mExcel {
    constructor() {
    }
    //将文件按照二进制进行读取
    readFile (file) {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = ev => {
                resolve(ev.target.result)
            }
        })
    }
    //导入excel  ------ 将二进制转json (file是文件流，typeObj是传给后端的表格字段，suc是成功的回调，err是错误的回调）
    async ByteToJson (file, typeObj, suc, err) {
        let data = await this.readFile(file);
        let workbook = xlsx.read(data, { type: "binary" }),
            worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = xlsx.utils.sheet_to_json(worksheet);
        let arr = [];
        data.forEach(item => {
            let obj = {};
            for (let key in typeObj) {
                if (!typeObj.hasOwnProperty(key)) break;
                let v = typeObj[key],
                    text = v.text,
                    type = v.type;
                v = item[text] || "";
                type === "string" ? (v = String(v)) : null;
                type === "number" ? (v = Number(v)) : null;
                obj[key] = v;
            }
            arr.push(obj);
        });
        if (arr.length != 0) {
            suc(arr)
        } else {
            err()
        }
    }
    //导出excel --------
    exportExcel (excelData) {
        //excelData是外部传进来的对象{excelArr:表格数组,excelName:excel文件命名}
        let data = excelData.excelArr;
        let excelName = excelData.excelName;
        let sheet = xlsx.utils.json_to_sheet(data)
        let book = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(book, sheet, 'sheet1')
        xlsx.writeFile(book, `${excelName}.xlsx`)
    }

}
export function initExcel () {
    return new mExcel();
}
