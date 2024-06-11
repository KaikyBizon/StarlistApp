import Parcelamento from "./Parcelas"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import '../StylesPages/Forma_pg.css'

function Forma_pg() {
    const navigate = useNavigate();

    const [value, setValue] = useState(null);
    const handleChange = (val) => setValue(val);

    const Kanban = () => {
        navigate('/kanban');
    };

    return (
        <div className="forma_pagar">
            <div className="container-pay">
                <h1 className="pagar_titulo">Como você deseja pagar?</h1>

                    <div className="pagar_botoes">
                        <ToggleButtonGroup name="payment-options" type="radio" value={value} onChange={handleChange}>
                            <ToggleButton className={`pagar_botao ${value === 1 ? 'selected' : ''}`} id="tbg-btn-1" value={1}>
                                Débito
                            </ToggleButton>

                            <ToggleButton className={`pagar_botao ${value === 2 ? 'selected' : ''}`} id="tbg-btn-2" value={2}>
                                Crédito
                            </ToggleButton>

                            <ToggleButton className={`pagar_botao ${value === 3 ? 'selected' : ''}`} id="tbg-btn-3" value={3}>
                                Pix
                            </ToggleButton>

                            <ToggleButton className={`pagar_botao ${value === 4 ? 'selected' : ''}`} id="tbg-btn-4" value={4}>
                                Boleto
                            </ToggleButton>
                        </ToggleButtonGroup>

                    </div>
                    <Parcelamento />


                    <div className='botao_compra'>
                        <button onClick={Kanban} className='finalizar_compra'>Finalizar compra</button>
                    </div>

            </div>
            <img className="escolher-img" src="../public/images/img-pay.png" alt="" />
        </div>

    )
}

export default Forma_pg;
