import React, { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import './index.css';
import { useFirebaseApp } from 'reactfire'

const Login = () => {
    const firebase = useFirebaseApp();
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const Logar = (event) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(result => {
            localStorage.setItem('nyous', result.user.refreshToken);
            alert ('Seja bem vindo')
        })
        .catch(error => {
            alert ('Email ou senha incorretos')
            console.error(error)
        })
    }

    return (
            <div>
            <Container className='form-height'>
                  <Form className='form-signin' onSubmit={event => Logar(event)}>
                      <div className='text-center'>
                      </div>
                      <br/>
                      <small>Efetuar Login</small>
                      <hr/>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email </Form.Label>
                          <Form.Control type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Informe o email" required />
                      </Form.Group>
  
                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Senha</Form.Label>
                          <Form.Control type="password" value={senha} onChange={ event => setSenha(event.target.value)} placeholder="Senha"  required/>
                      </Form.Group>
                      <Button variant="info" type="submit">
                          Entrar
                      </Button>
                      <br/><br/>
                      <a href='/cadastrar' style={{ marginTop :'30px'}}>Não tenho conta!</a>
                  </Form>
              </Container>
            </div>
        )
}

export default Login