import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Menu({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

   return (

        <header className="menu">
            {/*logo do menu*/}
            <div className="logo">
                <img src="/public/images/logo_starlist.png" alt="logo" />
            </div>
            {/*barra de pesquisa*/}
            <div className="search">
                <input
                    type="search"
                    name="Pesquisa"
                    id="pesquisar"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <img src="/public/images/lupa.png" alt="lupa" />
            </div>
            {/*icones do menu*/}
            <div className="icones">
                <img src="https://cdn-icons-png.flaticon.com/128/7524/7524806.png" alt="duvidas" />
                <img src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png" alt="sino" />

                {/*botão para alterar os dados do usuário*/}
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="minha-conta" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Link to="/alterar_dados_cadastro">
                            <Dropdown.Item className='alterar_dados' href="#/action-1">Alterar dados</Dropdown.Item>
                        </Link>
                        <Link to='/login'>
                            <Dropdown.Item className='alterar_dados' href="#/action-1">Sair</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <p className='alterar_dados' href="#/action-1">{localStorage.getItem("nome_usuario")}</p>
                    </Dropdown.Menu>

                </Dropdown>
            </div>
        </header>
    )
}
