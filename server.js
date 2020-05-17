const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('public'))

app.set('view engine', 'ejs'); 
app.get('/',function(req,response){
    response.render('index' );
}); 
var fetchUser = "masaow";
app.get('/ratings',function(req,response){
    fetchUser = req.query.userHandle;
    response.render('ratings',{ejs_user : fetchUser });
});
app.get('/tags',function( request, response){
    response.render('tags',{ejs_user : fetchUser});    
});
const port = process.env.PORT || 8080;
app.listen(port,function(){
    return console.log(`Server up at - ${port}`);
});