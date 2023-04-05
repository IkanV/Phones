import {makeAutoObservable} from "mobx";

export default class ChatRoomsStore{
    constructor() {
        this._chatRooms = []
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)
    }

    setChatRooms(chatRooms) {
        this._chatRooms = chatRooms
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get chatRooms() {
        return this._chatRooms
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }


}