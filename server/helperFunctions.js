var express = require('express');
var router = express.Router();
const knexs = require("./setdb");

async function newId(tableName){
    try {
	let req = {};
	let counter= null;
	req['counterName'] = tableName;
	console.log(req);
	console.log("getcounter");
	counter = await knexs("counters").select('counter').where(req);
	//counter = await db.getCounter(req);
	console.log("increment counter");
	await knexs("counters").where(req).increment('counter', 1);
        //await db.incrementCounter(req);
	return counter[0]['counter'];
    }catch (err) {
	console.log(err);
	//console.log("error at newid");
    }
    return null;
}

//export default {newId};
module.exports = {newId};
