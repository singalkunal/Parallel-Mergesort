const weatherForm = document.querySelector('form');
const inp1 = document.querySelector('#arr_sz');
const inp2 = document.querySelector('#num_threads');
const inp3 = document.querySelector('#thresh');

const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const msg3 = document.querySelector('#message-3')
const togbtn = document.querySelector('#togBtn');
const state = 0

function hideContent() {
    if(togbtn.checked)
        inp2.style.display = "inline-block";
    else 
        inp2.style.display = "none";
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg2.classList.remove('message')
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    msg3.textContent = '';

    fetch('/sort?a=' + inp1.value + '&b=' + inp2.value + '&c=' + inp3.value + '&d=' + togbtn.checked).then((response) => {
        response.json().then((data) => {
            

            if(data.error)
            {
                // msg1.classList.add('message')
                return msg1.textContent = data.error
            }
            
            msg1.textContent = data.output1;
            msg2.textContent = data.output2;
            msg3.textContent = data.output3;

            // msg2.textContent = data.forecast
            // msg2.classList.add('message')
        })
    })
})