const express = require('express');
const app = express();
app.engine('html', require('ejs').renderFile);
app.get('/',function(req,res){
    res.render(__dirname+'/index.html');
});
app.listen(8080,function(){
    return console.log("It's working");
});