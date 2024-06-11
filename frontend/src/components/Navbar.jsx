export default function Navbar() {
    return (
        <header className="menu">
            {/*logo do menu*/}
            <div className="logo">
                <img src="/public/images/logo_starlist.png" alt="logo" />
            </div>
            {/*barra de pesquisa*/}
            <div className="search">
                <input type="search" name="Pesquisa" id="pesquisar" placeholder="Buscar" />
                <img src="/public/images/lupa.png" alt="lupa" />
            </div>
            {/*icones do menu*/}
            <div className="icones">
                <img src="https://cdn-icons-png.flaticon.com/128/7524/7524806.png" alt="duvidas" />
                <img src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png" alt="sino" />
                <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="minha-conta" />
            </div>
        </header>
    )
} 