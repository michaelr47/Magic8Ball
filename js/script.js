// Main objectives:
// Create an input field for users to ask a question
// Create a label for your input field telling your user to "Ask me anything!"
// Create an "ask" button (this will run the function that outputs a random magic 8 ball image)

// Create a div with an id of "answers" that you will insert the images into using js

// Create an "ask" function that when clicked, will choose a random 8ball image and insert it into your "answers" div
// Replace the input field with the user's question when displaying the answer
// Style your page any way you like

let input = document.getElementById("ask");
let answers = document.getElementById("answers");
let img = document.getElementById("api-img");
let askButton = document.getElementById("askBtn");
let span = document.getElementById('user-answer');
let label = document.getElementById('label');
// remove or hide input field of id 'ask'
askButton.addEventListener("click", () => {
  input.style.visibility = "hidden";
  span.innerText = input.value;
  askButton.innerText = '';
  label.innerText = '';
  // set span.innerText to input.value
});


// create the indicator by default (or have it exist already, hidden, and show it)

// 1) in some function, the first line(s) will have the loading indicator shown
// (before the image loads) so that the user sees it for the entire duration
// of the image load.
// 2) as soon as the image loads, remove or hide the indicator and swap in the image
// 3) if you created an element via JS, make sure to delete it or reuse it instead of
// making it every time you call the function
const indicator = document.querySelector(".loading-indicator");
indicator.style.display = "none";
// flip the indicator between display:none and display:flex
async function toggleIndicator() {
  console.log("called toggleIndicator", indicator.style.display);
  if (indicator.style.display === "none") {
    indicator.style.display = "flex";
  } else {
    indicator.style.display = "none";
  }
}

// async functions wait until you actually have the data to return it (from an API)
// this function waits for `res` to have something in it, then returns `res.json()`
// we can use that data in any way we want after we have it
// `res.url` is the image URL after it comes in from the API

async function getImage() {
  const res = await fetch(
    "https://random.imagecdn.app/v1/image?width=1440&height=1620&format=json", //2880x1620
    {
      method: "GET",
    }
  );

  return res.json();
}

// We use our async function from earlier in another async function (they can be nested)
// 1. we get the `res.json()` from `getImage()`.
// 2. we use `.then(...)` to specify what to do after getting it from the API
// 3. when we have that image URL, we set the background image to it

// 1. hide the input element
// 2. set the span #user-value to input.value
const handleBtn = async () => {
  // put input stuff here
  
  await toggleIndicator()
    .then(
      await getImage().then((res) => {
        document.body.style.backgroundImage = `url('${res.url}')`;
        
      })
    )
    .then(toggleIndicator());
};

// let mapped = someArray.map(x => x * 2).reduce((acc, cur) => {
//     return acc + cur;
// })
// // [2, 20, 30, 50, 60]

// // splice takes a position, and how many elements to delete from there
// let spliced = someArray.splice(2, 1);
// // [1, 10, 15, 30 (deleted 25 from here)]

// // const someArray = [1, 10, 15, 25, 30];
// let sliced = someArray.slice(2, 4)
// // [15, 25, 30]

// .slice(1, -1)
// // 10, 15, 25

// // second parameter negative => count from the end
// // [1,2,3,4,5]
// // -2

//const someArray = [1, 10, 15, 25, 30];

// let foundAboveTen = someArray.find(x => x > 10) // 15
//let reversed = someArray.reverse(); // [30, 25, 15, 10, 1]
