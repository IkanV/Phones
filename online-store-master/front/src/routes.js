import {
    ADMIN_ROUTE,
    BASKET_ROUTE, PHONES_EDIT_ROUTE,
    PHONES_ROUTE, INTO_CHAT_ROUTE,
    LOGIN_ROUTE, ORDERING_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE, CHECKOUT_SUCCESS
} from './utils/consts';

import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import PhonesPage from "./pages/PhonesPage";
import BasketCard from "./pages/BasketCard";
import OneOrder from "./pages/OneOrder";
import PhonesPageEdit from "./pages/PhonesPageEdit";
import Ordering from "./pages/Ordering";
import UserChat from "./pages/UserChat";
import CheckoutSuccess from './components/CheckoutSuccess';


export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: OneOrder
    },
    {
        path: PHONES_EDIT_ROUTE + '/:id',
        Component: PhonesPageEdit
    },


];

export const publicRouters = [
    {
        path: ORDERING_ROUTE,
        Component: Ordering
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PHONES_ROUTE + '/:id',
        Component: PhonesPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketCard
    },
    {
        path : INTO_CHAT_ROUTE,
        Component: UserChat
    },
    {
        path : INTO_CHAT_ROUTE + '/:id',
        Component: UserChat
    },
    {
        path : CHECKOUT_SUCCESS,
        Component : CheckoutSuccess
    }
];
