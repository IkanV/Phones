import {Button, Nav} from "react-bootstrap";
import React, {useContext} from "react";
import {Context} from "../../../index";
import {useHistory} from "react-router-dom";
import {ADMIN_ROUTE, INTO_CHANGE, INTO_CHAT_ROUTE, ORDERS_ROUTE} from "../../../utils/consts";
import BasketNavBar from "../BasketNavBar";

const TrueAuth = () => {
    const {user, basket} = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        basket.resetBasket();
    }

    return (
        <Nav className="ml-auto" style={{color: "white"}}>
            <BasketNavBar/>
            {user.isAuth && user.User.role === "ADMIN" && <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(ORDERS_ROUTE)}}
            >
                Заказы
            </Button>}
            {user.isAuth && user.User.role === "USER" && <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(INTO_CHAT_ROUTE)}}
            >
                Поддержка
            </Button>}
            {user.isAuth && user.User.role === "USER" && <Button
                className={"mr-3"}
                variant={"outline-light"}
                href={INTO_CHANGE}
            >
                Обмен
            </Button>}
                {user.isAuth && user.User.role === "ADMIN" && <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(ADMIN_ROUTE)}}
            >
                Управление
            </Button>}
            <Button
                variant={"outline-light"}
                onClick={() => logOut()}
            >
                Выйти
            </Button>
        </Nav>
    );
};

export default TrueAuth;
