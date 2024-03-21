const app = document.getElementById('app');

function startGame(game, count) {
  const numbersArray = [];
  let firstCard = null;
  let secondCard = null;

  // Создать массив парных чисел. count - количество пар.
  function createNumbersArray(count) {
    for (let i = 1; i <= count; i++) {
      numbersArray.push(i, i);
    }
    return numbersArray;
  }

  // Перемешать массив с исходными числовыми парами
  function shuffle(arr) {
    for (let i = 0; i < numbersArray.length; i++) {
      let randomIndex = Math.floor(Math.random() * numbersArray.length);

      // Fisher-Yates shuffle
      let temp = numbersArray[i];
      numbersArray[i] = numbersArray[randomIndex];
      numbersArray[randomIndex] = temp;
    }
  }

  // Создание карточек
  function createGameElements() {
    const gameArea = document.createElement('ul');
    gameArea.classList.add('card-list', 'list-reset');
    app.append(gameArea);

    // Создание DOM-элементов карточек
    for (let number of numbersArray) {
      const card = document.createElement('li');
      card.textContent = number;
      card.classList.add('card-item');

      // Событие клика с условиями проверки на совпадение карточек
      card.addEventListener('click', function() {
        // стоп при клике по открытой карточке
        if (card.classList.contains('opened') || card.classList.contains('match')) {
          return;
        }

        card.classList.add('opened');

        if (firstCard === null) {
          firstCard = card;
        } else {
          secondCard = card;
        }

        // обе карточки открыты, получаем их содержимое
        if ((firstCard !== null) && (secondCard !== null)) {
          let firstCardValue = firstCard.textContent;
          let secondCardValue = secondCard.textContent;

          if (firstCardValue === secondCardValue) {
            firstCard.classList.add('match');
            secondCard.classList.add('match');
          }
        }

        // закрыть обе карточки, если они открыты, известны
        // и не совпали
        if ((firstCard !== null) && (secondCard !== null)) {
          setTimeout(() => {
            firstCard.classList.remove('opened');
            secondCard.classList.remove('opened');
            firstCard = null;
            secondCard = null;
          }, 300)
        }

        // проверка на конец игры, открыты ты ли все карточки
        if (numbersArray.length === document.querySelectorAll('.match').length) {
          // игра считается завершённой at this point
          // создать кнопку «Сыграть ещё раз»
          let btnPlayAgain = document.createElement('button');
          btnPlayAgain.textContent = "Сыграть ещё раз";
          btnPlayAgain.classList.add('btn', 'btn-reset');
          app.append(btnPlayAgain);

          // игра сбрасывается до начального состояния
          btnPlayAgain.addEventListener('click', function() {
            location.reload();
          });
        }
      });

      gameArea.append(card);
    }
  }

  createNumbersArray(count);
  shuffle(numbersArray);
  console.log(numbersArray);

  // отрисовываем DOM-элементы игры
  const gameArea = createGameElements();
}

let count = Number(prompt('Введите чётное количество пар (от 2 до 10)'), 4);

// чётное число от 2 до 10
// если значение некорректно,то сбрасывается до значения по умолчанию — 4.
if (count % 2 !== 0) {
  count = 4;
} else if (count < 2 || count > 10) {
  count = 4;
}

startGame(app, count);
