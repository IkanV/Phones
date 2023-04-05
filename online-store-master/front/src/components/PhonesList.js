import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import PhonesItem from "./phonesItem";
import SearchPhones from "./SearcPhone"

const PhonesList = observer(() => {
    const {phones} = useContext(Context);

    return (
        
            <Row className="d-flex">
            {phones.clothing.map(phones =>
                <PhonesItem key={phones.id} phones={phones}/>
            )}
        </Row>
        
    
    );
});

export default PhonesList;
