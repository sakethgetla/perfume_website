var express = require('express');
var assert = require('assert');
var router = express.Router();
const knexs = require("../setdb");
const {newId} =  require("../helperFunctions");


router.get('/', async (req, res)=>{
    console.log('get users');
    try {
        let out = await knexs("users").select("*").where(req.query).limit(10);
	res.send(out);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.delete('/', async (req, res)=>{
    console.log('delete users');
    try {
	assert('user_id' in req.body, "no user_id");
        let id = {'user_id' : req.body['user_id']};
	console.log(req.body);
        await knexs("users").where(id).del();
	//res.status(200);
	res.send('deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.put('/', async function(req, res){
    //assert.equal('user_id' in req.body, false, "don't you dare update the id");
    //req.body['user_id'] = await newId('users');
    try {
	assert('user_id' in req.body, "no user_id");
        let id = {'user_id' : req.body['user_id']};
        delete req.body['user_id'];
	assert(!('user_id' in req.body), "don't you dare update the id");
	console.log(req.body);
	knexs("users").where(id).update(req.body).then((users)=>{
	    console.log(users);
	    console.log('newuser');
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
    req.body['user_id'] = await newId('users');
    try {
	console.log(req.body);
	const users = await knexs("users").insert(req.body);
	console.log(users);
	console.log('newuser');
	//console.log(req);
	//res.status(200);
	res.send('new user posted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.post('/admin', async function(req, res){
    //req.body['user_id'] = await newId('users');
    try {
	console.log(req.body);
	const users = await knexs("admins").insert(req.body);
	console.log(users);
	console.log('new Admin');
	//console.log(req);
	//res.status(200);
	res.send('new admin posted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.get('/admin', async (req, res)=>{
    console.log('get admins ids');
    try {
	//assert('user_id' in req.body, "no user_id");
        let out = await knexs("admins").select("*").where(req.query).limit(10);
	console.log('get admins');
	res.send(out);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

router.delete('/admin', async (req, res)=>{
    console.log('delete admins');
    try {
	assert('user_id' in req.body, "no user_id");
	console.log(req.body);
        await knexs("admins").where(req.body).del();
	//res.status(200);
	res.send('admin deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


module.exports = router;
