let wrapper = document.createElement('div');
wrapper.style = 'width: 100%; height: 100vh; background-color: #c4e4f9; display: flex; align-items: center; justify-content: center; flex-direction: column;';
let body = document.querySelector('body');
body.style = 'margin: 0;'
body.appendChild(wrapper);

let num1 = 0, num2;
let act;
let tabInner = document.createElement('div');
tabInner = document.createElement('div');
/* ---------------------------------------------Начало-------------------------------------- */

let ques = document.createElement('div');
ques.className = 'question';
ques.style = 'padding: 20px; text-alagn: center; background-color: #fff; ';
let quesTitle = document.createElement('div');
quesTitle.className = 'question__title';
quesTitle.innerHTML = 'Сделайте выбор для первого игрока';
quesTitle.style = 'margin-bottom: 25px;';
let quesItems = document.createElement('div');
quesItems.className = 'question__items';
quesItems.style = 'display: flex; align-items: center; justify-content: space-around; margin-bottom: 25px;';
let nameInner = document.createElement('div');
nameInner.className = 'name';
nameInner.style = 'margin-top: 20px;'
for (let i = 0; i < 2; i++) {
  let nameTitle = document.createElement('div');
  nameTitle.className = 'name__title';
  let nameVal = document.createElement('input');
  nameVal.style = 'margin: 10px 0 15px;'
  switch (i) {
    case 0:
      nameTitle.innerHTML = 'Имя первого игрока';
      nameVal.value = '';
      break;
    case 1:
      nameTitle.innerHTML = 'Имя второго игрока';
      nameVal.value = '';
      break;
  }
  nameInner.appendChild(nameTitle);
  nameInner.appendChild(nameVal);
}

let quesBtnNext = document.createElement('button');
quesBtnNext.style = 'padding: 5px 20px; display: block; max-width: 135px; margin: 0 auto; cursor: pointer;'
quesBtnNext.innerHTML = 'Начать игру';
for (let i = 0; i < 2; i++) {
  let questBtn = document.createElement('button');
  questBtn.className = 'question__item';
  questBtn.style = 'width: 40px; heigth: 40px; cursor: pointer; margin-top: 15px;';
  switch (i) {
    case 0:
      questBtn.innerHTML = 'X';
      questBtn.setAttribute('data-num', 1);
      break;
    case 1:
      questBtn.innerHTML = 'O';
      questBtn.setAttribute('data-num', 2);
      break;
  }
  questBtn.addEventListener('click', function () {
    let num = +questBtn.getAttribute('data-num');
    act = 1;
    if (num == 1) {
      num1 = 1;
      num2 = 2;
    } else {
      num1 = 2;
      num2 = 1;
    }
  });
  quesItems.appendChild(questBtn);
}
let name1;
let name2;
quesBtnNext.addEventListener('click', function () {
  switch (num1) {
    case 0:
      quesTitle.style = 'color: red; font-weight: 700; margin-bottom: 25px;';
      break;
    case 1:
    case 2:
      tabInner.style = 'display: block; background-color: #fff; padding: 30px; position: relative;';
      over.style = 'padding: 10px 30px; text-align: center; background-color: #fff; width: 300px; margin-bottom: 20px;';
      ques.style = 'display: none;';
      overBtn.style = 'display:none;';
      let nameAll = nameInner.querySelectorAll('input');
      let nameVal1 = nameAll[0].value;
      let nameVal2 = nameAll[1].value;
      name1 = nameVal1 || 'Первый игрок';
      name2 = nameVal2 || 'Второй игрок';
      overText.innerHTML = `Ходит ${name1}`;
      break;
  }
});
ques.appendChild(quesTitle);
ques.appendChild(quesItems);
ques.appendChild(nameInner);
ques.appendChild(quesBtnNext);
wrapper.appendChild(ques);





/* ------------------------------------------Таблица--------------------------------------------- */




