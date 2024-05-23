import '../components/Rodape.css'
function Rodape() {
    return (
        <>
            <footer className="rodape-3">
                <div className="rodape">
                    <div className="rodape-5">
                        <p>Venha fazer parte da nossa comunidade</p>
                        <p>Seus planejamentos do seu jeito!!</p>
                    </div>



                    <div className="rodape-4">
                        <div className="para você">
                            <h3>Para Você</h3>
                        </div>

                        <div className="rodape-1">
                            <a href="#avl">
                                <p>Avaliações</p>
                            </a>
                            <a href="#suporte">
                                <p>Ajuda</p>
                            </a>
                        </div>
                    </div>

                    <div className="contato">
                        <h3>Contatos</h3>

                        <div className="rodape-2">
                            <a href="https://www.whatsapp.com/?lang=pt_br" target="_blank">
                                <img className='redes-sociais' src="/public/images/whatsapp.png" alt="whatsapp" />
                            </a>

                            <a href="https://www.instagram.com" target="_blank">
                                <img className='redes-sociais' src="/public/images/instagram.png" alt="instagram" />
                            </a>

                            <a href="https://pt-br.facebook.com" target="_blank">
                                <img className='redes-sociais' src="/public/images/facebook.png" alt="facebook" />
                            </a>
                        </div>
                    </div>


                </div>
            </footer>

        </>
    )
}

export { Rodape };