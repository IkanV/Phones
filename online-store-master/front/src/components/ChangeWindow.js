import { spacing } from "@mui/system";
import {Button, Card, Col, Container, Image, Row, Form} from "react-bootstrap";
import PhonesList from "../components/PhonesList";
import { Context } from "../index";
import React, {useContext, useEffect, useState} from 'react';
import PhonesItem2 from "./PhonesItem2";
import PhonesItem3 from "./PhonesItem3";
import { observer } from "mobx-react-lite";
import PhoneInfo from "./PhoneInfo";
import PhoneInfo2 from "./PhoneInfo2";
import {useHistory} from "react-router-dom";
import {fetchBrands, fetchPhones, fetchTypes} from "../http/phonesAPI";
import { SUCCESS_CHANGE } from "../utils/consts";

const ChangeWindow = observer(() => {
    const {phones} = useContext(Context);
    const history = useHistory();
    const [searchPhones, setSearchPhones] = useState('');
    useEffect(
        () => {
                const all = {id:"7", name:"A boshki dumyatsa", column:"all"};
                phones.setSelectedSort(all)
                    fetchPhones(null, phones.selectedBrand.id, phones.selectedSort.id, phones.page, 9, searchPhones).then(data => {
                        phones.setClothing(data.rows);
                        phones.setTotalCount(data.count);
                    });
        }, [searchPhones],
    );

    return (
    <Container className="mt-3">
        <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchPhones}
                    onChange={e => setSearchPhones(e.target.value)}
                    placeholder="Input phones name..."
                />
    <Row className="row">
            <Card
                className="d-flex flex-column"
                style={{width: 500, height: 600, fontSize: 32, border: '5px solid lightgray', margin:5}}
            >
                {(!phones.change_phone_first.id)
                    ?
                    <>
                        <h5>Выберите ваш телефон :</h5>
                        <Row>
                            {phones.clothing.map(phones =>
                                <PhonesItem2 key={phones.id} phone={phones}/>
                            )}
                        </Row>
                    </>
                    :
                    <>
                        <PhoneInfo></PhoneInfo>
                    </>
                }
            </Card>

            <Card
                className="d-flex flex-column"
                style={{width: 500, height: 600, fontSize: 32, border: '5px solid lightgray', margin:5}}
            >
                {(!phones.change_phone_second.id)
                    ?
                    <>
                        <h5>Выберите ваш телефон :</h5>
                        <Row>
                            {phones.clothing.map(phones =>
                                <PhonesItem3 key={phones.id} phone={phones}/>
                            )}
                        </Row>
                    </>
                    :
                    <>
                        <PhoneInfo2></PhoneInfo2>
                    </>
                }
            </Card>
     </Row> 
     <Row>
        <Button onClick={() => {history.push(SUCCESS_CHANGE)}}>Хочу Обменять!</Button>
        <p style={{fontSize: 20}} id="grandPrice"></p>
        </Row>  
</Container>
    );
})

export default ChangeWindow;