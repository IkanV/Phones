import React, { useContext } from 'react';
import {Card, Col, Image} from "react-bootstrap";

import star from './../assets/star.png';
import {useHistory} from 'react-router-dom';
import {PHONES_ROUTE} from "../utils/consts";
import { Context } from '..';

const PhonesItem3 = ({phone}) => {
    const history = useHistory();
    const {phones} = useContext(Context);
    console.log(phones);
    return (
        <Col md={2} className="mt-2"
        onClick={() => {
            phones.setChangePhoneSecond(phone)
        }}>
            <Card
                className="p-1"
                style={{width: 50,cursor: "pointer"}}
                border={"Light"}
            >
                <Image src={process.env.REACT_APP_API_URL + phone.img}/>
                <div className="d-flex justify-content-between align-items-center mt-2" style={{width: 20}}>
                    <div className="text-black-50" style={{fontSize: 13}}>{phone && phone.brand.name}</div>
                </div>
                <div style={{fontSize: 14}}>{phone.name}</div>
                <div style={{fontSize:14}}>{phone.price}$</div>
            </Card>
        </Col>
    );
};

export default PhonesItem3;
