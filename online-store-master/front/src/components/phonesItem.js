import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

import star from './../assets/star.png';
import {useHistory} from 'react-router-dom';
import {PHONES_ROUTE} from "../utils/consts";

const PhonesItem = ({phones}) => {
    const history = useHistory();
    console.log(phones);
    return (
        <Col md={3} className="mt-3" onClick={() => history.push(PHONES_ROUTE + '/' + phones.id)}>
            <Card
                className="p-2"
                style={{width: 150,cursor: "pointer"}}
                border={"Light"}
            >
                <Image style={{width: "100%"}} src={process.env.REACT_APP_API_URL + phones.img}/>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="text-black-50">{phones && phones.brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{phones.rating}</div>
                        <Image className="ml-1" src={star} style={{width: "20px", height: "20px"}}/>
                    </div>
                </div>
                <div>{phones.name}</div>
                <div>{phones.price}$</div>
            </Card>
        </Col>
    );
};

export default PhonesItem;
