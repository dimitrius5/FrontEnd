'use strict';

const converterForm = document.querySelector('#converter');
const convertBtn = document.querySelector('#convert');
const result = document.querySelector('#result');
const addForm = document.querySelector('#addConverion');
const addBtn = document.querySelector('#add');
const added = document.querySelector('#added');

convertBtn.addEventListener('click', onConvert);
addBtn.addEventListener('click', onAdd);
appConv.init(document.querySelector('#unit'), document.querySelector('#convert_to'));

function onConvert() {
    const formData = new FormData(converterForm);
    const data = Object.fromEntries(formData);
    result.innerText = roundTo(appConv.calc(data).value) + ' ' + data.convert_to;
}

function onAdd() {
    const formData = new FormData(addForm);
    const data = Object.fromEntries(formData);
    appConv.addConversion(data);
    added.innerText = ` unit '${data.unit}' added to conversions`
}
