import { spacing } from "@mui/system";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import PhonesList from "../components/PhonesList";
import { Context } from "../index";
import React, {useContext} from 'react';
import PhonesItem2 from "./PhonesItem2";
import PhonesItem3 from "./PhonesItem3";

const ChangeWindow = () => {
    const {phones} = useContext(Context);

    return (
    <Container className="mt-3">
    <Row className="row">
            <Card
                className="d-flex flex-column"
                style={{width: 500, height: 600, fontSize: 32, border: '5px solid lightgray', margin:5}}
            >
                <h5>Выберите ваш телефон :</h5>
               <Row>
            {phones.clothing.map(phones =>
                <PhonesItem2 key={phones.id} phones={phones}/>
            )}
             </Row>
            </Card>

            <Card
                className="d-flex flex-column"
                style={{width: 500, height: 600, fontSize: 32, border: '5px solid lightgray', margin:5}}
            >
                <h5>Выберите телефон для обмена : </h5>
                <Row>
                {phones.clothing.map(phones =>
                <PhonesItem3 key={phones.id} phones={phones}/>
            )}
            </Row>
            </Card>
     </Row> 
     <Row>
        <Button>Обмен</Button>
        </Row>  
</Container>
    );
}

export default ChangeWindow;