var express = require('express');
var assert = require('assert');
var router = express.Router();
const knexs = require("../setdb");
const {newId} =  require("../helperFunctions");


router.get('/', async (req, res)=>{
    console.log('get recs');
    try {
	assert('user_id' in req.query, "no user_id");
	let query = {user_id :req.query['user_id']};
	console.log(query);

	const liked= await knexs("likes").join("perfumes", 'likes.perfume_id', 'perfumes.perfume_id' ).select("perfumes.perfume_id", "perfumes.scents", "perfumes.base_note", "perfumes.middle_note").where(query).limit(100);
	const disliked= await knexs("dislikes").join("perfumes", 'dislikes.perfume_id', 'perfumes.perfume_id' ).select("perfumes.perfume_id", "perfumes.scents", "perfumes.base_note", "perfumes.middle_note").where(query).limit(100);
	const bookmarked= await knexs("bookmarks").join("perfumes", 'bookmarks.perfume_id', 'perfumes.perfume_id' ).select("perfumes.perfume_id", "perfumes.scents", "perfumes.base_note", "perfumes.middle_note").where(query).limit(100);

	let likedList = [];
	let dislikedList = [];
	liked.forEach((v)=>{
	    //console.log(v);
	    likedList.push(v);
	});

	bookmarked.forEach((v)=>{
	    //console.log(v);
	    likedList.push(v);
	});

	disliked.forEach((v)=>{
	    //console.log(v);
	    dislikedList.push(v);
	});
	let pids = [];
	let scents = {};
	let base = {};
	let middle = {};
	let notes = [];

	likedList.forEach((t)=>{
	    //console.log(t);
	    pids.push(t.perfume_id);
	    if (t.scents in scents){
		scents[t.scents] += 1;
	    } else {
		scents[t.scents] = 1;
	    }
	    notes = t.base_note.split(new RegExp(', | and | And '));
	    let n = t.middle_note.split(new RegExp(', | and | And '));
	    notes = notes.concat(n);
	    //console.log(n);
	    //console.log(notes);
	    notes.forEach((note)=> {
		//console.log(note);
		if (note in base){
		    base[note] += 1;
		} else {
		    base[note] = 1;
		}
	    });

	});


	dislikedList.forEach((t)=>{
	    //console.log(t);
	    pids.push(t.perfume_id);
	    if (t.scents in scents){
		scents[t.scents] -= 1;
	    } else {
		scents[t.scents] = -1;
	    }
	    notes = t.base_note.split(new RegExp(', | and | And '));
	    let n = t.middle_note.split(new RegExp(', | and | And '));
	    notes = notes.concat(n);
	    //console.log(n);
	    //console.log(notes);
	    notes.forEach((note)=> {
		//console.log(note);
		if (note in base){
		    base[note] -= 1;
		} else {
		    base[note] = -1;
		}
	    });

	});

	let notesList = Object.entries(base);
	notesList.sort((a, b) => {
	    return b[1] - a[1];
	});
	console.log(notesList);

        let pList = [];
        let recs = {};
        for (let n of notesList){
    	    //console.log(n);
    	    let q = '';
    	    q = '(scents LIKE "%' + n[0] + '%" OR base_note LIKE "%' + n[0] + '%" OR middle_note LIKE "%' + n[0] + '%" )';
    	    //const perfumes = await knexs("perfumes").select('*').distinct('perfume_id').whereRaw(q).limit(10);
    	    const perfumes = await knexs("perfumes").select('*').distinct('perfume_id').whereRaw(q).limit(50);
    	    //console.log(perfumes);
    	    for (let p of perfumes){
    	        if (p.perfume_id in recs && !p.perfume_id in pids){
    	            recs[p.perfume_id][1] += n[1];
    	        }else {
    	            recs[p.perfume_id] = [p, n[1]];
    	        }
            }
        }
        let recsList = Object.entries(recs);
	recsList.sort((a, b)=> {
            return b[1][1] - a[1][1];

        });

        //console.log(recsList[0][1][1]);
        console.log(recsList.slice(0, 10));




	//assert('user_id' in req.body, "no user_id");
        /*
	with pids =
	select perfume_id
	from likes l ,bookmarks b,
	where  userid = given

	select scents, notes
	from perfumes p
	where p.perfume_id = pids

        get liked pids so we dont recomend them again
	get liked scents and notes

	then count how often each scent and note appears

	do the same for dislikes 

	then we have a list of scents and notes and how often the user liked and disliked them.

	take the top 10 most liked scents and notes to search for perfumes.

	after getting those perfumes rank them based on how many liked sents it has 
	take away point for having disliked scents.
	*/

	console.log('get recs');
	res.send(recsList.slice(0, 20));
    } catch (err) {
	res.status(404);
	res.send('fail');
	console.log(err);
    }
});

module.exports = router;
