const router = require ("express").Router ();
const line = require ("@line/bot-sdk");
require('dotenv').config();

// 設定安全碼
const config = { channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret };

// 建立對話人
const client = new line.Client (config);


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
module.exports = router;