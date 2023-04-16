import React, {useContext, useEffect,  useRef,  useState} from 'react';
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import PhonesList from "../components/PhonesList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchPhones, fetchPhonesTest, fetchTypes} from "../http/phonesAPI";
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
import { Card } from '@material-ui/core';

const Shop = observer(() => {
    const {phones} = useContext(Context);
    const [searchPhones, setSearchPhones] = useState('');
    const [searchedPhones, setSearchedPhones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);
    const [showRec, setShowRec] = useState(false);
    const [phoneRec, setPhoneRec] = useState({});
    let test = {};
    const addRec = async (phoness) => {
        //console.log('3 :', phones.clothing);
        let test2 = await fetchPhonesTest();
        
        setShowRec(true);
        // console.log('0',test2.filter(x => x.brandId === phones.selectedBrand.id).map(o => o.rating));     
        // console.log('0',Math.max(test2.filter(x => x.brandId === phones.selectedBrand.id).map(o => o.rating) ));
        // //console.log('phones', phoness.clothing.filter(x => x.brand.id === phones.selectedBrand.id).map(o => o.rating));
        // console.log('1', test2.filter(x =>{
            
        //     console.log(x => x.brandId === phones.selectedBrand.id)
        //     console.log('3', x.brandId);
        //     console.log('4', phones.selectedBrand.id)
          //  }));
        let max = Math.max(...test2.filter(x => x.brandId === phones.selectedBrand.id).map(o => o.rating));
        setPhoneRec(test2.find(e => e.rating === max));
        //console.log('2', max);
        console.log(typeof phones.clothing);
        const test6 = Object.entries(phones.clothing);
        console.log('4', test6);
          
        //console.log('3', test2);
       // phones.clothing = phones.clothing.reverse();
        phones.clothing.map(phone => {
          
            //    setPhoneRec(phones.clothing.find(e => e.rating === max));
               console.log('5', phoneRec );  
        });
    };
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
            test = data.rows;
        });
    }, []);

    useEffect(
        () => {
            if(!phones.selectedSort){
                const all = {id:"7", name:"A boshki dumyatsa", column:"all"};
                phones.setSelectedSort(all)
            }
            if(phones.selectedType === "All" || !phones.selectedType) {
                    fetchPhones(null, phones.selectedBrand.id, phones.selectedSort.id, phones.page, 9, searchPhones).then(data => {
                        
                        phones.setClothing(data.rows);
                        phones.setTotalCount(data.count);
                    });
                } else {
                    fetchPhones(phones.selectedType.id, phones.selectedBrand.id, phones.selectedSort.id, phones.page, 9, searchPhones).then(data => {
                        phones.setClothing(data.rows);
                        phones.setTotalCount(data.count);
                    });
                }
        }, [phones.page, phones.selectedType, phones.selectedBrand, searchPhones, phones.selectedSort],
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
                    <Dropdown>
                        <Dropdown.Toggle variant="success" md={3} className='mt-3' id="dropdown-basic">
                            Отсортировать товары по
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {phones.sort.map(sort_type =>
                                <Dropdown.Item key={sort_type.id} onClick={() => phones.setSelectedSort(sort_type)}>{sort_type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                        {showRec && phoneRec && phoneRec.brandId && (
                        <Card
                className="p-2"
                style={{width: 150, height:230, cursor: "pointer"}}
                border={"Light"}
            >
                <Image style={{width: "100%"}} src={process.env.REACT_APP_API_URL + phoneRec.img}/>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="text-black-50">{phones && phoneRec.brandId && phoneRec.brand.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{phoneRec.rating}</div>
                        <Image className="ml-1" src={phoneRec.star} style={{width: "20px", height: "20px"}}/>
                    </div>
                </div>
                <div>{phoneRec.name}</div>
                <div>{phoneRec.price}$</div>
            </Card>
            )}

                    </Dropdown>
                </Col>
                <Col md={9}>
                    <BrandBar addRecPhone = {addRec}/>
                    <PhonesList/>
                    <Pages/>
                </Col>
               
            </Row>
        </Container>
    );
});

export default Shop;
