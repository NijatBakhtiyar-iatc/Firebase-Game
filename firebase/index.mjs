import { db, set, ref, onValue, push } from "./firebase.js";

// User Name
var name = "";
// USer Choice
var value = "";
// User name and Choice
var Arr = [];

// Player number in room
var count = 0;

// Defining Branch
var branch = ref(db, `/playerNum`);

// Getting Count number
onValue(branch, function (snap) {
  count = snap.val().count || 0;
  // Checking

  if (count == 3) {
    alert("Room is full");
    count = 0;
  }
});

// Assigning user name to global variable
$(".inputName button").on("click", function () {
  name = $(".inputName input").val();
  $(".inputName").html(`Hi, ${name}`);
  count++;

  set(branch, {
    count,
  });

  writeUserData(name, value, 0, 0);

  //message visible
  $(".player-message").css("display", "block");

  // bot message
  const botMessage = $("<div class='message-node'>");
  botMessage.html(`Hi ${name}, you can message in here!!!`);

  // scroll bottom in message place
  $("#chat").animate({ scrollTop: $("#chat").prop("scrollHeight") }, 500);
  $("#chat").append(botMessage);
});

// Function for filling user data to database
const writeUserData = (name, choice, win, lost) => {
  set(ref(db, "users/" + name), {
    name,
    win,
    lost,
    choice,
  });
};

// Assigning user choice to value and creating
$(".players button").on("click", function () {
  value = $(this).html();

  Arr = [name, value];
  $(".userChoice span").html(value);
  
  writeUserData(name, value, 0, 0);
});
var newArr = [];
var player1;
var player2;
var user1;
var user2;

var winPlayer = [];

onValue(ref(db, `/users`), function (snap) {
  const test = snap.val();
  newArr = [];
  winPlayer = [];
  for (let value of Object.values(test)) {
    newArr.push(value.choice);
    winPlayer.push(value.name)
  }
  
  // winPlayer = 
  
  player1 = newArr[0];
  player2 = newArr[1];
  
  
  user1 = winPlayer[0]
  user2 = winPlayer[1]

  comparison();
});

function comparison() {
  console.log("Tetsttt");
  if ((player1 == "Rock") && (player2 == "Scissors")) {
    console.log("Player1 wins");
    $(".serverChoice span").html(`${user1} wins`)
  }

  if ((player1 == "Rock") && (player2 == "Paper")) {
    console.log("Player2 wins");
    $(".serverChoice span").html(`${user2} wins`)

  }

  if ((player1 == "Rock") && (player2 == "Rock")) {
    console.log("Withdraw");
    $(".serverChoice span").html("Withdraw")

  }

  // ***************************************

  if ((player1 == "Scissors") && (player2 == "Scissors")) {
    console.log("Withdraw");
    $(".serverChoice span").html("Withdraw")

  }

  if ((player1 == "Scissors") && (player2 == "Paper")) {
    console.log("Player1 wins");
    $(".serverChoice span").html(`${user1} wins`)

  }

  if ((player1 == "Scissors") && (player2 == "Rock")) {
    console.log("Player2 wins");
    $(".serverChoice span").html(`${user2} wins`)

  }

  // *******************************************

  if ((player1 == "Paper") && (player2 == "Scissors")) {
    console.log("Player2 Wins");
    $(".serverChoice span").html(`${user2} wins`)

  }

  if ((player1 == "Paper") && (player2 == "Paper")) {
    console.log("Withdraw");
    $(".serverChoice span").html("Withdraw")

  }

  if ((player1 == "Paper") && (player2 == "Rock")) {
    console.log("Player1 Wins");
    $(".serverChoice span").html(`${user1} wins`)

  }
}

// Players message section
$("#inp-form").on("submit", function (e) {
  e.preventDefault();

  const message = $("#message").val();

  var messagePush = push(ref(db, `/users/messages`));

  set(messagePush, [message, name]);

  $("#message").val(" ");

  $(".emojionearea-editor").html("")

  $("#chat").animate({ scrollTop: $("#chat").prop("scrollHeight") }, 500);
});

$("#color").val("#ffffff");

onValue(ref(db, `/users/messages`), function (snap) {
  const messages = snap.val();
  $("#chat").html("");
  let inputColor = $("#color").val();

  for (let [key, value] of Object.entries(messages)) {
    const messageNode = $(`<div class='message-node' data-key=${key}>`);
    messageNode.html(value[1] + " - " + value[0]);
    if (value[1] == name) {
      messageNode.css({ background: `${inputColor}` });
    }

    $("#chat").append(messageNode);
  }
});

// emoji symbols installation
$("#inp-form input" ).emojioneArea()