import React, {useContext, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";
import {useHistory} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import axios from 'axios';

const Ordering = ({cartItems}) => {
    const {basket, user} = useContext(Context);
    const [phone, setPhone] = useState(null);
    const history = useHistory();

    const buy = () => {
        // let order = {
        //     mobile: phone,
        //     basket: basket.Basket
        // }
        
        // if(user.isAuth) {
        //     order.auth = true;
        // }

        // sendOrder(order).then(data => {
        //     console.log(data);
        //     basket.setDeleteAllPhonesFromBasket();
        //     history.push(SHOP_ROUTE);
        // });
        const url = "http://localhost:5000/api";
        axios.post(`${url}/stripe/create-checkout-session`, 
        {
            cartItems : basket.Basket,
            userId : user.userId
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url;
            }
        }).catch((err) => console.log(err.message))


    }
    return (
        <>
            {/* <Form>
                <Form.Control
                    placeholder="Input your phone..."
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </Form> */}
            <Row className="mt-3">
                <Col xs={12}>
                    <Button onClick={buy}>Buy</Button>
                </Col>
            </Row>
        </>
    );
};

export default Ordering;
