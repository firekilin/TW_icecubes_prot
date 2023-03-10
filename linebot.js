const router = require ("express").Router ();
const line = require ("@line/bot-sdk");
const fs = require('fs');
require('dotenv').config();

// 設定安全碼
const config = { channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret };

// 建立對話人
const client = new line.Client (config);
const prottype =["地上式單口式","地上打倒安全式(單口)","地上式雙口式","地上打倒安全式(雙口)","地下式單口式","地下式雙口式"]

// 設定callback為api
router.post ("/", line.middleware (config), async(req, res) => {
  
  const event = req.body.events[0];
  console.log (event);
  if (event.type === "message") {
    const message = event.message;

    if (message.type === "text" && message.text === "作者") 
    {
      await info (event);
    }
    else if (message.type == "text" && message.text === "查詢系統")
    {
      await showtime (event);
    } 
    else if (message.type == "location")
    {
      console.log(message.latitude);
      console.log(message.longitude);
      console.log(message.address);

      console.log(await getnear(event,message.latitude,message.longitude));
      client.replyMessage(event.replyToken, [
        {
            type: 'location',
            title: '測試',
            address: "測試",
            latitude: 24.950435,
            longitude: 121.2317493
        }
      ]
    )
    } else {
      
      client.replyMessage (event.replyToken, [{ type: "text", text: "無此指令" }]);
    }
  }
  if (event.type === "postback"){
    const postback = event.postback;
    if (postback.data === "more")
      await showmore (event);
    
    if (postback.data === "各地區消防栓")
      await localprot (event);
      
    if (postback.data === "說明")
      await info (event);

    if (postback.data.split("&")[0]=== "消防栓地圖")
      await showmap (event,postback.data.split("&")[1],postback.data.split("&")[2],postback.data.split("&")[3],postback.data.split("&")[4]);
  }

});


//說明
let info = async(event) => {
  client.replyMessage (event.replyToken, [{ type: "text",
    text: `
作者：
  安安我是冰塊
  可以私訊我 製作有趣的東西
  盡量小且便利（不清楚也可以問問看）
  若我喜歡可以免費ＸＤ 不過我會放抖內按鈕
  此程式希望協助到各位

  直接傳給地址定位看看
  或者輸入：查詢系統
    ` }]);
};

let showtime = (event) => {
  client.replyMessage (event.replyToken, [
    {
      "type": "flex",
      "altText": "冰塊消防栓查詢系統",
      "contents": { "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "size": "nano",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "使用說明",
                  "color": "#ffffff",
                  "align": "start",
                  "size": "md",
                  "gravity": "center"
                }
              ],
              "backgroundColor": "#27D190",
              "paddingTop": "19px",
              "paddingAll": "12px",
              "paddingBottom": "16px"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "postback",
                        "label": "說明",
                        "data": "說明"
                      },
                      "style": "secondary"
                    }
                  ],
                  "flex": 1
                }
              ]
            },
            "styles": { "footer": { "separator": false } }
          },
          {
            "type": "bubble",
            "size": "nano",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "查詢",
                  "color": "#ffffff",
                  "align": "start",
                  "size": "md",
                  "gravity": "center"
                }
              ],
              "backgroundColor": "#2593FA",
              "paddingTop": "19px",
              "paddingAll": "12px",
              "paddingBottom": "16px"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "postback",
                        "label": "各地區消防栓",
                        "data": "各地區消防栓"
                      },
                      "style": "secondary"
                    }
                  ],
                  "flex": 1
                }
              ],
              "spacing": "md",
              "paddingAll": "12px"
            },
            "styles": { "footer": { "separator": false } }
          },
          {
            "type": "bubble",
            "size": "nano",
            "header": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "愛錢的我",
                  "color": "#ffffff",
                  "align": "start",
                  "size": "md",
                  "gravity": "center"
                }
              ],
              "backgroundColor": "#F77C59",
              "paddingTop": "19px",
              "paddingAll": "12px",
              "paddingBottom": "16px"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "uri",
                        "label": "抖內",
                        "uri": "https://p.ecpay.com.tw/8E29ABF"
                      },
                      "style": "secondary"
                    }
                  ],
                  "flex": 1
                }
              ],
              "spacing": "md",
              "paddingAll": "12px"
            },
            "styles": { "footer": { "separator": false } }
          }
        ] }
    }
  ]);
};

let showmore = (event)=>{
  client.replyMessage (event.replyToken, [{ type: "text",
  text: `
showmore
  ` }]);
}

