import React from 'react';
import Geral from '../components/Geral';
import Menu from '../components/menu';
import Options from '../components/Options';
import Card from 'react-bootstrap/Card'; // Import the Card component
import '../StylesPages/todo.css';

function ToDo() {
    return (
        <>
            <Menu />
            <Options />
            <section className='interacao'>

                <section className='calendario-left'>
                    <Geral />
                </section>
                <div className="back-cards">
                    {/* Cards de tarefas */}
                    <Card className='cards-tarefa' style={{ width: '1000px' }}>
                        {/* Data da tarefa */}
                        <Card.Header className='colorToday'>Hoje</Card.Header>
                        <Card.Body>
                            <div className='titulo-important'>
                                {/* Titulo da tarefa */}
                                <Card.Title>Fazer lição da escola</Card.Title>
                                {/* Etiqueta do card */}
                                <div className="greenTask"></div>
                            </div>
                            {/* Descrição do card */}
                            <Card.Text className='todo-textcard'>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card className='cards-tarefa' style={{ width: '1000px' }}>
                        <Card.Header className='colorImportant'>26/09/2023</Card.Header>
                        <Card.Body>
                            <div className='titulo-important'>
                                <Card.Title>Lavar louça</Card.Title>
                                <div className="blueTask"></div>
                            </div>
                            <Card.Text className='todo-textcard'>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card className='cards-tarefa' style={{ width: '1000px' }}>
                        <Card.Header className='colorEquip'>26/09/2023</Card.Header>
                        <Card.Body>
                            <div className='titulo-important'>
                                <Card.Title>Limpar casa</Card.Title>
                                <div className="redTask"></div>
                            </div>
                            <Card.Text className='todo-textcard'>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                    <Card className='cards-tarefa' style={{ width: '1000px' }}>
                        <Card.Header className='colorImportant'>30/09/2023</Card.Header>
                        <Card.Body>
                            <div className='titulo-important'>
                                <Card.Title>Lavar roupas</Card.Title>
                                <div className="purpleTask"></div>
                            </div>
                            <Card.Text className='todo-textcard'>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />

                </div>
            </section>
        </>
    );
}

export default ToDo;
