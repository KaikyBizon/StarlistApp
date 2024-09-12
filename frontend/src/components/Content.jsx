import React from "react";
import { Routes, Route } from 'react-router-dom';
import NotFound from "../pages/NotFound";
import { LoginForm } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";
import Gerenciarpart from "../pages/Gerenciarpart";
import Kanban from "../pages/Kanban";
import ToDo from "../pages/ToDo";
import { Home } from "../pages/Home";
import GerenciarEquipe from './GerenciarEquipe';
import AlterarDadosCadastro from "../pages/AlterarDadosCadastro";
import Pagamento from "../pages/Pagamento";
import { CadastroEmpresarial } from "../pages/CadastroEmpresarial";

const Content = props => (
    <main className="Content">
        <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/cadastro" element={<Cadastro />}></Route>
            <Route path="/cadastroempresarial" element={<CadastroEmpresarial/>}></Route>
            <Route path="/pagamento" element={<Pagamento/>}></Route>
            <Route path="/gerenciarpart" element={<Gerenciarpart />}></Route>
            <Route path="/kanban" element={<Kanban />}></Route>
            <Route path="/todo" element={<ToDo />}></Route> 
            <Route path="/gerenciar-equipe" element={<GerenciarEquipe />}></Route> 
            <Route path="/alterar_dados_cadastro" element={<AlterarDadosCadastro />}></Route>

        </Routes>
    </main>
);

export default Content