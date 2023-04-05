import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(()  => {
    const {phones} = useContext(Context);
    return (
        <Row className="d-flex">
            {phones.brands.map(brand =>
                <Card
                    style={{cursor: "pointer"}}
                    border={brand.id === phones.selectedBrand.id ? "danger" : "light"}
                    key={brand.id}
                    className="p-3"
                    onClick={() => phones.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
