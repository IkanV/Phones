import React, {useEffect, useState} from 'react';
import {
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";
import {getAllClothingInAdminPage} from "../http/phonesAPI";
import {NavLink} from "react-router-dom";
import {PHONES_EDIT_ROUTE} from "../utils/consts";

const SearchPhones = ({kartoteka}) => {

    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [phonesVisible, setPhonesVisible] = useState(false);
    const [deleteBrandOrType, setDeleteBrandOrType] = useState(false);

    const [searchPhones, setSearchPhones] = useState('');
    const [searchedPhones, setSearchedPhones] = useState([]);
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    useEffect(() => {
        getAllClothingInAdminPage(searchPhones, currentPage, filter).then(({count, rows}) => {
            setSearchedPhones(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllClothingInAdminPage(searchPhones, 1, filter).then(({count, rows}) => {
            setSearchedPhones(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg, searchPhones])

    const fetchPhones = () => {
        getAllClothingInAdminPage(searchPhones, currentPage, filter).then(({count, rows}) => {
            setSearchedPhones(rows);
            setCount(count)
        })
    };

    return (
        <div>
            <Form>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchPhones}
                    onChange={e => setSearchPhones(e.target.value)}
                    placeholder="Input phones name..."
                />
                <Button
                    onClick={fetchPhones}
                    variant="outline-dark"
                    className="ml-2"
                >
                    Search
                </Button>
            </InputGroup>

            <ListGroup>
                {searchedPhones && searchedPhones.map( ({id, img, brand, type, price, name}) => {
                    return (
                        <ListGroup.Item className="mt-3" key={id}>
                            <Row>
                                <Col xs={2}>
                                    <Image width={150} src={process.env.REACT_APP_API_URL + img}/>
                                </Col>
                                <Col xs={8}>
                                    <Row>
                                        <Col xs={12}>
                                            <NavLink to={PHONES_EDIT_ROUTE + `/${id}`}>id: {id}</NavLink>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Name: {name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Price: {price}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Brand: {brand.name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Type: {type.name}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2}>
                                    <NavLink to={PHONES_EDIT_ROUTE + `/${id}`}>Edit</NavLink>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {searchedPhones && searchedPhones.length > 0 ? pages : false}
            </Pagination>
            </Form>
        </div>
    );
};

export default SearchPhones;