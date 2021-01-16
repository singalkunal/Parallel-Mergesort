const weatherForm = document.querySelector('form');
const inp1 = document.querySelector('#arr_sz');
const inp2 = document.querySelector('#num_threads');
const inp3 = document.querySelector('#thresh');

const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg2.classList.remove('message')
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/sort?a=' + inp1.value + '&b=' + inp2.value + '&c=' + inp3.value).then((response) => {
        response.json().then((data) => {
            

            if(data.error)
            {
                // msg1.classList.add('message')
                return msg1.textContent = data.error
            }
            
            msg1.textContent = data.output

            // msg2.textContent = data.forecast
            // msg2.classList.add('message')
        })
    })
})