var express = require('express');
var assert = require('assert');
var router = express.Router();
const knexs = require("../setdb");
const {newId} =  require("../helperFunctions");


router.put('/', async function(req, res){
    try {
	assert('perfume_id' in req.body, "no perfume_id");
        let id = {'perfume_id' : req.body['perfume_id']};
        delete req.body['perfume_id'];
	assert(!('perfume_id' in req.body), "don't you dare update the id");
	console.log(req.body);
	knexs("perfumes").where(id).update(req.body).then((perfume)=>{
	    console.log(perfume);
	    console.log('perfume');
	    //console.log(req);
	    res.status(200);
	    res.send('perfume edited');
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
	assert(!('perfume_id' in req.body), "don't you dare send the id");
	req.body['perfume_id'] = await newId('perfumes');
	const perfume = await knexs("perfumes").insert(req.body);
	console.log(perfume);
	//console.log(req);
	//res.status(200);
	res.send('posted perfume');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.delete('/', async (req, res)=>{
    console.log('delete perfumes');
    try {
	assert('perfume_id' in req.body, "no perfume_id");
	console.log(req.body);
        await knexs("perfumes").where(req.body).del();
	//res.status(200);
	res.send('deleted');
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});


router.get('/', async (req, res)=>{
    //console.log(req.query['brand']);
    try {
	const perfumes = await knexs("perfumes").select('*').where(req.query).limit(10);
	console.log(perfumes);
	res.send(perfumes);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
    //res.send('hello');
    //res.send(getnames());
});


router.get('/search', async (req, res)=>{
    //const perfumes = await db.getPerfumesbyScent(req.query);
    //console.log(req.query['brand']);
    try {
	const words = req.query['search'].split(' ');
	let q = '';
	console.log("getPerfumesbyscents");
	console.log(req.query);
	words.forEach(word => {
	    q += '(scents LIKE "%' + word + '%" OR brand LIKE "%' + word + '%" OR base_note LIKE "%' + word + '%" OR middle_note LIKE "%' + word + '%" ) AND ';
	});
	q = q.slice(0, -5);
	console.log(q);
	const perfumes = await knexs("perfumes").select('*').distinct('perfume_id').whereRaw(q).limit(10);
	res.send(perfumes);
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

module.exports = router;
