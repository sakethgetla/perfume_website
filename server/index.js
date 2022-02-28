var express = require('express');
var app = express();
var user_router = require('./routes/userRoutes');
var perfume_router = require('./routes/perfumeRoutes');
var comment_router = require('./routes/commentRoutes');
var message_router = require('./routes/messageRoutes');
var userSetting_router = require('./routes/userSettingRoutes');
var bodyParser = require('body-parser');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//To parse json data
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/user/message', message_router);
app.use('/user', user_router);
app.use('/user/setting', userSetting_router);
app.use('/perfume/comment', comment_router);
app.use('/perfume', perfume_router);

app.listen(8000);

//db.test();


//app.post('/newUser', async function(req, res){
//    //const users = await db.makeNewUser(req.body);
//    //console.log(users);
//    console.log('newuser');
//    console.log(req.body);
//    res.status(200);
//    res.send('post recieved');
//});



