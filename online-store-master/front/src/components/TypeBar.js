import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {phones} = useContext(Context);

    const getAllClothing = () => {
        phones.setSelectedType("all");
        phones.setSelectedBrand("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                active={"all" === phones.selectedType}
                onClick={getAllClothing}
            >
                All
            </ListGroup.Item>
            {phones.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === phones.selectedType.id}
                    key={type.id}
                    onClick={() => phones.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
