import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

import star from './../assets/star.png';
import {useHistory} from 'react-router-dom';
import {PHONES_ROUTE} from "../utils/consts";

const PhonesItem2 = ({phones}) => {
    const history = useHistory();
    console.log(phones);
    return (
        <Col md={2} className="mt-2" onClick={() => history.push(PHONES_ROUTE + '/' + phones.id)}>
            <Card
                className="p-1"
                style={{width: 50,cursor: "pointer"}}
                border={"Light"}
            >
                <Image src={process.env.REACT_APP_API_URL + phones.img}/>
                <div className="d-flex justify-content-between align-items-center mt-2" style={{width: 20}}>
                    <div className="text-black-50" style={{fontSize: 13}}>{phones && phones.brand.name}</div>
                </div>
                <div style={{fontSize: 14}}>{phones.name}</div>
            </Card>
        </Col>
    );
};

export default PhonesItem2;
