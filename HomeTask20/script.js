'use strict';


const USERS = MOCK.results;
const rowEl = document.querySelector('.row');
const cardTemplate = `
                <div class="card card-user">
                <img class="card-img-top" src="{userPicture}" alt="User picture">
                <div class="card-body">
                    <h5 class="card-title user-name">{userName}</h5>
                    <div class="card-text address">{userAddress}</div>
                    <a href="tel:{userPhone}" class="card-link phone">{userPhone}</a>
                    <a href="mailto:{userEmail}" class="card-link email">{userEmail}</a>
                </div>
                </div>`;

for(const user of USERS) {
    rowEl.innerHTML += cardTemplate
    .replace('{userPicture}', user.picture.large)
    .replace('{userName}', user.name.title + '. ' + user.name.first +  ' ' + user.name.last)
    .replace('{userAddress}', user.location.city + ', ' + user.location.street.name + ', ' + user.location.street.number)
    .replace(/{userPhone}/g, user.phone)
    .replace(/{userEmail}/g, user.email);
}