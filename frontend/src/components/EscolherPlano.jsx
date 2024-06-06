import "../StylesPages/EscolherPlano.css"
import { useNavigate } from 'react-router-dom';


function EscolherPlano() {
  const navigate = useNavigate();

  const TelaCnpj = () => {
    navigate('/TelaCnpj');
  };

  const Forma_pg = () => {
    navigate('/Forma_pg');
  };
  return (
    <div className="selecionar-planos">

      <div className="opcoes-planos">
        <div className="botao-empresarial">
          <button onClick={TelaCnpj} className="botao-planos">Empresarial</button>
        </div>

        <div className="botao-pessoal">
          <button onClick={Forma_pg} className="botao-planos">Pessoal</button>
        </div>
      </div>

      <div className="img-plano">
        <img className="escolher-img" src="../public/images/Calendar-rafiki.png" alt="calendario" />
      </div>
    </div>


  );
}



export default EscolherPlano;