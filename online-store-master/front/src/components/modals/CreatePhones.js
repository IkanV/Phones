import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {createPhones, fetchBrands, fetchTypes} from "../../http/phonesAPI";
import {observer} from "mobx-react-lite";

const CreatePhones = observer(({show, onHide}) => {
    const {phones} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => phones.setTypes(data));
        fetchBrands().then(data => phones.setBrands(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addPhones = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', phones.selectedBrand.id);
        formData.append('typeId', phones.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createPhones(formData).then(() => onHide());
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new phones
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{phones.selectedType.name || "Choose your Type"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {phones.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => phones.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{phones.selectedBrand.name || "Choose your Brand"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {phones.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => phones.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Input name your phones..."
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Input name price for the phones..."
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant="outline-dark"
                        onClick={() => addInfo()}
                    >
                        Add new property
                    </Button>
                    {info.map(item =>
                        <Row key={item.number} className="mt-3">
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Input title for the phones..."
                                    value={item.title}
                                    onChange={e => changeInfo('title', e.target.value, item.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Input description for the phones..."
                                    value={item.description}
                                    onChange={e => changeInfo('description', e.target.value, item.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => deleteInfo(item.number)}
                                >
                                    Delete new property
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addPhones}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePhones;
