import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UserStore from "./store/UserStore";
import PhonesStore from "./store/PhonesStore";
import BasketStoreStore from "./store/BasketStore";
import ChatRoomsStore from "./store/ChatRoomsStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            phones: new PhonesStore(),
            basket: new BasketStoreStore(),
            chatRoom: new ChatRoomsStore()
        }
    }>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
