'use strict';

const $usersCount = $('#usersCount');
const grid = document.querySelector('#grid')

$usersCount.on('input', function() {
    showUsers();
});

function getUsers(count) {
    return $.ajax(`https://randomuser.me/api/?results=${count}`);
}

function showUsers() {
    grid.innerHTML = '';
    getUsers($usersCount.val()).done(function (data){
        for(const user of data.results) {
            grid.innerHTML += `
            <div class="card">
                <img src="${user.picture.medium}">
                <div>${user.name.first} ${user.name.last}</div>
            </div>`
        }
    })
}

showUsers(5);
