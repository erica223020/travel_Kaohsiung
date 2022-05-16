//宣告空陣列存放區域、空的物件存放資料
let areaArray = [];
let dataObject = {};
let len;
let opendata;

//建立新的連線
let requestURL = new XMLHttpRequest();

requestURL.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json');
requestURL.send();

//頁面加載完成後立刻執行以下
requestURL.onload = 

//確認是否讀取到資料，並分析json內的資料
function reqListener () {
    if(requestURL.status == 200){
      opendata = JSON.parse(requestURL.responseText);
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
        load();
    }          
    else{
        alert("資料讀取錯誤");
    }
}

//一開始呈現第一頁的內容、按照資料數量做分頁
function load(){
  refreshPage(1);
}

//監聽下拉式選單的改變
const chooseArea = document.querySelector('.chooseArea');
const list = document.querySelector('.list');
chooseArea.addEventListener('change',load);

//下拉式選單改變後，篩選符合的資料，並顯示在頁面

function refreshPage(){
//清空陣列
    let areaItem = [];
    list.innerHTML = '';//先清空內容
    let select = chooseArea.value;
    len = dataObject.length;
    let str = '';


//下拉式選單改變後，標題跟著改變
    const resultName = document.querySelector('.resultName');
    resultName.textContent = select;
//結果放入UL
    for(let i=0;len>i;i++){
      let item = 
      `
      <li>
      <div class="pic" style="background: url('${dataObject[i].Picture1}')center no-repeat;background-size: 110%;">
        <h2 class="areaName">${dataObject[i].Name}</h2>
      </div>
      <ul class="info">
        <li class="area_time area">
          <img src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_clock.png" alt="icons_clock" class="clock icon">
          <p>${dataObject[i].Opentime}</p>
        </li>
        <li class="area_add area">
          <img class="icon add" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_pin.png" alt="icons_pin">
          <p>${dataObject[i].Add}</p>
        </li>
        <li class="area_phone area">
          <img class="icon" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_phone.png" alt="icons_phone">
          <p>${dataObject[i].Tel}</p>
        </li>
        <li class="area">
          <img class="icon" src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_tag.png" alt="icons_tag">
          <p>
          ${dataObject[i].Ticketinfo}</p>
        </li>
      </ul>
    </li>
      `;

      if (select == dataObject[i].Zone){
        areaItem.push(dataObject[i]);
        str = str + item;
      }
    }
    list.innerHTML = str;
  
//製作分頁-計算按鈕數量
   let pageAll = document.querySelector('.pageAll');
   let btnNum = Math.ceil(areaItem.length/6);
   let pageStr = '';
  
  for(let i = 0; i <btnNum; i++){
    pageStr += `<li class="pageBtn">${i+1}</li>`;
  }
    pageAll.innerHTML = pageStr;
}

//熱門區按鈕的點選
let hotArea = document.querySelector('.hotArea');
hotArea.addEventListener('click',clickHotArea,false);

function clickHotArea(e){
  let chooseArea = document.querySelector('.chooseArea');

//確定是點在按鈕上
  if (e.target.nodeName !== "BUTTON"){
    return;
  }else{
    let clickbtn = e.target.textContent;
    chooseArea.value = clickbtn;
    refreshPage();
  }
}


//https://israynotarray.com/javascript/20190505/1432256317/  分頁製作

//拆解https://ithelp.ithome.com.tw/articles/10213237
//BMI https://ithelp.ithome.com.tw/articles/10237259

//威良 周