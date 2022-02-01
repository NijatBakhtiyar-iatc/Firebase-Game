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
  count++;

  set(branch, {
    count,
  });
  writeUserData(name, value, 0, 0);
});
var newArr = [];
var player1;
var player2;

onValue(ref(db, `/users`), function (snap) {
  const test = snap.val();

  for (let value of Object.values(test)) {
    newArr.push(value.choice);
  }

  console.log(newArr);
  player1 = newArr[0];
  player2 = newArr[1];
  comparison();
});

function comparison() {
  if ((player1 == "Rock") & (player2 == "Scissors")) {
    console.log("Player1 wins");
  }

  if ((player1 == "Rock") & (player2 == "Paper")) {
    console.log("Player2 wins");
  }

  if ((player1 == "Rock") & (player2 == "Rock")) {
    console.log("Withdraw");
  }

  // ***************************************

  if ((player1 == "Scissors") & (player2 == "Scissors")) {
    console.log("Withdraw");
  }

  if ((player1 == "Scissors") & (player2 == "Paper")) {
    console.log("Player1 wins");
  }

  if ((player1 == "Scissors") & (player2 == "Rock")) {
    console.log("Player2 wins");
  }

  // *******************************************

  if ((player1 == "Paper") & (player2 == "Scissors")) {
    console.log("Player2 Wins");
  }

  if ((player1 == "Paper") & (player2 == "Paper")) {
    console.log("Withdraw");
  }

  if ((player1 == "Paper") & (player2 == "Rock")) {
    console.log("Player1 Wins");
  }
}
