// 設定安全碼
const config = { 
  channelAccessToken: "",
  channelSecret: "" 
};
const prottype =["地上式單口式","地上打倒安全式(單口)","地上式雙口式","地上打倒安全式(雙口)","地下式單口式","地下式雙口式"]


function botEcho(reToken, userMsg) {
	var url = 'https://api.line.me/v2/bot/message/reply';
	var opt = {
		'headers': {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': 'Bearer ' + config.channelAccessToken,
		},
		'method': 'post',
		'payload': JSON.stringify({
				'replyToken': reToken,
				'messages': userMsg
				})
	};
	var res = UrlFetchApp.fetch(url, opt);
	return res;
}

function doPost(e) { 
  const event = JSON.parse(e.postData.contents).events[0];
  const reToken = event.replyToken;
  
	if (typeof reToken === 'undefined') return;

  if (event.type === "message") {

    const message = event.message;
  
    if (message.type == "text" && message.text === "消防栓查詢")
    {
       showtime (event);
    }else if (message.type == "location")
    {
   
      getnear(reToken,message.latitude,message.longitude);
    } 
  }
  if (event.type === "postback"){
    const postback = event.postback;
    if (postback.data.split("&")[0]=== "more"){
      showmore(event,postback.data.split("&")[1],postback.data.split("&")[2]);
    }
    
    if (postback.data.split("&")[0]=== "消防栓地圖"){
      showmap (event,postback.data.split("&")[1],postback.data.split("&")[2],postback.data.split("&")[3],postback.data.split("&")[4]);
    }

      
    if (postback.data === "說明")
    {
      info (event);
    }
    if(postback.data==="作者"){
      auther(event);
    }

  }

	//return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


//說明
let info = (event) => {
  botEcho (event.replyToken, [{ type: "text",
    text: `
    直接傳   [定位]
    或輸入   [消防栓查詢]
    ` }]);
};

//作者
let auther = (event) =>{
  botEcho (event.replyToken, [{ type: "text",
    text: `
   作者：
    安安我是冰塊
    可以私訊我 製作有趣的東西
    盡量小且便利（不清楚也可以問問看）
    若我喜歡可以免費ＸＤ 
    不過我會放抖內按鈕
    此程式希望協助到各位
    
    信箱:wl00161839@gmail.com
    ` }]);
};
 
//系統顯示
let showtime =  (event) => {
  botEcho (event.replyToken, [
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
                  "text": "消防栓資料",
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
                        "type": "uri",
                        "label": "維護",
                        "uri": "https://drive.google.com/file/d/1Wu41nX_rqNy3J9A5V0iZQYacCyEISdp1/view?usp=share_link"
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
                  "text": "作者",
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
                },
                {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "height": "sm",
                      "action": {
                        "type": "postback",
                        "label": "作者",
                        "data": "作者"
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


//再取得更多
let showmore = async (event,x,y)=>{

  let testfile= DriveApp.getFileById("1Wu41nX_rqNy3J9A5V0iZQYacCyEISdp1");
  var fileBlob = testfile.getBlob();
  var alldata = fileBlob.getDataAsString().split("\r\n");
  let longlist=[[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""]];

  for(let i in alldata){
    let datacontent=alldata[i].split(",");
    let getlatlng=twd97_to_latlng(datacontent[2],datacontent[3]);
    let getlinelong=getline(x,y,getlatlng.lat,getlatlng.lng);
    if(longlist[0][0]==0){
      longlist[0][0]=getlinelong;
      longlist[0][1]=getlatlng.lat;
      longlist[0][2]=getlatlng.lng;
      longlist[0][3]=datacontent[0]+datacontent[1];
      longlist[0][4]=prottype[datacontent[4]];
      longlist.sort();
    }
    else if(longlist[19][0]>getlinelong ){
      longlist[19][0]=getlinelong;
      longlist[19][1]=getlatlng.lat;
      longlist[19][2]=getlatlng.lng;
      longlist[19][3]=datacontent[0]+datacontent[1];
      longlist[19][4]=prottype[datacontent[4]];
      longlist.sort();
    }
  }
  let moreprot= longlist;

  botEcho(event.replyToken, [{
        "type": "flex",
        "altText": "消防栓",
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
                    "text": "No-11",
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
                    "type": "text",
                    "text": `${moreprot[10][4]}`
                  },
                 
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[10][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[10][1]}&${moreprot[10][2]}&No-11&${moreprot[10][4]}`
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
                    "text": "No-12",
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
                    "type": "text",
                    "text": `${moreprot[11][4]}`
                  },
                
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[11][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[11][1]}&${moreprot[11][2]}&No-12&${moreprot[11][4]}`
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
                    "text": "No-13",
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
                    "type": "text",
                    "text": `${moreprot[12][4]}`
                  },
                 
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[12][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[12][1]}&${moreprot[12][2]}&No-13&${moreprot[12][4]}`
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
                    "text": "No-14",
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
                    "type": "text",
                    "text": `${moreprot[13][4]}`
                  },
                 
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[13][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[13][1]}&${moreprot[13][2]}&No-14&${moreprot[13][4]}`
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
                    "text": "No-15",
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
                    "type": "text",
                    "text": `${moreprot[14][4]}`
                  },
               
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[14][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[14][1]}&${moreprot[14][2]}&No-15&${moreprot[14][4]}`
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
                    "text": "No-16",
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
                    "type": "text",
                    "text": `${moreprot[15][4]}`
                  },
             
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[15][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[15][1]}&${moreprot[15][2]}&No-16&${moreprot[15][4]}`
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
            },{
              "type": "bubble",
              "size": "nano",
              "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "No-17",
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
                    "type": "text",
                    "text": `${moreprot[16][4]}`
                  },
                
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[16][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[16][1]}&${moreprot[16][2]}&No-17&${moreprot[16][4]}`
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
                    "text": "No-18",
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
                    "type": "text",
                    "text": `${moreprot[17][4]}`
                  },
                 
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[17][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[17][1]}&${moreprot[17][2]}&No-18&${moreprot[17][4]}`
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
                    "text": "No-19",
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
                    "type": "text",
                    "text": `${moreprot[18][4]}`
                  },
                
                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[18][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[18][1]}&${moreprot[18][2]}&No-19&${moreprot[18][4]}`
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
            },{
              "type": "bubble",
              "size": "nano",
              "header": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "No-20",
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
                    "type": "text",
                    "text": `${moreprot[19][4]}`
                  },

                  {
                    "type": "text",
                    "text": `${Math.round(((moreprot[19][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${moreprot[19][1]}&${moreprot[19][2]}&No-20&${moreprot[19][4]}`
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
      }]);
}



//轉為map訊息
let showmap = (event,x,y,name,type)=>{
  botEcho(event.replyToken, [
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


//取得最近十筆
let getnear =async (replytoken,x,y)=>{

  let testfile=await  DriveApp.getFileById("1Wu41nX_rqNy3J9A5V0iZQYacCyEISdp1");
  var fileBlob =await testfile.getBlob();
  var alldata =await fileBlob.getDataAsString().split("\r\n");
  let longlist=[[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""],[0,0,0,"",""]];

  for(let i in alldata){
    let datacontent= alldata[i].split(",");
    let getlatlng= twd97_to_latlng(datacontent[2],datacontent[3]);
    let getlinelong= getline(x,y,getlatlng.lat,getlatlng.lng);
    if(longlist[0][0]==0){
      longlist[0][0]=getlinelong;
      longlist[0][1]=getlatlng.lat;
      longlist[0][2]=getlatlng.lng;
      longlist[0][3]=datacontent[0]+datacontent[1];
      longlist[0][4]=prottype[datacontent[4]];
      longlist.sort();
    }
    else if(longlist[9][0]>getlinelong ){
      longlist[9][0]=getlinelong;
      longlist[9][1]=getlatlng.lat;
      longlist[9][2]=getlatlng.lng;
      longlist[9][3]=datacontent[0]+datacontent[1];
      longlist[9][4]=prottype[datacontent[4]];
      longlist.sort();
    }
  }

  let nearprot=longlist;
  botEcho(replytoken, [{
        "type": "flex",
        "altText": "消防栓",
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
                    "text": "No-1",
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
                    "type": "text",
                    "text": `${nearprot[0][4]}`
                  },

                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[0][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[0][1]}&${nearprot[0][2]}&No-1&${nearprot[0][4]}`
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
                    "text": "No-2",
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
                    "type": "text",
                    "text": `${nearprot[1][4]}`
                  },

                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[1][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[1][1]}&${nearprot[1][2]}&No-2&${nearprot[1][4]}`
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
                    "text": "No-3",
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
                    "type": "text",
                    "text": `${nearprot[2][4]}`
                  },

                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[2][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[2][1]}&${nearprot[2][2]}&No-3&${nearprot[2][4]}`
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
                    "text": "No-4",
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
                    "type": "text",
                    "text": `${nearprot[3][4]}`
                  },
                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[3][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[3][1]}&${nearprot[3][2]}&No-4&${nearprot[3][4]}`
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
                    "text": "No-5",
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
                    "type": "text",
                    "text": `${nearprot[4][4]}`
                  },

                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[4][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[4][1]}&${nearprot[4][2]}&No-5&${nearprot[4][4]}`
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
                    "text": "No-6",
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
                    "type": "text",
                    "text": `${nearprot[5][4]}`
                  },
                
                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[5][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[5][1]}&${nearprot[5][2]}&No-6&${nearprot[5][4]}`
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
                    "text": "No-7",
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
                    "type": "text",
                    "text": `${nearprot[6][4]}`
                  },
              
                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[6][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[6][1]}&${nearprot[6][2]}&No-7&${nearprot[6][4]}`
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
                    "text": "No-8",
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
                    "type": "text",
                    "text": `${nearprot[7][4]}`
                  },
              
                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[7][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[7][1]}&${nearprot[7][2]}&No-8&${nearprot[7][4]}`
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
                    "text": "No-9",
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
                    "type": "text",
                    "text": `${nearprot[8][4]}`
                  },
                
                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[8][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[8][1]}&${nearprot[8][2]}&No-9&${nearprot[8][4]}`
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
                    "text": "No-10",
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
                    "type": "text",
                    "text": `${nearprot[9][4]}`
                  },
              
                  {
                    "type": "text",
                    "text": `${Math.round(((nearprot[9][0])*111)*1000)} 公尺`
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "height": "sm",
                        "action": {
                          "type": "postback",
                          "label": "顯示地圖",
                          "data": `消防栓地圖&${nearprot[9][1]}&${nearprot[9][2]}&No-10&${nearprot[9][4]}`
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
                    "text": "顯示更多",
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
                          "label": "更多",
                          "data": `more&${x}&${y}`
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
      }]
  );

}

//取得兩點直線距離
function  getline(x,y,$x,$y){
  return (((x-$x)**2)+((y-$y)**2))**(1/2);
}

//將台灣定位方式轉為經緯度
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