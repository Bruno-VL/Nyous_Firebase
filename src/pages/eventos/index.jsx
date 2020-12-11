import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import { db } from '../../utils/firebaseConfig'

const CrudEventos = () => {
    const [ id, setId ] = useState(0);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        listarEventos();
    }, [])

    const listarEventos = () => {
        try {
            db.collection("eventos")
                .get()
                .then(result => {
                    console.log(result.docs);
                    const data = result.docs.map(doc => {
                        return {
                            id : doc.id,
                            nome : doc.data().nome,
                            descricao : doc.data().descricao
                        }
                    })
                    setEventos(data);

                    limparCampos();
                    })
                .catch(error => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
        }
    }

    const salvar = (event) => {
        event.preventDefault();

        const evento = {
            nome : nome,
            descricao : descricao
        }

        if (id === 0){
            db.collection('eventos')
            .add(evento)
            .then(() => {
                alert('Evento cadastrado');
                listarEventos();
            })
            .catch(error => console.error(error));
        } else {
            db.collection('eventos')
            .doc(id)
            .set(evento)
            .then(() => {
                alert('Evento atualizado')
            })
        }
        listarEventos();
        limparCampos();
    } 
    const remover = (event) => {
        event.preventDefault();

        try {
            db.collection('eventos')
            .doc(event.target.value)
            .delete()
            .then(() => {
                alert('Evento excluido')
                listarEventos()
            })
            
        } catch (error) {
            console.error(error)
        }
    } 
    const editar = (event) => {
        event.preventDefault();

        try {
            db.collection('eventos')
            .doc(event.target.value)
            .get()
            .then(doc => {
                setId(doc.id)
                setNome(doc.data().nome)
                setDescricao(doc.data().descricao)
            })
        } catch (error) {
            console.error(error)
        }
    } 
    
    const limparCampos = () => {
        setId(0);
        setNome('');
        setDescricao('');
    }

    return (
        <div>
            <Container>
                <h1>Eventos</h1>
                <p>Gerenciar eventos</p>
                <Card>
                        <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} />
                            </Form.Group>
                            
                            <Form.Group controlId="formDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)} />
                            </Form.Group>

                            <Button variant="info" type="submit" >Salvar</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventos.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.nome}</td>
                                            <td>{item.descricao}</td>
                                            <td>
                                                <Button type="button" variant="warning" value={item.id} onClick={ event => editar(event)}>Editar</Button>
                                                <Button type="button" variant="danger" value={item.id} style={{ marginLeft : '30px'}} onClick={ event => remover(event)}>Remover</Button>
                                            </td>
                                        </tr>
                                    )
                                    })
                                }
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
            </Container>
        </div>
    )
}

export default CrudEventos; 