import Card from 'react-bootstrap/Card';
import Geral from '../components/Geral';
import Menu from '../components/Menu';
import Options from '../components/Options';
import '/src/kanban.css'

function Kanban() {
    return (
        <>
            <Menu />
            <Options />
            <section className='interacao'>

                <section className='calendario-left'>
                    <Geral />
                </section>
                <section className='cartoes-kanban'>
                    <section className="status-kanban">
                        <p className='status-tarefa'>A fazer</p>
                        <div className="kanban">
                            <Card.Body>
                                <Card.Title className='title-cardkanban'> Card Title </Card.Title>
                                <Card.Text className='text-cardkanban'>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Link href='#'>Anexar link</Card.Link>
                                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                            </Card.Body>
                        </div>
                    </section>
                    <section className="status-kanban">
                        <p className='status-tarefa'>A fazer</p>
                        <div className="kanban">
                            <Card.Body>
                                <Card.Title className='title-cardkanban'> Card Title </Card.Title>
                                <Card.Text className='text-cardkanban'>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Link href='#'>Anexar link</Card.Link>
                                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                            </Card.Body>
                        </div>
                    </section>
                    <section className="status-kanban">
                        <p className='status-tarefa'>A fazer</p>
                        <div className="kanban">
                            <Card.Body>
                                <Card.Title className='title-cardkanban'> Card Title </Card.Title>
                                <Card.Text className='text-cardkanban'>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Link href='#'>Anexar link</Card.Link>
                                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                            </Card.Body>
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
}

export default Kanban;