let localprot = (event)=>{
  client.replyMessage (event.replyToken, [{ type: "text",
  text: `
localprot
  ` }]);
}

let showmap = (event,x,y,name,type)=>{
  client.replyMessage(event.replyToken, [
      {
          type: 'location',
          title: type,
          address: name,
          latitude: x,
          longitude: y
      }
    ]
  );
}

let getnear =async (event,x,y)=>{
  let alldata=await (await fs.promises.readFile("./prot/全台.csv","utf-8")).split("\r\n");
  let longlist=[[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""]];

  for(let i in alldata){
    let datacontent=alldata[i].split(",");
    let getlatlng=twd97_to_latlng(datacontent[2],datacontent[3]);
    let getlinelong=getline(x,y,getlatlng.lat,getlatlng.lng);
    console.log(getlinelong);
    if(longlist[0][0]<getlinelong){
      longlist[0][0]=getlinelong;
      longlist[0][1]=getlatlng.lat;
      longlist[0][2]=getlatlng.lng;
      longlist[0][3]=datacontent[0]+datacontent[1];
      longlist[0][4]=prottype[datacontent[4]];
      longlist.sort();
    }
  }
  return longlist;
}
function  getline(x,y,$x,$y){
  return (((x-$x)**2)+((y-$y)**2))**(1/2);
}

function twd97_to_latlng($x, $y) {
  var pow = Math.pow, M_PI = Math.PI;
  var sin = Math.sin, cos = Math.cos, tan = Math.tan;
  var $a = 6378137.0, $b = 6356752.314245;
  var $lng0 = 121 * M_PI / 180, $k0 = 0.9999, $dx = 250000, $dy = 0;
  var $e = pow((1 - pow($b, 2) / pow($a, 2)), 0.5);

  $x -= $dx;
  $y -= $dy;

  var $M = $y / $k0;

  var $mu = $M / ($a * (1.0 - pow($e, 2) / 4.0 - 3 * pow($e, 4) / 64.0 - 5 * pow($e, 6) / 256.0));
  var $e1 = (1.0 - pow((1.0 - pow($e, 2)), 0.5)) / (1.0 + pow((1.0 - pow($e, 2)), 0.5));

  var $J1 = (3 * $e1 / 2 - 27 * pow($e1, 3) / 32.0);
  var $J2 = (21 * pow($e1, 2) / 16 - 55 * pow($e1, 4) / 32.0);
  var $J3 = (151 * pow($e1, 3) / 96.0);
  var $J4 = (1097 * pow($e1, 4) / 512.0);

  var $fp = $mu + $J1 * sin(2 * $mu) + $J2 * sin(4 * $mu) + $J3 * sin(6 * $mu) + $J4 * sin(8 * $mu);

  var $e2 = pow(($e * $a / $b), 2);
  var $C1 = pow($e2 * cos($fp), 2);
  var $T1 = pow(tan($fp), 2);
  var $R1 = $a * (1 - pow($e, 2)) / pow((1 - pow($e, 2) * pow(sin($fp), 2)), (3.0 / 2.0));
  var $N1 = $a / pow((1 - pow($e, 2) * pow(sin($fp), 2)), 0.5);

  var $D = $x / ($N1 * $k0);

  var $Q1 = $N1 * tan($fp) / $R1;
  var $Q2 = (pow($D, 2) / 2.0);
  var $Q3 = (5 + 3 * $T1 + 10 * $C1 - 4 * pow($C1, 2) - 9 * $e2) * pow($D, 4) / 24.0;
  var $Q4 = (61 + 90 * $T1 + 298 * $C1 + 45 * pow($T1, 2) - 3 * pow($C1, 2) - 252 * $e2) * pow($D, 6) / 720.0;
  var $lat = $fp - $Q1 * ($Q2 - $Q3 + $Q4);

  var $Q5 = $D;
  var $Q6 = (1 + 2 * $T1 + $C1) * pow($D, 3) / 6;
  var $Q7 = (5 - 2 * $C1 + 28 * $T1 - 3 * pow($C1, 2) + 8 * $e2 + 24 * pow($T1, 2)) * pow($D, 5) / 120.0;
  var $lng = $lng0 + ($Q5 - $Q6 + $Q7) / cos($fp);

  $lat = ($lat * 180) / M_PI;
  $lng = ($lng * 180) / M_PI;

  return {
    lat: $lat,
    lng: $lng
  };
}
module.exports = router;