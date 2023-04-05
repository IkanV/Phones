import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useHistory} from 'react-router-dom';
import {fetchDeletePhones, fetchOnePhones, updateClothing} from "../http/phonesAPI";
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";


const PhonesPageEdit = () => {
    const {phones} = useContext(Context);
    const history = useHistory();
    const {id} = useParams();
    const [phonesCurr, setPhonesCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [selectBrand, setSelectBrand] = useState({});
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deletePhones = () => {
        fetchDeletePhones(id).then(() => {
            history.push(ADMIN_ROUTE);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result); ////ERROR!!!!!!!!!!!!!!!!!!!!!1
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //info
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i));
    };

    const putPhones = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', img);
        formData.append('brandId', selectBrand.id);
        formData.append('typeId', selectType.id);
        formData.append('info', JSON.stringify(info));
        updateClothing(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for(let key in item) {
                if(key === "title" || key === "description") {
                    if(!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if(phonesCurr.info && phonesCurr.info.length !== info.length) {
            checkInfoVal = checkInfo();
        }

        if(phonesCurr && phonesCurr.brand && phonesCurr.type) {
            if(phonesCurr.brand.name !== selectBrand.name ||
                phonesCurr.type.name !== selectType.name ||
                phonesCurr.name !== name ||
                phonesCurr.price !== price ||
                checkInfoVal ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, selectBrand, selectType, price, img, info]);

    useEffect(() => {
        fetchOnePhones(id).then(data => {
            setPhonesCurr(data);
            setSelectBrand(data.brand);
            setSelectType(data.type);
            setName(data.name);
            setPrice(data.price);
            setInfo(data.info)
        });
    }, [id]);

    return (
        <Container className="mt-3">
            {showMsg && <Row>
                {msg}
            </Row>}

            <Row>
                <Col xs={12}>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            id:
                        </Col>
                        <Col xs={11}>
                            {phonesCurr.id}
                        </Col>
                    </Row>
                    {/*Brand*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Brand:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectBrand.name || "Choose Brand"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {phones.brands.map(brand => {
                                        return brand.name === selectBrand.name ?
                                            <Dropdown.Item
                                                key={brand.id}
                                                disabled
                                            >
                                                {brand.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={brand.id}
                                                onClick={() => setSelectBrand(brand)}
                                            >
                                                {brand.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Type*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Types:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectType.name || "Choose Type"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {phones.types.map(type => {
                                        return type.name === selectType.name ?
                                            <Dropdown.Item
                                                key={type.id}
                                                disabled
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={type.id}
                                                onClick={() => setSelectType(type)}
                                            >
                                                {type.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Name:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{color: "red"}}>Please input name of phones</b>}
                        </Col>
                    </Row>
                    {/*Name*/}
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center">
                            Price:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {price === 0 && <b style={{color: "red"}}>Please input price of phones</b>}
                        </Col>
                    </Row>

                    {/*Name*/}
                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center">
                            Current Img: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={process.env.REACT_APP_API_URL + phonesCurr.img}/>
                        </Col>
                        {img && <Col xs={6} className="d-flex flex-column justify-content-center text-center">
                            New Img: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={img}/>
                        </Col>}
                        <Col xs={3} className="d-flex align-items-center">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Upload file" onChange={imgHandler}/>
                                </Form.Group>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/*Characteristics*/}
                    <Row className="d-flex flex-column m-3">
                        <h4>Characteristics</h4>
                        <Button
                            variant="outline-dark"
                            onClick={() => addInfo()}
                        >
                            Add new property
                        </Button>
                        {info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Input title for the phones..."
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!info[index].title &&  <b style={{color: "red"}}>Please input name</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Input description for the phones..."
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!info[index].description &&  <b style={{color: "red"}}>Please input description</b>}
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
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Change Phones</Button> : <Button onClick={putPhones}>Update Phones</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Delete Phones</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this phones {phonesCurr.id}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deletePhones}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PhonesPageEdit;

