//var assert = require('assert');
//async function f() {
//  return 1;
//}

//const myPromise = new Promise(function(resolve, reject) => {
//  setTimeout(() => {
//    resolve('foo');
//  }, 300);
//});


//let h = 'first second third';
//console.log(h);
//console.log(h.split(' '));
//console.log(h.slice(0, -2));

//let a = [];
var fs = require('fs');

const v = fs.readFile('../server/data/out.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    //a.push(data);
    //a += data.copy();
    console.log(typeof data);
    const a = data.replace(/[\r\n,]+/gm, ' ').split(' ');
    console.log(a);
    let u = [...new Set(a)];
    console.log(u.sort());

});


//fetch('../server/data/out.txt')
//  .then(response => response.text())
//  .then(text => console.log(text))


//// fulfilled promise
//const promise = new  Promise(function(resolve, reject) {
//    setTimeout(() => console.log("done!"), 1000);
//}).then(() => {
//    console.log('done');
//});
//promise();

//setTimeout(() => console.log("done!"), 1000);

//let tableName = 'aafwe';
//let req = {};
////let req = {'counterName':''};
//req['counterName'] = tableName;
//console.log(typeof req);
//console.log(req);
//console.log(Date.now());
//console.log(new Date(Date.now()));
//console.log(!req['notexit']);
//console.log( 'notexit' in req);
//assert(!('not exits' in req), 'exists');
//assert.equal('not exits' in req, false, 'exists');
//req['notexit'] = null;
////assert( ! 'not exits' in req, 'exists');
//console.log('notexit' in req);
//console.log(!req['notexit']);



//const loadData = async () => {
//  console.log(data);
//};
//loadData();
