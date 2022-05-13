//宣告空陣列存放區域、空的物件存放資料
let areaArray = [];
let dataObject = {};
let len;

//建立新的連線
let requestURL = new XMLHttpRequest();

requestURL.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json');
requestURL.send();

//頁面加載完成後立刻執行以下
requestURL.onload = 

//確認是否讀取到資料，並分析json內的資料
function reqListener () {
    if(requestURL.status == 200){
        let opendata = JSON.parse(requestURL.responseText);
        dataObject = opendata.result.records; //result.records是讀取資料所回傳的路徑

//下拉式選單，將Zone的區域抓出來
        let catchArea = [];
        len = dataObject.length;
        for(let i=0;len>i;i++){
        catchArea.push(dataObject[i].Zone);
        }

//使用Set的特性篩選重複的區域
        let dataSet = new Set(catchArea);
        catchArea = [...dataSet];//用...來組合(連接)陣列，後面必定接著一個陣列

//將篩選完的陣列資料放入下拉式選單，並渲染網頁
        const areaLen = catchArea.length;
        const chooseArea = document.querySelector('.chooseArea');
        for (let i=0;areaLen>i;i++){
            let newOption = document.createElement('option');
            newOption.textContent = catchArea[i];
            newOption.value = catchArea[i];
            chooseArea.appendChild(newOption);   
        }
    }          
    else{
        alert("資料讀取錯誤");
    }
}

//增加監聽器，監聽下拉式選單的改變
let chooseArea = document.querySelector('.chooseArea');
chooseArea.addEventListener('change',refreshPage,false);

//下拉式選單改變後，篩選符合的資料，並顯示在頁面
function refreshPage(e){
    let select = e.target.value;
    let areaItem = [];
    for(let i=0;len>i;i++){
      if (select == dataObject[i].Zone){
        areaItem.push(dataObject[i]);
        alert(areaItem);
      }
    }
  }




