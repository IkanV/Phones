import {makeAutoObservable} from "mobx";

export default class PhonesStore {
    constructor() {
        this._sort = [
            {id:"1", name:"По возрастанию рейтинга", column:"rating_up"},
            {id:"2", name:"По убыванию рейтинга", column:"rating_down"},
            {id:"3", name:"По возрастанию цены", column:"price_up"},
            {id:"4", name:"По убыванию цены", column:"price_down"},
        ];
        this._types = [];
        this._brands = [];
        this._clothing = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._page = 1;
        this._selectedSort = {};
        this._totalCount = 0;
        this._limit = 12;
        this._change_phone_first = {}
        this._change_phone_second = {}
        this._grand_price = {}
        this._total_price = {}

        makeAutoObservable(this);
    }

    setGrandPrice(priceG){
        this._grand_price = priceG;
    }

    setTotalPrice(priceT){
        this._total_price = priceT;
    }

    setSelectedType(selectedType) {
        this.setPage(1);
        this._selectedType = selectedType;
    }
    setSelectedSort(selectedSort) {
        this.setPage(1);
        this._selectedSort = selectedSort;
    }
    setSelectedBrand(selectedBrand) {
        this.setPage(1);
        this._selectedBrand = selectedBrand;
    }
    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setClothing(clothing) {
        this._clothing = clothing;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }
    setChangePhoneFirst(phone) {
        this._change_phone_first = phone;
    }
    setChangePhoneSecond(phone) {
        this._change_phone_second = phone;
    }


    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get clothing() {
        return this._clothing;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get selectedSort(){
        return this._selectedSort;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
    get sort() {
        return this._sort;
    }
    get change_phone_first() {
        return this._change_phone_first;
    }
    get change_phone_second() {
        return this._change_phone_second;
    }
    get grandPrice(){
        return this._grand_price;
    }
    get totalPrice(){
        return this._total_price;
    }
}
