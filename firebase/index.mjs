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
  console.log(count);
  if (count === 2) {
    count = 0;
    alert("Room is full");
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

  // let branch1 = ref(db, `/users/${name}`);
  // set(branch1, {
  //   name: name,
  //   choice: value,
  // });
});
var newArr = [];
var player1 = "";
var player2 = "";

onValue(ref(db, `/players/${name}`), function (snap) {
  const test = snap.val();
  for (let value of Object.values(test)) {
    // console.log(value[0][1]);
    let user = value[0][1];
    newArr.push(user);
  }
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
