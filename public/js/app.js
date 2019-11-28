const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})
// 1--> fetch the data from the http request(web address)
// 2--> use then() (is a js function not node function) callback functionto extract the response
// 3--> extract the response using json() function 
// 4--> then use the extracted data using then() 

// fetch('http://puzzle.mead.io/puzzle').then((response => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// }))

// fetch('http://localhost:3000/weather?address=ghaziabad').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }
//         else{
//             console.log(data.location);
//             console.log(data.forecast);   
//         }
//     })
// })

