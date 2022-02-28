var express = require('express');
var assert = require('assert');
var router = express.Router();
const knexs = require("../setdb");
const {newId} =  require("../helperFunctions");


router.get('/', async (req, res)=>{
    console.log('get messages');
    try {
        let out = await knexs("messages").select("*").where(req.query).limit(10);
	res.send(out);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.delete('/', async (req, res)=>{
    console.log('delete messages');
    try {
	assert('message_id' in req.body, "no message_id");
        let id = {'message_id' : req.body['message_id']};
	console.log(req.body);
        await knexs("messages").where(id).del();
	//res.status(200);
	res.send('deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.put('/', async function(req, res){
    //assert.equal('message_id' in req.body, false, "don't you dare update the id");
    //req.body['message_id'] = await newId('messages');
    try {
	assert('message_id' in req.body, "no message_id");
        let id = {'message_id' : req.body['message_id']};
        delete req.body['message_id'];
	assert(!('message_id' in req.body), "don't you dare update the id");
	console.log(req.body);
	knexs("messages").where(id).update(req.body).then((messages)=>{
	    console.log(messages);
	    console.log('newmessage');
	    //console.log(req);
	    res.status(200);
	    res.send('posted');
        });
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
    
});

router.post('/', async function(req, res){
    req.body['message_id'] = await newId('messages');
    req.body['sent_time'] = Date.now();
    try {
	console.log(req.body);
	const messages = await knexs("messages").insert(req.body);
	console.log(messages);
	console.log('newmessage');
	//console.log(req);
	//res.status(200);
	res.send('new message posted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


module.exports = router;