tabInner.className = 'game__inner';
tabInner.style = 'display: none;';
let tabClose = document.createElement('button');
tabClose.style = 'width: 30px; heght: 30px; display: block; margin: 0 -5px 15px auto; font-size: 16px; font-weight: 700; border:none; cursor: pointer; backgroumd-color: transparent;'
tabClose.innerHTML = 'X';
tabInner.appendChild(tabClose);
tabClose.addEventListener('click', function () {
  over.style = 'display:none;';
  overBtn.style = 'display:none;';
  tabInner.style = 'display: none;';
  ques.style = 'padding: 20px; text-alagn: center; background-color: #fff; ';
  quesTitle.style = 'margin-bottom: 25px;';
  act = 1;
  num1 = 0;
  num2 = 0;
  nameInner.querySelectorAll('input')[0].value = '';
  nameInner.querySelectorAll('input')[1].value = '';
  let tdAll = document.querySelectorAll('td');
  for (let i = 0; i < tdAll.length; i++) {
    tdAll[i].innerHTML = '';
    tdAll[i].setAttribute('data-num', 0);

  }
});
let table = document.createElement('table');
table.className = 'game__table';
table.style = 'text-align: center; border: 6px solid transparent; border-collapse: collapse;';
for (let i = 0; i < 3; i++) {
  let tr = document.createElement('tr');
  tr.className = 'game__items';
  for (let j = 0; j < 3; j++) {
    let td = document.createElement('td');
    td.className = 'game__item';
    td.style = 'border: 4px solid #000; width: 50px; height: 50px; cursor: pointer;';
    td.setAttribute('data-num', 0);
    tr.appendChild(td);
    td.addEventListener('click', function () {
      let res;
      let thisAttr = this.getAttribute('data-num');
      if (act == 1) {
        if (+thisAttr == 0) {
          if (num1 == 1) {
            this.innerHTML = 'X';
          } else {
            this.innerHTML = 'O';
          }
          this.setAttribute('data-num', num1);
          let tdAll = document.querySelectorAll('td');
          let tdAttr = attr(tdAll);
          res = win(num1, tdAttr);
          if (res > 0) {
            overText.innerHTML = `Выграл ${name1} игрок`;
            overBtn.style = 'padding: 5px 10px; cursor: pointer;';
            act = 0;
          } else {
            if (tdAttr.every((x) => x > 0)) {
              overText.innerHTML = 'Ничья!';
              overBtn.style = 'padding: 5px 10px; cursor: pointer;';
              act = 0;
            } else {
              act = 2;
              overText.innerHTML = `Ходит ${name2}`;
            }
          }
        }
      } else if (act == 2){
        if (+thisAttr == 0) {
          if (num2 == 1) {
            this.innerHTML = 'X';
          } else {
            this.innerHTML = 'O';
          }
          this.setAttribute('data-num', num2);
          let tdAll = document.querySelectorAll('td');
          let tdAttr = attr(tdAll);
          res = win(num2, tdAttr);
          if (res > 0) {
            overText.innerHTML = `Выграл ${name2} игрок`;
            overBtn.style = 'padding: 5px 10px; cursor: pointer;';
            act = 0;
          } else {
            if (tdAttr.every((x) => x > 0)) {
              overText.innerHTML = 'Ничья!';
              overBtn.style = 'padding: 5px 10px; cursor: pointer;';
              act = 0;
            } else {
              act = 1;
              overText.innerHTML = `Ходит ${name1}`;
            }
          }
        }
      }
    });
  }
  table.appendChild(tr);
}

tabInner.appendChild(table);
wrapper.appendChild(tabInner);


function attr(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i].getAttribute('data-num');
  }
  return newArr;
}

function win(num, arr) {
  if ((arr[0] == num && arr[1] == num && arr[2] == num) ||
    (arr[3] == num && arr[4] == num && arr[5] == num) ||
    (arr[6] == num && arr[7] == num && arr[8] == num) ||
    (arr[0] == num && arr[3] == num && arr[6] == num) ||
    (arr[1] == num && arr[4] == num && arr[7] == num) ||
    (arr[2] == num && arr[5] == num && arr[8] == num) ||
    (arr[0] == num && arr[4] == num && arr[8] == num) ||
    (arr[2] == num && arr[4] == num && arr[6] == num)) {
    return num;
  } else {
    return 0;
  }
}


/* ------------------------------------------Конец игры------------------------------------------------------------------ */

let over = document.createElement('div');
over.style = 'display:none;';
let overText = document.createElement('p');
overText.style = 'margin-bottom: 15px;'
over.appendChild(overText);
let overBtn = document.createElement('button');
overBtn.innerHTML = 'Начать заново';
overBtn.style = 'display:none;';
overBtn.addEventListener('click', function () {
  over.style = 'display:none;';
  overBtn.style = 'display:none;';
  tabInner.style = 'display: none;';
  ques.style = 'padding: 20px; text-alagn: center; background-color: #fff; ';
  quesTitle.style = 'margin-bottom: 25px;';
  act = 1;
  num1 = 0;
  num2 = 0;
  nameInner.querySelectorAll('input')[0].value = '';
  nameInner.querySelectorAll('input')[1].value = '';
  let tdAll = document.querySelectorAll('td');
  for (let i = 0; i < tdAll.length; i++) {
    tdAll[i].innerHTML = '';
    tdAll[i].setAttribute('data-num', 0);

  }
});
over.appendChild(overBtn);
wrapper.insertBefore(over, tabInner);