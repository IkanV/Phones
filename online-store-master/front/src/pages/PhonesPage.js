import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from './../assets/star.png';
import {useParams} from 'react-router-dom';
import {addPhonesToBasket, addRating, checkRating, fetchOnePhones} from "../http/phonesAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import RatingStars from "../components/ratingStars";

const PhonesPage = observer(() => {
    const {user, basket} = useContext(Context);
    const [phones, setPhones] = useState({info: []});
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setSsAccessRating] = useState(false);
    const {id} = useParams();


    useEffect( () => {
        fetchOnePhones(id).then(data => setPhones(data));
        if(user.isAuth) {
            checkRating({phonesId: id}).then(res => setSsAccessRating(res.allow));
        }
    },[id, resRate]);

    const isPhonesInBasket = () => {
        const findPhones = basket.Basket.findIndex(item => Number(item.id) === Number(phones.id));
        return findPhones < 0;
    }

    const addPhonesInBasket = (phones) => {
        if(user.isAuth) {
            addPhonesToBasket(phones).then(() => basket.setBasket(phones, true))
        } else {
            basket.setBasket(phones);
        }
    }

    const ratingChanged = (rate) => {
        addRating({
            rate,
            phonesId: id
        }).then(res => {
            setResRate(res);
        });
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} src={process.env.REACT_APP_API_URL + phones.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{phones.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ background:`url(${bigStar}) no-repeat`, backgroundSize: "cover", width: 80, height: 80, fontSize: 28}}
                        >
                            {phones?.rating || 0}
                        </div>
                        <RatingStars
                            ratingChanged={ratingChanged}
                            ratingVal={phones?.rating || 0}
                            isAuth={user.isAuth}
                            isAccessRating={isAccessRating}
                        />
                        {resRate}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{phones?.price || 0} $</h3>
                        { isPhonesInBasket() ?
                            <Button variant="outline-dark" onClick={() => addPhonesInBasket(phones)}>Add</Button>
                            :
                            <Button variant="outline-dark" disabled>Phones already in basket</Button>
                        }

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Characteristics</h1>
                {phones.info.map( (info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default PhonesPage;
