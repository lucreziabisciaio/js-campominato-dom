function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function reset() {
    containerHtml.innerHTML = ''
}

function createBombs(maxCells) {
    const listBombs = [];
    while (listBombs.length < 16) {
        const n = getRandomNumber(1, maxCells)
        if (!listBombs.includes(n)) {
            listBombs.push(n);
        }
    }
    return listBombs;
}

function gameOver(isWin, score, container) {
    const modal = document.createElement('div');
    modal.className = 'game-over';

    if (isWin) {
        modal.classList.add('winner');
        modal.innerText = 'Hai vinto! '
    } else {
        modal.classList.add('loser');
        modal.innerText = 'Hai perso! '
    }

    modal.innerText += `Il tuo punteggio é: ${score}`

    const button = document.createElement('button');
    button.innerText = 'Ricomincia';
    button.addEventListener('click', reset)

    modal.append(button);
    container.append(modal);
}

function app(maxCells, container, createBombsFunction) {

    let clicked = 0;
    const bombs = createBombsFunction(maxCells);
    console.log(bombs);

    for (let i = 1; i <= maxCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = i;
        container.append(cell);

        cell.addEventListener('click', function () {
            if (bombs.includes(i)) {
                cell.classList.add('red')
                gameOver(false, clicked, container)

            } else {
                cell.classList.add('blue')
                clicked++;

                if (clicked === maxCells - 16) {
                    gameOver(true, clicked, container)
                }

            }
        });

    }
}

const buttonLevel1 = document.getElementById('livello-1');
const buttonLevel2 = document.getElementById('livello-2');
const buttonLevel3 = document.getElementById('livello-3');

const containerHtml = document.getElementById('campominato-container');

buttonLevel1.addEventListener('click', function () {
    containerHtml.className = 'livello-1';
    reset();
    app(100, containerHtml, createBombs);
});

buttonLevel2.addEventListener('click', function () {
    containerHtml.className = 'livello-2';
    reset();
    app(81, containerHtml, createBombs);
});

buttonLevel3.addEventListener('click', function () {
    containerHtml.className = 'livello-3';
    reset();
    app(49, containerHtml, createBombs);
});