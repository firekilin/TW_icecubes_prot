const fs = require('fs');

let callback=(alldata)=>{
  fs.writeFile("./prot/全台.csv", alldata, (err) => {
    if (err)
      console.log(err);
  });
}
let run= async()=>{
  let alldata="";
  let allfile=await fs.promises.readdir("./prot/");
  for(let i in allfile){
    if(allfile[i]!="全台.csv"){
      let thisdata=await fs.promises.readFile('./prot/'+allfile[i], 'utf8');
      thisdata = thisdata.substring(thisdata.split("\n")[0].length+2);
      alldata+=thisdata;
    }
  }
  callback(alldata);
}
run()
