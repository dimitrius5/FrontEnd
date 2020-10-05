'use strict';

const listEl = document.querySelector('.container ul');
const liEls = Array.from(listEl.children).sort((a, b) => +a.innerHTML - +b.innerHTML);
listEl.innerHTML = '';
for (const li of liEls) {
    listEl.append(li);
}

let gates = document.querySelectorAll('.col');
for (const gate of gates) {
    if (gate.classList.contains('broke')) {
        gate.classList.remove('broke');
    }
    if (gate.classList.contains('open')) {
        gate.classList.remove('open');
        gate.classList.add('close');
    }
    else if (gate.classList.contains('close')) {
        gate.classList.remove('close');
        gate.classList.add('open');
    }
}

const calendEl = document.querySelector('.calendar');
const today = new Date();
const date = new Date(2020, today.getMonth(), 1);
const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const firstDayOfMonth = date.getDay() ? date.getDay() - 2 : 5;

let row = document.createElement('tr');
let day = 1;
for(let i = 0; i < 49; i++) {
    if(i % 7 == 0) {
        calendEl.append(row);
        row = document.createElement('tr');
    }
    const cell = document.createElement('td');
    if(i > firstDayOfMonth && day <= days) {
        cell.innerText = day;
        day++;
    }
    row.append(cell);
}

