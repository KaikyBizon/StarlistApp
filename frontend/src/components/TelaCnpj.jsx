import "../TelaCnpj.css"
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import Calendar from '/public/images/Calendar-rafiki.png'

function TelaCnpj() {

  const navigate = useNavigate();

  const Equipe = () => {
    navigate('/Equipe');
  };

  return (
    <>
      <section className="container-telacnpj">
        <Form className="cnpj">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Digite o CNPJ da sua empresa</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Não tenho CNPJ" />
          </Form.Group>
          <Button onClick={Equipe} className="botao_cnpj" variant="primary" type="submit">
            Continuar
          </Button>
        </Form>
        <img id="telacnpj-img" src={Calendar} />
      </section>
    </>
  );
}

export default TelaCnpj;
