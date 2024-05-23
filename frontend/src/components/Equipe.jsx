import '../Equipe.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function Equipe() {
  const navigate = useNavigate();

  const [value, setValue] = useState(null);
  const handleChange = (val) => setValue(val);

  const Forma_pg = () => {
    navigate('/Forma_pg');
  };

  return (
    <div className='container-equipe'>
      <ToggleButtonGroup className='container-botoesequipe' type="radio" name="options" value={value} onChange={handleChange}>
        <div className="botoes-linha">
          <ToggleButton className={`botoes-participantes ${value === 1 ? 'selected' : ''}`} id="tbg-btn-1" value={1}>
            2----5
          </ToggleButton>

          <ToggleButton className={`botoes-participantes ${value === 2 ? 'selected' : ''}`} id="tbg-btn-2" value={2}>
            16----30
          </ToggleButton>
        </div>
        <div className="botoes-linha">
          <ToggleButton className={`botoes-participantes ${value === 3 ? 'selected' : ''}`} id="tbg-btn-3" value={3}>
            6----15
          </ToggleButton>

          <ToggleButton className={`botoes-participantes ${value === 4 ? 'selected' : ''}`} id="tbg-btn-4" value={4}>
            30----50
          </ToggleButton>
        </div>

        <div className='botao_equipe'>
          <button onClick={Forma_pg} className='botao-equipe'>Continuar</button>
        </div>
      </ToggleButtonGroup>
      <img className='escolher-img' src="../public/images/Schedule-bro.png" alt="" />
    </div>
  );
}

export default Equipe;
