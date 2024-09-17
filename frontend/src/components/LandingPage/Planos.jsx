import './Planos.css';
import { Link } from 'react-router-dom';
function Planos() {
    return (
        <>
            <section className="planos">
                <h1>PLANOS</h1>
                <div className="tabela-preco" >
                    <div className="card-preco-div" >

                        <h3 className="card-preco-header">Gratuito</h3>

                        <div className="preco"><sup>R$</sup>0<span>Mês</span></div>

                        <ul className="preco-ul">

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'><strong>5</strong> projetos ativos;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'><strong>5</strong> colaboradores por projeto;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'><strong>5MB</strong> de carregamento de arquivos;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'><strong>1</strong> semana de histórico de atividades;</li>

                            <li className='card-preco'></li> <br /> <br /> <br /><br />
                        </ul>

                        <Link to="/cadastro" id="cadastro-btn">
                            <li className="queroplano">Cadastre-se</li>
                        </Link>


                    </div >




                    <div className="card-preco-div">

                        <h3 className="card-preco-header">Mensal</h3>

                        <div className="preco"><sup>R$</sup>15<span>Mês</span></div>

                        <ul className="preco-ul">

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>TUDO DO GRATUITO E MAIS:</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Quadros e campos personalizados</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Armazenamento ilimitado;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'><strong>1.000</strong> exeuções de comandos;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Convidados de quadro único;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Sem publicidade</li>

                            <br />
                        </ul>
                        <a href="#" className="queroplano">Quero este plano</a>
                    </div>

                    <div className="card-preco-div">
                        <h3 className="card-preco-header">Anual</h3>
                        <div className="preco"><sup>R$</sup>150<span>Anual</span></div>
                        <ul className="preco-ul">
                            <img className="check-in" src="/public/images/check-list.png" />
                            <li className='card-preco'>TUDO DO MENSAL E MAIS:</li><br />
                            <img className="check-in" src="/public/images/check-list.png" />
                            <li className='card-preco'>Visualizações: Cronograma e painel;</li><br />
                            <img className="check-in" src="/public/images/check-list.png" />
                            <li className='card-preco'>Visualização da Área de Trabalho;</li><br />
                            <img className="check-in" src="/public/images/check-list.png" />
                            <li className='card-preco'>Execuções ilimitadas de comandos;</li><br />
                            <img className="check-in" src="/public/images/check-list.png" />
                            <li className='card-preco'>Funcionalidade de administração;</li><br />
                            <img className="check-in" src="/public/images/check-list.png" />
                            <li className='card-preco'>Suporte prioritário;</li>
                        </ul>
                        <a href="#" className="queroplano">Quero este plano</a>
                    </div>



                    <div className="card-preco-div">

                        <h3 className="card-preco-header">Empresarial</h3>

                        <div className="preco"><sup>R$</sup>500<span>Anual</span></div>

                        <ul className="preco-ul">

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Áreas de Trabalho ilimitadas;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Permissões para toda empresa;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Quadro vísiveis da empresa;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Gerenciamento de quadro público;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Convidados de mais de um quadro;</li><br />

                            <img className="check-in" src="/public/images/check-list.png" />

                            <li className='card-preco'>Administração de power-ups;</li>
                        </ul>

                        <a href="#" className="queroplano">Quero este plano</a>
                    </div>
                </div >
            </section >
            
        </>
    )
}

export { Planos };