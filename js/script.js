let lastOperand = 0;
let operation = null;

const inputWindow = document.querySelector('#inputWindow'); //document.getElementById('inputWindow');

// Кнопка "Очистить"
document.querySelector('#btn_clr').addEventListener('click',
    (event) => {
        lastOperand = 0;
        operation = null;
        inputWindow.value = '0';
    })

// Функция расчета результата операции
function pressCalc(event) {
    let nextOperand = parseFloat(inputWindow.value);
    let operResult = 0;

    switch (operation) {
        case '+': operResult = lastOperand + nextOperand; break;
        case '-': operResult = lastOperand - nextOperand; break;
        case '*': operResult = lastOperand * nextOperand; break;
        case '/': operResult = lastOperand / nextOperand; break;
        case '√': operResult = Math.sqrt(lastOperand); break;
        case 'x²': operResult = lastOperand * lastOperand; break;
    }
    inputWindow.value = operResult;
    lastOperand = 0;
    operation = null;
}

// Кнопки операций
document.querySelectorAll('.oper').forEach(btn => {
    btn.addEventListener('click', (event) => {
        let inputValue = parseFloat(inputWindow.value);

        // если lastOperand не пустой, значит в стеке операций, эта - не первая. Вычислим промежуточный результат
        if (lastOperand != 0) {
            pressCalc(event);
        }
        // Смена знака числа
        if (btn.innerHTML == '±') {
            inputWindow.value = inputValue * -1;
        } else {
            // Запомним предыдущий операнд и операцию
            lastOperand = inputValue;
            operation = btn.innerHTML;
            inputWindow.value = operation;

            // Если это операция вычисления квадратного корня
            if (btn.innerHTML == '√') {
                pressCalc(event);
            } else
            // Если это операция возведения в квадрат
            if (btn.innerHTML == 'x²') {
                pressCalc(event);
            }
        }
    })
})

// Кнопка "Равно"
document.querySelector('#btn_equal').addEventListener('click', pressCalc)

// Кнопки цифр и "."
document.querySelectorAll('.num-pan').forEach(btn => {
    btn.addEventListener('click', (event) => {
        let blankValue = new Array('0', '+', '-', '*', '/');
        let btnValue = btn.innerHTML;

        if ((btnValue != '.') || (inputWindow.value != '0')) {    // Для разделителя дробной части разрешаем ведущий "0"
            if (blankValue.includes(inputWindow.value, 0)) {
                inputWindow.value = '';
            }
        }
        inputWindow.value += btnValue;
    })
})


