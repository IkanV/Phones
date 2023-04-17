import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useHistory} from "react-router-dom";

import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('email is empty');
    const [passwordError, setPasswordError] = useState('Password is empty');

    const BlurHandler = (e) => {

        switch (e.target.value) {
            case 'email' :
                setEmailDirty(true)
                break
            case 'password' :
                setPasswordDirty(true)
                break
        }
    } 

    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password)
            }
            user.setUser(data);
            user.setIsAuth(true);
            alert();
            history.push(SHOP_ROUTE);
        } catch (e) {
            if(e.response.data.errors[0]){
                let messagee = '';
                for(let i = 0; i < e.response.data.errors.length; i++){
                    messagee += e.response.data.errors[i].msg + '\n'
                }
                document.getElementById("error").innerHTML = messagee;
            document.getElementById("error").style.color = "red";
            }else{
                alert(e.response.data.message);
            }
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Input your email..."
                        {...(emailDirty && emailError) && <div color='red'>{emailError}</div>}
                        onBlur = {e => BlurHandler(e)}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Input password..."
                        {...(passwordDirty && passwordError) && <div color='red'>{passwordError}</div>}
                        onBlur = {e => BlurHandler(e)}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <p style={{fontSize: 20}} id="error"></p>
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3 align-items-center">
                        {isLogin ?
                            <div>
                                Haven't account? <NavLink to={REGISTRATION_ROUTE}>Regisrt</NavLink>
                            </div>
                            :
                            <div>
                                Has account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                            </div>
                        }

                        <Button
                            className="align-self-end"
                            variant="outline-success"
                            onClick={click}
                        >
                            {isLogin ? "Login" : "Registration"}
                        </Button>
                    </Row>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;
