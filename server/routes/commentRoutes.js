var express = require('express');
var assert = require('assert');
var router = express.Router();
const knexs = require("../setdb");
const {newId} =  require("../helperFunctions");


router.put('/', async function(req, res){
    try {
	assert('comment_id' in req.body, "no comment_id");
        let id = {'comment_id' : req.body['comment_id']};
        delete req.body['comment_id'];
	assert(!('comment_id' in req.body), "don't you dare update the id");
	console.log(req.body);
	knexs("comments").where(id).update(req.body).then((comment)=>{
	    console.log(comment);
	    console.log('comment');
	    //console.log(req);
	    res.status(200);
	    res.send('comment edited');
        });

	//console.log(req);
	res.status(200);
	res.send('posted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.post('/', async function(req, res){
    try {
	assert(!('comment_id' in req.body), "don't you dare send the id");
	req.body['comment_id'] = await newId('comments');
	req.body['sent_time'] = Date.now();
	const comment = await knexs("comments").insert(req.body);
	console.log(comment);
	//console.log(req);
	//res.status(200);
	res.send('posted comment');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.get('/', async (req, res)=>{
    //console.log(req.query['brand']);
    try {
	const comment = await knexs("comments").select('*').where(req.query).limit(10);
	console.log(comment);
	res.send(comment);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
    //res.send('hello');
    //res.send(getnames());
});

router.delete('/', async (req, res)=>{
    console.log('delete comments');
    try {
	assert('comment_id' in req.body, "no comment_id");
	console.log(req.body);
        await knexs("comments").where(req.body).del();
	//res.status(200);
	res.send('deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


module.exports = router;
