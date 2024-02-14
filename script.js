//Generates random number for colour generation
function randColorNum() {
    return Math.floor(Math.random() * 256);
}

//Warning pop up alert for flashing lights
const warning = "Warning: This website contains flashing lights may trigger photosensitive epilepsy. Would you like to continue?"
let counter = 1
let counterIncrease = true

window.addEventListener('load', () => {

    if (!confirm(warning))
        close()
    


    const bodyTag = document.querySelector('body')
    const churroTag = document.getElementById('churro')
    const myNameTag = document.getElementById('my-name')

//When mouse hovers over image a black border will appear 
    churroTag.addEventListener('mouseover', () => {
        churroTag.style.border = 'blue solid 20px'
    })

    churroTag.addEventListener('mouseout', () => {
        churroTag.style.border = ''
    })
    
//Will display my name mirrored every second
    setInterval(() => {
        myNameTag.innerText = myNameTag.innerText.split("").reverse().join("")
    }, 1000)
//Will change background colour every millisecond 
    setInterval(() => {
        bodyTag.style.backgroundColor = `rgb(${randColorNum()}, ${randColorNum()}, ${randColorNum()})`
    }, 1)

//Will change Churro's photo size every 75 milliseconds
   setInterval(() => {
        counter += counterIncrease ? 1 : -1

        if (counter >= 10) {
            counterIncrease = false
        }

        if (counter <= 1) {
            counterIncrease = true
        }

        churroTag.style.width = `${counter * 10}%`
        churroTag.style.height = `${counter * 10}%`

    }, 75)
}) 
