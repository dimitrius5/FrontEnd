'use strict';

let user = prompt('Добрый день, представьтесь пожалуйста :)') || 'Сеньор(-ита)';
let money = 3000;

const shop = {
    goods: [],
    cart: [],
    discount: .13,
    discountCount: 3,

    showList: function(category) {
        let list;

        if (!category) { list = this.goods; }
        else {
            list = this.goods.filter(function(el, i, arr) {
                return el.category.toLowerCase() == category.toLowerCase();
            });
    
            if ( !list.length ) list = 'Такой категории нет';
        }
        console.log(list);

        return this;
    },

    findGood: function(item) {
        return this.goods.find(function(good) {
            return good.id == item;
        })
    },

    addToCart: function(id) {
        let item = this.findGood(id);
    
        if (item) {
            this.cart.push(item.id);
            console.log(`В корзину добавлен товар '${item.name}'`);
        } else {
            console.log('Товар не найден!');
        }

        return this;
    },

    removeFromCart: function(id) {
        const index = this.cart.indexOf(id);
        this.cart.splice(index, 1);

        return this;
    },

    clearCart: function() {
        this.cart = [];
        
        return this;
    },

    showCart: function() {
        for(const item of this.cart) {
            console.log(this.findGood(item))
        }

        return this;
    },

    getDiscoutCategories: function() {
        let cartCategories = [];
        for(const item of this.cart) {
            const foundGood = this.findGood(item);
            const foudCategory = cartCategories.findIndex(function(cat) {
                return cat.category == foundGood.category;
            });
            if(foudCategory == -1) {
                cartCategories.push({
                    category: foundGood.category,
                    count: 1
                });
            } else {
                cartCategories[foudCategory].count++;
            }

        }
        let discountCount = this.discountCount;

        return cartCategories
            .filter(function(cat) {
                //this.discountCout doesn't work
                return cat.count >= discountCount;
            })
            .map(function(item) {
                return item.category;
            });
    },

    getPrice: function(discountCategories, good) {
        const toDiscount = discountCategories.some(function(cat){
            return good.category == cat;
        });
        if(toDiscount) {
            return roundTo(good.price * (1 - this.discount))
        }
        return good.price;
    },

    cupit: function() {
        let infoList = '';
        let summ = 0;
        const discountCategories = this.getDiscoutCategories();
        for(const item of this.cart) {
            const foundGood = this.findGood(item);
            const price = this.getPrice(discountCategories, foundGood);
            summ += price;
            infoList += `${foundGood.name} | $${price}\n`
        }

        summ = roundTo(summ);

        infoList += `\n===============\nИтоговая стоимость товаров: $${summ}`;
        infoList += `\nНа вашем счету: $${money}`;
        infoList += `\n\nКупи?`;
    
        let cond = confirm(infoList);
        if (cond) {
            let check = money - summ;
    
            if (money - summ >= 0) {
                money -= summ;
                this.clearCart();
                return `Списание денег со счета прошло успешно!\nНа вашем счету: $${roundTo(money)}`;
            } else {
                return `На вашем счету недостаточно денег! Стоимость товаров превышает ваш счет на $${roundTo(Math.abs(check))}`;
            }
        }
    },
};