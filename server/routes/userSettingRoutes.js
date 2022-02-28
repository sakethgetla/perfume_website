var express = require('express');
var assert = require('assert');
var router = express.Router();
const knexs = require("../setdb");
const {newId} =  require("../helperFunctions");


router.post('/like', async function(req, res){
    //req.body['user_id'] = await newId('users');
    try {
	assert('user_id' in req.body, "no user_id");
	assert('perfume_id' in req.body, "no perfume_id");
	console.log(req.body);
	const users = await knexs("likes").insert(req.body);
	console.log(users);
	console.log('new like');
	//console.log(req);
	//res.status(200);
	res.send('new like posted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.get('/like', async (req, res)=>{
    console.log('get likes ids');
    try {
	//assert('user_id' in req.body, "no user_id");
        let out = await knexs("likes").select("*").where(req.query).limit(100);
	console.log('get likes');
	res.send(out);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.delete('/like', async (req, res)=>{
    console.log('delete likes');
    try {
	assert('user_id' in req.body, "no user_id");
	assert('perfume_id' in req.body, "no perfume_id");
	console.log(req.body);
        await knexs("likes").where(req.body).del();
	//res.status(200);
	res.send('like deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.post('/bookmark', async function(req, res){
    //req.body['user_id'] = await newId('users');
    try {
	assert('user_id' in req.body, "no user_id");
	assert('perfume_id' in req.body, "no perfume_id");
	console.log(req.body);
	const users = await knexs("bookmarks").insert(req.body);
	console.log(users);
	console.log('new bookmark');
	//console.log(req);
	//res.status(200);
	res.send('new bookmark posted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.get('/bookmark', async (req, res)=>{
    console.log('get bookmarks ids');
    try {
	//assert('user_id' in req.body, "no user_id");
        let out = await knexs("bookmarks").select("*").where(req.query).limit(100);
	console.log('get bookmarks');
	res.send(out);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.delete('/bookmark', async (req, res)=>{
    console.log('delete bookmarks');
    try {
	assert('user_id' in req.body, "no user_id");
	assert('perfume_id' in req.body, "no perfume_id");
	console.log(req.body);
        await knexs("bookmarks").where(req.body).del();
	//res.status(200);
	res.send('bookmark deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.post('/dislike', async function(req, res){
    //req.body['user_id'] = await newId('users');
    try {
	assert('user_id' in req.body, "no user_id");
	assert('perfume_id' in req.body, "no perfume_id");
	console.log(req.body);
	const users = await knexs("dislikes").insert(req.body);
	console.log(users);
	console.log('new dislike');
	//console.log(req);
	//res.status(200);
	res.send('new dislike posted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.get('/dislike', async (req, res)=>{
    console.log('get dislikes ids');
    try {
	//assert('user_id' in req.body, "no user_id");
        let out = await knexs("dislikes").select("*").where(req.query).limit(100);
	console.log('get dislikes');
	res.send(out);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.delete('/dislike', async (req, res)=>{
    console.log('delete dislikes');
    try {
	assert('user_id' in req.body, "no user_id");
	assert('perfume_id' in req.body, "no perfume_id");
	console.log(req.body);
        await knexs("dislikes").where(req.body).del();
	//res.status(200);
	res.send('dislike deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});





module.exports = router;
