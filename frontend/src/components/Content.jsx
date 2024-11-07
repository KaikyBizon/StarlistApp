/**
 * Nome do Componente: Content
 *
 * Descrição Detalhada:
 *   Componente funcional React responsável pela renderização do conteúdo principal da aplicação,
 *   utilizando o React Router para gerenciar as rotas internas. O componente define as rotas
 *   disponíveis para a navegação, cada uma mapeada para um componente específico que representa
 *   uma página da aplicação.
 *
 * Observações Pertinentes:
 *   1. Utiliza o componente `Routes` do `react-router-dom` para definir as rotas da aplicação.
 *   2. As rotas mapeiam caminhos de URL específicos para seus respectivos componentes, como
 *      `Home`, `LoginForm`, `Cadastro`, `Kanban`, entre outros.
 *   3. Inclui uma rota padrão que renderiza o componente `Home` ao acessar a raiz da aplicação.
 *   4. Se uma rota não for encontrada, um componente `NotFound` pode ser adicionado para lidar
 *      com erros de navegação.
 *
 * Estrutura JSX:
 *   - Renderiza um elemento <main> que contém um conjunto de rotas definidas por meio do componente
 *     `Routes`.
 *     - Cada `<Route>` especifica um caminho (`path`) e o componente a ser renderizado
 *       (`element`) quando a rota correspondente é acessada.
 *
 * Parâmetros de Entrada:
 *   - `props`: Propriedades passadas para o componente, embora não sejam utilizadas diretamente
 *              neste componente específico.
 *
 */

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
import { VerificarEmail } from "../pages/VerificarEmail";

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
            <Route path="/verificarEmail" element={<VerificarEmail />}></Route>
        </Routes>
    </main>
);

export default Content