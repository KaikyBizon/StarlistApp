import '../components/Conheca.css'
function Conheca() {
    return (
        <>
            <section id="conhecer">
                <h1>Conheça-nos</h1>
                <div className="conhecer-grid">
                    <div className="conhecer-cards">
                        <h2>Suporte</h2>
                        <p className="explicação">Ajuda e suporte 24h para auxiliar <br /> nas suas dúvidas e problemas</p>
                        <img className="img-conhecer" src="/public/images/Suporte.png" alt="" />
                    </div>

                    <div className="conhecer-cards">
                        <h2>Utilidades</h2>
                        <p className="explicação">Te ajuda no planejamento, <br />organização e gerenciamento das <br />suas ideias com
                            o principal foco <br /> em te ajudar a aproveitar <br /> melhor seu tempo. </p>
                        <img className="img-conhecer" src="/public/images/Utilidade.png" alt="" />
                    </div>

                    <div className="conhecer-cards">
                        <h2>Segurança</h2>
                        <p className="explicação">Seus planejamentos e dados <br />protegidos com total segurança</p>
                        <img className="img-conhecer" src="/public/images/seguranca.jpeg" alt="" />
                    </div>


                </div>
            </section>

        </>
    )
}

export { Conheca };