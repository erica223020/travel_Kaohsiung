//宣告空陣列存放區域、空的物件存放資料
let areaArray = [];
let dataObject = {} ;

//建立新的連線
let requestURL = new XMLHttpRequest();

requestURL.open('get','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c');
requestURL.send();

//頁面完成加載時觸發reqListener
requestURL.addEventListener('load',reqListener);


function reqListener () {
    if(requestURL.status == 200){
        let opendata = JSON.parse(requestURL.responseText);
        dataObject = opendata.data.XML_Head.Infos.Info; //XML_Head.Infos.Info是讀取節點資訊
    }
    else{
        alert("資料讀取錯誤");
    }
}

