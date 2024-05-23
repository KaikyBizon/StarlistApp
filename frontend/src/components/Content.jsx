import React from "react";
import { Routes, Route } from 'react-router-dom';
import NotFound from "../pages/NotFound";
import { LoginForm } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";
import Gerenciarpart from "../pages/Gerenciarpart";
import Kanban from "../pages/Kanban";
import ToDo from "../pages/ToDo";
import { Home } from "../pages/Home";
import EscolherPlano from "./EscolherPlano";
import TelaCnpj from './TelaCnpj';
import Equipe from './Equipe';
import Forma_pg from './Forma_pg'; 
import GerenciarEquipe from './GerenciarEquipe';
import AlterarDadosCadastro from "../pages/AlterarDadosCadastro";



const Content = props => (
    <main className="Content">
        <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/cadastro" element={<Cadastro />}></Route>
            <Route path="/gerenciarpart" element={<Gerenciarpart />}></Route>
            <Route path="/kanban" element={<Kanban />}></Route>
            <Route path="/todo" element={<ToDo />}></Route> 
            <Route path="/gerenciar-equipe" element={<GerenciarEquipe />}></Route> 
            <Route path="/alterar_dados_cadastro" element={<AlterarDadosCadastro />}></Route>

        </Routes>



        <section className='planos_empresarial'>
            <div className='escolha_plano'>

                <Routes>
                    <Route path="/escolher" element={<EscolherPlano />}></Route>
                    <Route path='/TelaCnpj' element={<TelaCnpj />} />
                    <Route path='/Equipe' element={<Equipe />} />
                    <Route path='/Forma_pg' element={<Forma_pg />} />
                </Routes>
            </div>

        </section>
    </main>
);

export default Content