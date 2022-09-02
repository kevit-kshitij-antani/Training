console.log('Client side server is loaded.')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');


weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) =>
        response.json()
            .then((data) => {

                if (data.error) {
                    messageOne.textContent = data.error;
                }
                else {
                    messageOne.textContent =  'Location: ' + data.location;
                    messageTwo.textContent =  'Forecast: ' + data.forecast.Atmosphere;
                }
            })
    )
})