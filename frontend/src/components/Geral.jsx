import Calendario from "../components/Calendario"
function Geral() {
    return (

        <div className="taskArea">
            {/*Imagem do calendário*/}
            <div>
                <Calendario />
            </div>
            {/*Opção para criar nova etiqueta*/}
            <div className="edit-classificacao">
                <img src="/public/lapis.png" alt="lapis" />
                <p>Criar nova etiqueta</p>
            </div>
            {/*botões de etiquetas*/}
            <div className="button">
                <button className="colorButtonRed" type="submit"> Importante</button>
                <button className="colorButtonOrange" type="submit"> Pendências</button>
                <button className="colorButtonGreen" type="submit"> Concluídos</button>
                <button className="colorButtonPurple" type="submit"> Reunião</button>
            </div>
        </div>


    )
}

export default Geral;