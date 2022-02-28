const knexs = require("../setdb");
const {newId} =  require("../helperFunctions");

//var express = require('express');
//var app = express();
//const enableWs = require('express-ws')(app);
//var router = express.Router();
//
//router.ws('/', function(ws, req) {
//  ws.on('message', function(msg) {
//    ws.send(msg);
//  });
//    wss.on("connection", (socket) => {
//	console.log(socket.id);
//	console.log('connection made ');
//	wss.on("send_msg", function(ws){
//
//	    console.log(socket.id);
//	// ...
//	});
//    });
//});

let num = -1;
let rand_perfume = '';
let total_guessed = [];
let perfume_list = ['Allure', 'Sauvage', 'Guilty', 'Boss', 'Million', 'Oud', 'Rabanne', 'Invictius', 'Spice', 'Code'];
let completed = false;
let counter = 5;
let hangman = [`
O \u000A
\\|/ \u000A
 .| \u000A
/ \\ \u000A`,
    `
                 O\u000A
               \\|/\u000A
                .|\u000A
               /\u000A`,
    `
    O\u000A
               \\|/\u000A
                .|\u000A
               `,
    `
    O\u000A
               \\|/\u000A
                \u000A
               `,
    `
                 O\u000A
               \\|\u000A
                `,
    `
    O\u000A
           \u000A     
    `
              ];



async function getMsgs(u1, u2) {
            let q1 = {
	    	sender_user_id: u1,
	    	recipient_user_id: u2
	    };
            let q2 = {
	    	sender_user_id: u2,
	    	recipient_user_id: u1
	    };

	    const msgsList = await knexs("messages").select('*').where(q1).orWhere(q2).orderBy('sent_time', 'desc' ).limit(10);
    return msgsList;
}



function chatServer(io) {
    io.on("connection", (socket) => {
	console.log('connected ');
	//display a welcome message to the user who have joined a room
	socket.on("messages",(data) => {
	    console.log(data);
	});


	socket.on("get messages", async(body) => {
	    console.log('get msgs');
	    console.log(body);
		const msgsList = await getMsgs(body['recipient_user_id'], body['sender_user_id']);
                
            if (body['recipient_user_id'] > body['sender_user_id']){
		socket.join(body['recipient_user_id'] +' '+ body['sender_user_id']);
		console.log(body.sender_user_id + ' sender, room:' + body['recipient_user_id'] +' '+ body['sender_user_id']);
            }else {
		socket.join(body['sender_user_id'] +' '+ body['recipient_user_id']);
		console.log(body.sender_user_id + ' sender, room:' + body['sender_user_id'] +' '+ body['recipient_user_id']);
            }

            //socket.emit('messages', msgsList);
            //socket.broadcast.to(body['recipient_user_id'] +' '+ body['sender_user_id']).emit("messages", msgsList);

            if (body['recipient_user_id'] > body['sender_user_id']){
	    	//socket.broadcast.to(body['recipient_user_id'] +' '+ body['sender_user_id']).emit("messages", msgsList);
	    	io.to(body['recipient_user_id'] +' '+ body['sender_user_id']).emit("messages", msgsList);
            } else {
	    	//socket.broadcast.to(body['sender_user_id'] +' '+ body['recipient_user_id']).emit("messages", msgsList);
	    	io.to(body['sender_user_id'] +' '+ body['recipient_user_id']).emit("messages", msgsList);
            }
	});

	socket.on("chat", async(body) => {
            //let body = {};
	    console.log('got message ');




	    //body['message'] = message;
	    body['message_id'] = await newId('messages');
	    body['sent_time'] = Date.now();
	    await knexs("messages").insert(body);



            if (body['message'].slice(0, 2) == './'){
                let message = body.message;
		body['message'] = "";
                if (message.slice(0, 9) == './guesser' || (message.slice(0, 9) == './restart')) {
                    //body['message'] += " \r line \u000A test";
                    body['message'] += 'You initiated a guessing game. Please guess a perfume name. type ./guess [Your Alphabet]\u000A';
                    num = Math.floor(Math.random() * 10);
                    rand_perfume = perfume_list[num];
                    num = 0;
                    counter = 5;
                    completed = false;
                    total_guessed = [];
                    body['message'] += `HangMan: ${hangman[counter]}`;
                } else if (counter == 0 && (message.slice(0, 7) == './guess')) {
                    body['message'] += 'You have zero lives left start a new game.';
                } else if (num == -1 && (message.slice(0, 7) == './guess')) {
                    body['message'] += 'you need to initiate the game first';
                } else if (completed == true && (message.slice(0, 7) == './guess')) {
                    body['message'] += `You have already complete the previous game press ./restart to reset the game`;
                    num = -1;
                    total_guessed = [];
                    // counter = 0
                    
	        } else if (num == 0 && (message.slice(0, 7) == './guess')) {
	    	    let guess = message.slice(8, 9);
	    	    let flag = false;
	    	    if (parseInt(guess)) {
	    	        body['message'] += 'please enter a string';
	    	    } else {
	    	        if (counter == 5) {
	    		    body['message'] += hangman[counter] + ' \u000A';
	    	        }
	    	        for (let i = 0; i < rand_perfume.length; i++) {
	    		    if (guess.toLowerCase() == rand_perfume[i].toLowerCase()) {
	    		        flag = true;
	    		        total_guessed[i] = guess.toUpperCase();
	    		        if ((total_guessed.indexOf('_') == -1) && total_guessed.length != 1) {
	    			    completed = true;
	    			    body['message'] += '++++++++++ Congragulation you completed the game ++++++++++++\u000A';
	    			    body['message'] += `++++++++++ Answer was ${total_guessed}  ++++++++++++\u000A`;
	    		        }
	    		    } else if (total_guessed.length != rand_perfume.length) {
	    		        total_guessed[i] = '_';
	    		    }
	    	        }
	    	        if (flag == false) {
	    		    counter = counter - 1;
	    		    //appendMessage(`lives left: ${counter}`)
	    	        }
	    	        body['message'] += `HangMan:
	    	    ${hangman[counter]}
	    	    Answer: ${total_guessed} 
	    	    Your Guess: ${guess.toUpperCase()}`;
	    	        if (counter == 0) {
	    		    body['message'] += `GAME OVER!! Correct Answer Was: ${rand_perfume}.`;

	    	        }

	    	    }
	        }
		body['message_id'] = await newId('messages');
		body['sent_time'] = Date.now();
		console.log(body);
		await knexs("messages").insert(body);
            }





            const msgsList = await getMsgs(body['recipient_user_id'], body['sender_user_id']);
            if (body['recipient_user_id'] > body['sender_user_id']){
		io.to(body['recipient_user_id'] +' '+ body['sender_user_id']).emit('messages', msgsList);
            }else {
		io.to(body['sender_user_id'] +' '+ body['recipient_user_id']).emit('messages', msgsList);
	    }
                
	});
	//console.log(userList);
    });
}




module.exports = chatServer;
