import Cardgerenciar from "../components/Cardgerenciar"
import Menu from '../components/menu';
import Options from '../components/Options';
import '../StylesPages/gerenciarpart.css'

function Gerenciarpart() {
    return (
        <>
            <Menu />
            <Options />
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