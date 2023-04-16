import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Form} from "react-bootstrap";
import bigStar from './../assets/star.png';
import {useParams} from 'react-router-dom';
import {addPhonesToBasket, addRating, checkRating, fetchOnePhones} from "../http/phonesAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import RatingStars from "../components/ratingStars";


const PhoneInfo = observer(() => {
    const {phones} = useContext(Context);
    const [phoness, setPhones] = useState({info: []});
    const CheckBox = ({LabelTxt, id}) => (
        <div style={{padding : 0, margin: 0, paddingBottom: 0}}>
            <input style={{margin: 1, padding: 0}} type={"checkbox"} id={id}></input>
            <label style={{fontSize: 16, padding: 0, margin: 2}} for={id}>{LabelTxt}</label>
        </div>
    )

    useEffect( () => {
        fetchOnePhones(phones.change_phone_first.id).then(data => setPhones(data));
    },[]);

            const [isChecked, setIsChecked] = useState(false);
            const [isChecked2, setIsChecked2] = useState(false);
            const [isChecked3, setIsChecked3] = useState(false);
            const [isChecked4, setIsChecked4] = useState(false);
            const [isChecked5, setIsChecked5] = useState(false);
            const [isChecked6, setIsChecked6] = useState(false);
            const [isChecked7, setIsChecked7] = useState(false);
            const handleChange = (event) => {
              setIsChecked(event.target.checked);
            }
            const [ choose, setChoose ] = useState("0");
    const CountPrice = () => {
        console.log(isChecked);
        let totalPrice = phones.change_phone_first.price;
        switch (choose)
            {
                case '1': totalPrice = totalPrice * 0.9;
                    break;
                case '2': totalPrice = totalPrice * 0.8;
                    break;
                case '3': totalPrice = totalPrice * 0.6;
                break;
                default: break;
            }
        if(isChecked2){
            totalPrice = totalPrice * 0.85;
        }
        if(isChecked3){
            totalPrice = totalPrice * 0.85;
        }
        if(isChecked4){
            totalPrice = totalPrice * 0.5;
        }
        if(isChecked5){
            totalPrice = totalPrice * 0.7;
        }
        if(isChecked6){
            totalPrice = totalPrice * 0.5;
        }
        if(isChecked7){
            totalPrice = totalPrice * 0.5;
        }
        totalPrice = totalPrice.toFixed(2);
        document.getElementById("total_price").innerHTML = `Total : ${totalPrice}$`;
        phones.setGrandPrice(totalPrice);

        if(phones.change_phone_second.id){
            const grandPrice = phones.change_phone_second.price - totalPrice;
            document.getElementById("grandPrice").innerHTML = `Grand Price : ${grandPrice}$`;
            document.getElementById("grandPrice").style.color = "green";
        }else{
            document.getElementById("grandPrice").innerHTML = `Необходимо выбрать второй телефон`;
            document.getElementById("grandPrice").style.color = "red";
        }
    }

    return (
        <>
            <Row>
                <Col md={4}>
                    <Image width={130} src={process.env.REACT_APP_API_URL + phones.change_phone_first.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h5>{phones.change_phone_first.name}</h5>
                        {/* <div
                            className="d-flex align-items-center justify-content-center"
                           // style={{ background:`url(${bigStar}) no-repeat`, backgroundSize: "cover", width: 80, height: 80, fontSize: 28}}
                        >
                            {phones?.rating || 0}
                        </div> */}
                        {/*{resRate}*/}
                    </Row>
                </Col>
                <Col md={4}>
                        <h3 className="d-flex flex-column align-items-center justify-content-around" 
                        style={{width: 130, height: 130, fontSize: 32}}>Price : {phones.change_phone_first?.price || 0} $</h3>

                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 style={{fontSize: 18, padding: 0}}>Characteristics</h1>
                {phoness.info.map( (info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 0, margin:1, paddingBottom: 0, fontSize: 14}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
            <Form.Check
                type="radio"
                id="term_of_use"
                label="Срок использования 1 год"
                style={{fontSize: 14}}
                className='mx-3'
                checked={choose === '1'}
                value={'1'}
                onChange={(e)=>{setChoose(e.target.value)}}
                />
                <Form.Check
                type="radio"
                id="term_of_use"
                label="Срок использования 2-3 года"
                style={{fontSize: 14}}
                className='mx-3'
                checked={choose === '2'}
                onChange={(e)=>{setChoose(e.target.value)}}
                value={'2'}
                />
                <Form.Check
                type="radio"
                id="term_of_use"
                label="Срок использования более 3 года"
                style={{fontSize: 14}}
                className='mx-3'
                checked={choose === '3'}
                onChange={(e)=>{setChoose(e.target.value)}}
                value={'3'}
                />
                <Form.Check
                type="checkbox"
                label="Есть царапины"
                style={{fontSize: 14}}
                className='mx-3'
                onChange={(e)=>{setIsChecked2(e.target.value)}}
                value={isChecked2}
                />
                <Form.Check
                type="checkbox"
                label="Есть вмятины"
                style={{fontSize: 14}}
                className='mx-3'
                onChange={(e)=>{setIsChecked3(e.target.value)}}
                value={isChecked3}
                />
                <Form.Check
                type="checkbox"
                label="Утопленник"
                style={{fontSize: 14}}
                className='mx-3'
                onChange={(e)=>{setIsChecked4(e.target.value)}}
                value={isChecked4}
                />
                <Form.Check
                type="checkbox"
                label="Были замены аккумулятора"
                style={{fontSize: 14}}
                className='mx-3'
                onChange={(e)=>{setIsChecked5(e.target.value)}}
                value={isChecked5}
                />
                <Form.Check
                type="checkbox"
                label="Есть проблемы со звуком динамиков"
                style={{fontSize: 14}}
                className='mx-3'
                onChange={(e)=>{setIsChecked6(e.target.value)}}
                value={isChecked6}
                />
                <Form.Check
                type="checkbox"
                label="Есть проблемы с экраном"
                style={{fontSize: 14}}
                className='mx-3'
                onChange={(e)=>{setIsChecked7(e.target.value)}}
                value={isChecked7}
                />
                <Row className='mt-3 mb-1'>
                    <Button style={{}} className='mx-5' onClick={CountPrice}>Рассчитать</Button>
                    <p style={{fontSize: 20}} id="total_price"></p>
                </Row>
        </>
    );
});

export default PhoneInfo;