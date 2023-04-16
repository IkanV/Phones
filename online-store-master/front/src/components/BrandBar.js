import React, {useContext, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(({addRecPhone})  => {
    const {phones} = useContext(Context);
    const ref = useRef();
    const [count, setCount] = useState(false); 
    return (
        <Row className="d-flex">
            {phones.brands.map(brand =>
                <Card
                    ref={ref}
                    style={{cursor: "pointer"}}
                    border={brand.id === phones.selectedBrand.id ? "danger" : "light"}
                    key={brand.id}
                    className="p-3"
                    onClick={() => 
                    {
                        // if(count){
                            
                        //     setTimeout(()=>{setCount(false); ref.current.click()}, 300);
                        // }
                        addRecPhone(phones);
                        phones.setSelectedBrand(brand);
                        
                        //setCount(true);
                    }}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
