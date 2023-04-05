import React, {useContext, useEffect,  useState} from 'react';
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import PhonesList from "../components/PhonesList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchPhones, fetchTypes} from "../http/phonesAPI";
import Pages from "../components/Pages";
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

const Shop = observer(() => {
    const {phones} = useContext(Context);
    const [searchPhones, setSearchPhones] = useState('');
    const [searchedPhones, setSearchedPhones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);
    useEffect(() => {
        getAllClothingInAdminPage(searchPhones, 1, 'All').then(({count, rows}) => {
            setSearchedPhones(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [searchPhones])
    useEffect(() => {
        fetchTypes().then(data => phones.setTypes(data));
        fetchBrands().then(data => phones.setBrands(data));
        fetchPhones(null, null, 1, 9).then(data => {
            phones.setClothing(data.rows);
            phones.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(phones.selectedType === "All" || !phones.selectedType) {
                    fetchPhones(null, phones.selectedBrand.id, phones.page, 9, searchPhones).then(data => {
                        phones.setClothing(data.rows);
                        phones.setTotalCount(data.count);
                    });
                } else {
                    fetchPhones(phones.selectedType.id, phones.selectedBrand.id, phones.page, 9, searchPhones).then(data => {
                        phones.setClothing(data.rows);
                        phones.setTotalCount(data.count);
                    });
                }
        }, [phones.page, phones.selectedType, phones.selectedBrand, searchPhones],
    );

    return (
        <Container>
             <InputGroup className="mb-3 mt-3">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchPhones}
                    onChange={e => setSearchPhones(e.target.value)}
                    placeholder="Input phones name..."
                />
                <Button
                    onClick={() => {
                        fetchPhones(phones.selectedType.id, phones.selectedBrand.id, phones.page, 9, searchPhones)}}
                    variant="outline-dark"
                    className="ml-2"
                >
                    Search
                </Button>
            </InputGroup>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <PhonesList/>
                    <Pages/>
                </Col>
               
            </Row>
        </Container>
    );
});

export default Shop;
