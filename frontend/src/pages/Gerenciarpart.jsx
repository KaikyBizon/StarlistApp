import Cardgerenciar from "../components/Cardgerenciar"
import Cabecalho from "../components/Cabecalho";
import '../StylesPages/gerenciarpart.css'

function Gerenciarpart() {
    return (
        <>
            <Cabecalho/>
            <section id="gerenciar-part">
                <div id="title-gerenciar">
                    <h1>Gerenciar participantes</h1>
                </div>
                <div className="cards-gerenciar">
                    <Cardgerenciar />
                    <Cardgerenciar />
                    <Cardgerenciar />
                    <Cardgerenciar />
                </div>
            </section>
        </>
    )
}
export default Gerenciarpart;