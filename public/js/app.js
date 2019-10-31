const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msgOne = document.querySelector('#message1');
const msgTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch('/weather?address='+input.value).then((response) => {
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