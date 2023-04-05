import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";

const OneItemInBasket = ({phones}) => {
    const {basket, user} = useContext(Context);

    return (
        <Card key={phones.id} style={{width: "100%"}} className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <Image src={process.env.REACT_APP_API_URL + phones.img} style={{width: "100%", maxWidth: 250}} />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12}>
                                <b>Title:</b> <NavLink to={`/phones/${phones.id}`}>{phones.name}</NavLink>
                            </Col>
                        </Row>
                        <br/><br/>
                        <Row>
                            <Col xs={12}>
                                <b>Description:</b><br/><br/>
                                {phones.info && phones.info.length !== 0? phones.info.map((info, i) => {

                                    if(i % 2 === 0 ) {
                                        return (
                                            <Row key={info.id}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={info.id} style={{backgroundColor: "lightgray"}}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    }

                                }) : "Description absent"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(phones, true)}>Delete</Button>
                                    : <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(phones)}>Delete</Button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Count:
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={() => basket.setCountPhones(phones.id, "+")}>+</Button>
                                <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountPhones(Number(e.target.value))} value={phones.count}/>
                                <Button variant="outline-dark" onClick={() => basket.setCountPhones(phones.id, "-")}>-</Button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Price: {phones.price * phones.count} $
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
)};

export default OneItemInBasket;
