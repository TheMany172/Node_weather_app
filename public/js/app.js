console.log("client side js file has been loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (!data.Error) {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        } else { 
            messageOne.textContent = "";
            messageTwo.textContent = data.Error;
        }
    });
})
})