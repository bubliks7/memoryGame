const con = document.querySelector('#con');
const warning = document.querySelector('#warning');
const pointsInfo = document.querySelector('#pointsInfo');

let arr = ['🐻', '🫏', '👄', '🦴', '🐿️', '🎈', '🎃', '🎗️'];

const start = document.querySelector('#start');

let points = 0;

let cardOne = null;
let cardTwo = null;
let lock = false;

start.addEventListener('click', () => {
    const changeLvl = document.querySelectorAll('select');

    changeLvl.forEach(element => {
        console.log(element.value);
        if(element.value == 'easy') arr = ['🐻', '🫏', '👄', '🦴', '🐿️', '🎈', '🎃', '🎗️'];
        else if(element.value == 'mid') arr = ['🐻', '🫏', '👄', '🦴', '🐿️', '🎈', '🎃', '🎗️', '💕', '🐔'];
        else if(element.value == 'hard') arr = ['🐻', '🫏', '👄', '🦴', '🐿️', '🎈', '🎃', '🎗️', '💕', '🐔', '🧟‍♀️', '👀'];

        con.innerHTML = "";
        document.querySelector('section').style.display = "none";
        con.style.display = "grid";

        points = 0;
        cardOne = null;
        cardTwo = null;
        lock = false;
        pointsInfo.textContent = `Punkty: 0`;

        const cards = [...arr, ...arr];
        const shuffled = [...cards].sort(() => Math.random() - 0.5);

        shuffled.forEach(element => {
            const newElement = document.createElement('div');

            newElement.classList.add('card');
            newElement.dataset.symbol = element;
            newElement.textContent = "?";
            con.appendChild(newElement);

            newElement.addEventListener('click', () => {
                if(lock) return;
                if(newElement === cardOne) return;

                newElement.textContent = newElement.dataset.symbol;
                if(cardOne === null){
                    cardOne = newElement;
                    return;
                }
                cardTwo = newElement;

                check();
            });
        });
    });
});

function check(){
    if(cardOne.dataset.symbol === cardTwo.dataset.symbol){
        points++;
        pointsInfo.textContent = `Punkty ${points}`;
        cardOne = null;
        cardTwo = null;

       if(points == arr.length){
            document.querySelector('section').style.display = "block";
            document.querySelector('#winMenu').style.display = "block";
            setTimeout(() => {
                con.style.display = 'none';
            }, 5000)
       } 
    } else{
        lock = true;

        setTimeout(() => {
            cardOne.textContent = "?";
            cardTwo.textContent = "?";
            cardOne = null;
            cardTwo = null;

            lock = false;
        }, 1000)
    }
}

// console.log(cards);

