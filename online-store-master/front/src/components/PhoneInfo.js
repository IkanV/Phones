import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from './../assets/star.png';
import {useParams} from 'react-router-dom';
import {addPhonesToBasket, addRating, checkRating, fetchOnePhones} from "../http/phonesAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import RatingStars from "../components/ratingStars";


const PhoneInfo = observer(() => {
    const {phones} = useContext(Context);
    const [phoness, setPhones] = useState({info: []});

    useEffect( () => {
        fetchOnePhones(phones.change_phone_first.id).then(data => setPhones(data));
    },[]);

    return (
        <>
            <Row>
                <Col md={4}>
                    <Image width={130} src={process.env.REACT_APP_API_URL + phones.change_phone_first.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h5>{phones.change_phone_first.name}</h5>
                        {/* <div
                            className="d-flex align-items-center justify-content-center"
                           // style={{ background:`url(${bigStar}) no-repeat`, backgroundSize: "cover", width: 80, height: 80, fontSize: 28}}
                        >
                            {phones?.rating || 0}
                        </div> */}
                        {/*{resRate}*/}
                    </Row>
                </Col>
                <Col md={4}>
                        <h3 className="d-flex flex-column align-items-center justify-content-around" 
                        style={{width: 130, height: 130, fontSize: 32}}>Price : {phones.change_phone_first?.price || 0} $</h3>

                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Characteristics</h1>
                {phoness.info.map( (info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </>
    );
});

export default PhoneInfo;