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

import CreatePhones from "../components/modals/CreatePhones";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import {getAllClothingInAdminPage} from "../http/phonesAPI";
import {NavLink} from "react-router-dom";
import {PHONES_EDIT_ROUTE} from "../utils/consts";
import DeleteBrandOrType from "../components/modals/DeleteBrandOrType";
import ChatRoomsTable from "../components/ChatRoomsTable";
import SearchPhones from '../components/SearcPhone';

const Admin = () => {
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

    //pagination
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
    }, [filter, successMsg])


    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    return (
        <Container className="d-flex flex-column">
            {showSuccessMsg && <p>{successMsg}</p>}
            <Button
                onClick={() => setTypeVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add type
            </Button>
            <Button
                onClick={() => setBrandVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add brand
            </Button>
            <Button
                onClick={() => setPhonesVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Add phones
            </Button>
            <Button
                onClick={() => setDeleteBrandOrType(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Delete type of brand
            </Button>
            <CreatePhones show={phonesVisible} onHide={() => setPhonesVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteBrandOrType show={deleteBrandOrType} onHide={() => setDeleteBrandOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>

            <Dropdown className="mt-5 mb-3" style={{margin: "0 auto"}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {filter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {filter === "All" ? <Dropdown.Item disabled>All</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("All")}>All</Dropdown.Item>}
                    {filter === "Without Brand or Type" ? <Dropdown.Item disabled>Without Brand or Type</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Without Brand or Type")}>Without Brand or Type</Dropdown.Item>}
                </Dropdown.Menu>
            </Dropdown>
            <SearchPhones></SearchPhones>
            <ChatRoomsTable

            />

        </Container>
    );
};

export default Admin;
