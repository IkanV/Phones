import {makeAutoObservable} from "mobx";
import {deletePhonesFromBasket} from "../http/phonesAPI";

export default class BasketStoreStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(phones, isAuth = false) {
        if(isAuth) {
            await deletePhonesFromBasket(phones.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== phones.id);
                this._totalPrice -=  phones.price * phones.count;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== phones.id);
            this._totalPrice -=  phones.price * phones.count;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(item, isAuth = false) {
        const checkPhonesInBasket = this._basket.findIndex(phones => phones.id === item.id);
        if(checkPhonesInBasket < 0) {
            this._basket = [...this._basket, { count: 1, ...item}];
            let totalPrice = 0;
            this._basket.forEach(phones => totalPrice += Number(phones.price * phones.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setDeleteAllPhonesFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    setCountPhones(phonesId, action, isAuth = false) {
        const itemInd = this._basket.findIndex(item => item.id === phonesId);
        const itemInState = this._basket.find(phones => phones.id === phonesId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }

        let totalPrice = 0;
        this._basket.forEach(phones => totalPrice += Number(phones.price * phones.count));
        this._totalPrice = totalPrice;
    }

    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('basket');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}
