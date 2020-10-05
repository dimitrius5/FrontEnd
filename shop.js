let user = prompt('Добрый день, представьтесь пожалуйста :)') || 'Сеньор(-ита)';
let money = 2000;
let cart = [];
let discount = .13;

const goods = [
    ['xcds', 'Процессоры', 'intel i7 w8', 600],
    ['asd2', 'Материнская плата', 'Acer b450', 200],
    ['zg82', 'Процессоры', 'AMD', 900],
    ['1tgy', 'Одежда', 'Радужные', 2.22], 
    ['n6ba', 'Продукты', 'Tomato', 1.5], 
    ['kio1', 'Процессоры', 'Rizen', 780.5], 
    ['IVAN', 'Одежда', 'Футболка розовая', 40] 
];

function showList(category) {
    let list;

    if (!category) { list = goods; }
    else {
        list = goods.filter(function(el, i, arr) {
            return el[1].toLowerCase() == category.toLowerCase();
        });

        if ( !list.length ) list = 'Такой категории нет';
    }

    return list;
}

function addToCart(id) {
    let item = goods.find(function(goodId) {
        return goodId[0] == id;
    });

    if (item) {
        cart.push(item.map(function(el) {
            return el;
        }));
        return `В корзину добавлен товар '${item[2]}'`;
    } else {
        return 'Товар не найден!';
    }
}

function removeFromCart(id) {
    let item = cart.find(function(goodId) {
        return goodId[0] == id;
    });
    let index = cart.indexOf(item);

    cart.splice(index, 1);
}

function clearCart() {
    cart = [];
}

function showCart() {
    return cart;
}

function cupit() {
    let infoList = cart.map(function(good) {
       return `${good[2]} | $${good[3]}`;
    }).join('\n');

    calcDiscount();

    let summ = cart.map(function(price) {
        return price[3];
    }).reduce(function(result, price) {
        return result + price;
    });

    summ = roundTo(summ);

    infoList += `\n===============\nИтоговая стоимость товаров: $${summ}`;
    infoList += `\nНа вашем счету: $${money}`;
    infoList += `\n\nКупи?`;

    let cond = confirm(infoList);

    if (cond) {
        let check = money - summ;

        if (check >= 0) {
            money -= summ;
            clearCart();
            return `Списание денег со счета прошло успешно!\nНа вашем счету: $${roundTo(money)}`;
        } else {
            return `На вашем счету недостаточно денег! Стоимость товаров превышает ваш счет на $${roundTo(Math.abs(check))}`;
        }
    }
}

function roundTo(num, n = 2) {
    return Math.round( num * (10 ** parseInt(n)) ) / (10 ** parseInt(n));
}

function calcDiscount() {
    let sameCategory = [];

    cart.forEach(function(good) {
        let cat = good[1];

        if (!sameCategory.length) {
            sameCategory.push([cat, 1]);
        } else {
            let item = sameCategory.find(function(el, i, arr) {
                return el[0] == cat;
            });

            if (item) {
                item[1]++;
            } else {
                sameCategory.push([cat, 1]);
            }
        }
    });

    let filtered = sameCategory.filter(function(el) {
        return el[1] >= 3;
    });

    cart.forEach(function(good) {
        let check = filtered.some(function(filter) {
            return filter[0] == good[1];
        });

        if (check) {
            let price = good[3] * (1 - discount);
            good[3] = roundTo(price);
        }
    });
}

addToCart('xcds');
addToCart('xcds');

addToCart('IVAN'); 
addToCart('IVAN');
addToCart('IVAN');
addToCart('IVAN');

addToCart('n6ba');
addToCart('n6ba');
addToCart('n6ba');

addToCart('1tgy');

calcDiscount();