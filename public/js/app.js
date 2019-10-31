console.log('Client side js in work');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msgOne = document.querySelector('#message1');
const msgTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+input.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msgOne.textContent = data.error;
        }else{
            msgOne.textContent = data.location;
            msgTwo.textContent = data.forecast;
        }
    })
})
    
})