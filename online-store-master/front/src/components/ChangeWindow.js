import { spacing } from "@mui/system";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import PhonesList from "../components/PhonesList";
import { Context } from "../index";
import React, {useContext, useEffect} from 'react';
import PhonesItem2 from "./PhonesItem2";
import PhonesItem3 from "./PhonesItem3";
import { observer } from "mobx-react-lite";
import PhoneInfo from "./PhoneInfo";
import {fetchBrands, fetchPhones, fetchTypes} from "../http/phonesAPI";

const ChangeWindow = observer(() => {
    const {phones} = useContext(Context);

    useEffect(
        () => {
                const all = {id:"7", name:"A boshki dumyatsa", column:"all"};
                phones.setSelectedSort(all)
                    fetchPhones(null, phones.selectedBrand.id, phones.selectedSort.id, phones.page, 9, '').then(data => {
                        phones.setClothing(data.rows);
                        phones.setTotalCount(data.count);
                    });
        }, [],
    );

    return (
    <Container className="mt-3">
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
})

export default ChangeWindow;