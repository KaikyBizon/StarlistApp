-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/08/2024 às 17:16
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `starlist`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `equipe`
--

CREATE TABLE `equipe` (
  `ID` int(6) NOT NULL,
  `NOME_EQUIPE` varchar(50) NOT NULL,
  `PESSOA_EQUIPE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `equipe`
--

INSERT INTO `equipe` (`ID`, `NOME_EQUIPE`, `PESSOA_EQUIPE`) VALUES
(1, 'STARLIST', '6');

-- --------------------------------------------------------

--
-- Estrutura para tabela `equipe_quadro`
--

CREATE TABLE `equipe_quadro` (
  `ID` int(6) NOT NULL,
  `ID_TAREFA` int(6) DEFAULT NULL,
  `STATUS_QUADRO` varchar(20) DEFAULT NULL,
  `COLAB_TAREFA` varchar(50) DEFAULT NULL,
  `DATA_TAREFA` date DEFAULT NULL,
  `PROGRESSO` int(3) DEFAULT NULL,
  `ID_USUARIO` int(6) DEFAULT NULL,
  `ID_EQUIPE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `histor_pag`
--

CREATE TABLE `histor_pag` (
  `ID` int(6) NOT NULL,
  `ID_PAGAMENTO` int(6) DEFAULT NULL,
  `DATA_PAGAMENTO` date DEFAULT NULL,
  `VALOR_PAGAMENTO` decimal(4,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `histor_pag`
--

INSERT INTO `histor_pag` (`ID`, `ID_PAGAMENTO`, `DATA_PAGAMENTO`, `VALOR_PAGAMENTO`) VALUES
(1, 1, '2024-08-29', 15),
(2, 2, '2024-07-05', 33);

-- --------------------------------------------------------

--
-- Estrutura para tabela `lista`
--

CREATE TABLE `lista` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(50) DEFAULT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `lista`
--

INSERT INTO `lista` (`ID`, `NOME`, `ID_USUARIO`) VALUES
(11, 'Estudar', 73),
(12, 'Pendentes', 73),
(13, 'Feitas', 73),
(14, 'Importantes', 75),
(15, 'Atrasadas', 75),
(18, 'Feito', 75),
(19, 'Pendentes', 75),
(20, 'dwadwad', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamento`
--

CREATE TABLE `pagamento` (
  `ID` int(6) NOT NULL,
  `TIPO_PAG` varchar(50) DEFAULT NULL,
  `ID_USUARIO` int(6) DEFAULT NULL,
  `CPF` varchar(12) DEFAULT NULL,
  `NOME_TITULAR` varchar(100) DEFAULT NULL,
  `NUMERO_CARTAO` varchar(16) DEFAULT NULL,
  `CVV` int(3) DEFAULT NULL,
  `DATA_VENCIMENTO` varchar(5) DEFAULT NULL,
  `QTD_PARCELAS` int(2) DEFAULT NULL,
  `ID_PLANO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `pagamento`
--

INSERT INTO `pagamento` (`ID`, `TIPO_PAG`, `ID_USUARIO`, `CPF`, `NOME_TITULAR`, `NUMERO_CARTAO`, `CVV`, `DATA_VENCIMENTO`, `QTD_PARCELAS`, `ID_PLANO`) VALUES
(1, 'PIX', 1, '11100012100', 'Thaina Alexandre', '0123456789101112', 333, '08/27', 1, 2),
(2, 'Cartão de crédito', 2, '44455533309', 'Leticia Soares', '0987654321919293', 777, '05/25', 9, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `plano`
--

CREATE TABLE `plano` (
  `ID` int(6) NOT NULL,
  `NOME_PLANO` varchar(50) NOT NULL,
  `VALOR_PAGAMENTO` decimal(4,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `plano`
--

INSERT INTO `plano` (`ID`, `NOME_PLANO`, `VALOR_PAGAMENTO`) VALUES
(1, 'Gratuito', 0),
(2, 'Mensal', 15),
(3, 'Anual', 150),
(4, 'Empresarial', 300);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefa`
--

CREATE TABLE `tarefa` (
  `ID` int(6) NOT NULL,
  `DATA_TASK` date DEFAULT NULL,
  `TITULO` varchar(100) DEFAULT NULL,
  `ETIQUETA` varchar(20) DEFAULT NULL,
  `TEXTO` text DEFAULT NULL,
  `AUTOR` varchar(50) DEFAULT NULL,
  `ANEXO` tinytext DEFAULT NULL,
  `ID_USUARIO` int(6) DEFAULT NULL,
  `HORA` time DEFAULT NULL,
  `ID_LISTA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tarefa`
--

INSERT INTO `tarefa` (`ID`, `DATA_TASK`, `TITULO`, `ETIQUETA`, `TEXTO`, `AUTOR`, `ANEXO`, `ID_USUARIO`, `HORA`, `ID_LISTA`) VALUES
(1, '2024-02-22', 'Aula SENAI', 'IMPORTANTE', 'Banco de Dados', 'thaina', 'devmedia', 1, '10:00:00', NULL),
(2, '2024-03-21', 'Médico', 'IMPORTANTE', 'Médico-Dermatologista', 'leticia', 'Endereço', 2, '10:00:00', NULL),
(4, '2024-02-29', 'Estudar para o exame de matemática', 'IMPORTANTE', 'TEM QUE FAZER', 'KAIKY', 'HTTPS/', 3, '10:00:00', NULL),
(5, '2024-02-23', 'Fazer compras no supermercado', 'IMPORTANTE', 'TEM QUE FAZER', 'NATHAN', 'HTTPS//.', 4, '15:30:00', NULL),
(6, '2024-02-24', 'Preparar uma apresentação para o trabalho', 'MÉDIO', 'TEM QUE FAZER', 'GABRIEL', 'HTTP//', 5, '14:00:00', NULL),
(7, '2024-03-05', 'Correr por 30 minutos', 'BAIXA IMPORTÂNCIA', 'TEM QUE FAZER', 'NATHAN', 'HTTPS/', 6, '18:00:00', NULL),
(8, '2024-04-23', 'Ler 2 capítulos do livro atual', 'MÉDIA IMPORTÂNCIA', 'TEM QUE FAZER', 'DAVI', 'HTTPS/.', 7, '20:00:00', NULL),
(9, '2024-04-25', 'Agendar uma consulta médica', 'URGENTE', 'TEM QUE FAZER', 'LETICIA', 'HTTPS//', 8, '11:30:00', NULL),
(10, '2024-02-24', 'Enviar e-mails de acompanhamento aos clientes', 'MUITO IMPORTANTE', 'TEM QUE FAZER', 'KAIKY', 'HTTP/', 9, '09:00:00', NULL),
(11, '2024-02-23', 'Aprender uma nova receita de culinária', 'BAIXA IMPORTÂNCIA', 'TEM QUE FAZER', 'GABRIEL', 'HTTPS/', 10, '17:00:00', NULL),
(12, '2024-02-22', 'Limpar o quarto', 'IMPORTANTE', 'TEM QUE FAZER', 'THAINA', 'HTTPS//', 11, '14:00:00', NULL),
(13, '2024-02-25', 'Planejar férias de verão', 'MÉDIA IMPORTÂNCIA', 'TEM QUE FAZER', 'THAINA', 'HTTPS//', 12, '16:00:00', NULL),
(14, '2024-08-13', 'Matematica', 'MUITO IMPORTANTE', 'TEM QUE FAZER', 'Leticia', 'HTTP://', 75, '09:41:43', 11),
(15, '2024-08-21', 'Kanban', 'MUITO IMPORTANTE', 'TEM QUE FAZER', 'Thaina', 'HTTP://', 75, '10:43:42', 12),
(16, '2024-08-27', 'Apresentação', 'MÉDIA IMPORTÂNCIA', NULL, 'Leticia', 'HTTP://', 75, '09:34:48', 12),
(17, '2024-08-04', 'Cadastro', 'IMPORTANTE', 'FEITO', 'Leticia', 'HTTP://', 75, '16:47:12', 13),
(18, '2024-08-31', 'Finalizar projeto', 'MUITO IMPORTANTE', 'A FAZER', 'Thaina', 'HTTP://', 75, '16:30:30', 14),
(19, '2024-08-06', 'Biologia', 'BAIXA IMPORTÂNCIA', 'FEITO', 'Leticia', 'HTTP://', 75, '00:50:36', 13),
(21, '2024-08-27', 'Português', 'MÉDIA IMPORTÂNCIA', 'A fazer', 'Thaina', 'HTTP://', 75, '15:51:46', 11),
(22, '2024-08-31', 'Psiquiatra', 'MUITO IMPORTANTE', 'A fazer', 'Thaina', 'HTTP://', 75, '16:00:00', 14),
(24, '2024-10-05', 'Viagem Floripa', 'MUITO IMPORTANTE', 'A fazer', 'Thaina', 'HTTP://', 75, '03:30:15', 14),
(25, '2024-09-12', 'Retorno viagem', 'MUITO IMPORTANTE', 'A fazer', 'Leticia', 'HTTP://', 75, '23:55:29', 14),
(26, '2024-12-01', 'Férias', 'MUITO IMPORTANTE', 'A fazer', 'Leticia', 'HTTP://', 75, '00:00:00', 12),
(27, '2024-08-24', 'Retorno médico', 'MÉDIA IMPORTÂNCIA', 'A fazer', 'Thaina', 'HTTP://', 75, '14:00:53', 14),
(28, '2024-11-15', 'Entrega do projeto', 'MUITO IMPORTANTE', 'A fazer', 'Leticia', 'HTTP://', 75, '10:00:12', 12),
(29, '2024-08-23', 'Calendário', 'IMPORTANTE', 'A fazer', 'Thaina', 'HTTP://', 75, '11:02:02', 12),
(30, '2024-08-04', 'SENAI', 'MUITO IMPORTANTE', 'A fazer', 'Thaina', 'HTTP://', 75, '08:38:00', 11),
(31, '2024-11-14', 'Ingles', 'BAIXA IMPORTÂNCIA', 'A fazer', 'Thaina', 'HTTP://', 75, '17:39:00', 11),
(32, '2024-09-22', 'História', 'BAIXA IMPORTÂNCIA', 'A fazer', 'Thaina', 'HTTP://', 75, '09:40:00', 11),
(33, '2024-08-01', 'CRUD Login', 'IMPORTANTE', 'FEITO', 'Leticia', 'HTTP://', 75, '15:05:55', 13),
(34, '2024-06-26', 'CSS Pagamento', 'BAIXA IMPORTÂNCIA', 'FEITO', 'Thaina', 'HTTP://', 70, '09:41:43', 13),
(35, '2024-07-31', 'Pagamento Viagem', 'MÉDIA IMPORTÂNCIA', 'FEITO', 'Leticia', 'HTTP://', 75, '11:11:00', 13),
(51, '2024-08-05', 'Slide apresentação', 'IMPORTANTE', 'Feito', 'Thaina', NULL, 75, '17:20:00', 14),
(52, '2024-08-20', 'CRUD', 'BAIXA IMPORTÂNCIA', 'Importante', NULL, NULL, 75, '22:11:00', 15),
(53, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(54, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(55, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(56, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(57, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(58, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(59, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(60, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(61, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(62, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(63, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(64, '0000-00-00', '', '', '', NULL, NULL, 75, '00:00:00', NULL),
(65, '0000-00-00', '', '', '', NULL, NULL, 75, '00:00:00', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(6) NOT NULL,
  `DATA_NASC` date DEFAULT NULL,
  `NOME_USUARIO` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `SENHA` varchar(20) DEFAULT NULL,
  `CNPJ` varchar(18) NOT NULL,
  `CARGO` varchar(20) NOT NULL,
  `ID_EQUIPE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`ID`, `DATA_NASC`, `NOME_USUARIO`, `EMAIL`, `SENHA`, `CNPJ`, `CARGO`, `ID_EQUIPE`) VALUES
(1, '2007-05-22', 'thaina', 'thaina@gmail.com', 'thain@', '', '', 1),
(2, '2007-06-05', 'leticia', 'leticia@gmail.com', 'letici@', '', '', 1),
(3, '2001-08-23', 'Carlos Germano', 'germano@gmail.com', 'Carlos@123', '', '', 1),
(4, '2007-05-04', 'Matheus Claus', 'matheusc@outlook.com', 'Matheus@123', '', '', 1),
(5, '1999-11-22', 'João Schimidt', 'joaosch@gmail.com', 'João@123', '', '', 1),
(6, '1987-09-27', 'junior silva', 'junior@gmail.com', 'Gabriel@123', '', '', 1),
(7, '2004-09-17', 'Manoel Giga', 'giga@outlook.com', 'Manoel@123', '', '', 1),
(8, '1986-02-01', 'Fábio Balestrin', 'balestrinfabio@gmail.com', 'Fábio@123', '', '', 1),
(9, '2003-12-21', 'Júlio Cariani', 'jcariani@gmail.com', 'Julio@123', '', '', 1),
(10, '1990-04-29', 'Ramon Bumbstead', 'ramonbum@gmil.com', 'Ramon@123', '', '', 1),
(11, '2000-08-03', 'Chris Dino', 'dinochris@gmail.com', 'Chris@123', '', '', 1),
(12, '2002-08-15', 'Paulo Roberto', 'proberto@outlook.com', 'Paulo@123', '', '', 1),
(70, '2007-06-05', 'leticia bueno soares', 'leticiabuenosoares.lb@gmail.com', 'Leticia@123', '', '', 1),
(71, '2007-06-05', 'leticia bueno soares', 'leticiabuenosoares.lb@gmail.com', 'Leticia@123', '', '', 1),
(72, '2008-07-22', 'leticia bueno', 'leticia.soares2@aluno.senai.br', 'Leticia@123', '', '', 1),
(73, '2006-06-14', 'sueli de souza', 'suelithaina@gmail.com', 'Leticia@123', '', '', 1),
(74, '2006-06-14', 'sueli de souza', 'suelithaina@gmail.com', 'Leticia@123', '', '', 1),
(75, '2004-01-03', 'leticia soares', 'leticia@gmail.com', 'Leticia@123', '', '', 1),
(76, '2007-03-28', 'carlos pereira', 'carlospereira@gmail.com', 'Carlos@123', '', '', 1),
(77, '2004-06-30', 'Leandro Barbosa', 'leandrobarbosa@gmail.com', 'Leandro@123', '', '', 1),
(78, '2006-05-18', 'Julia Cardoso', 'juliacardoso@gmail.com', 'Julia@123', '', '', 1),
(79, '1960-12-14', 'Eduardo Costa', 'eduardocosta@gmail.com', 'Eduardo@123', '', '', 1),
(80, '2006-09-18', 'Junior Garcia', 'juniorgarcia@gmail.com', 'Junior@123', '', '', 1),
(81, '2006-02-17', 'Jorge Batista', 'jorge@gmail.com', 'Jorge@123', '', '', 1),
(82, '2002-10-09', 'Jorge Souza', 'jorge@gmail.com', 'Jorge@123', '', '', 1),
(83, '2004-10-15', 'Jorge Souza', 'jorge@gmail.com', 'Jorge@123', '', '', 1),
(84, '2004-08-10', 'Ricardo Silva', 'ricardo@gmail.com', 'Ricardo@123', '', '', 1),
(85, '2008-04-25', 'Paulo Silva', 'paulo@gmail.com', 'Paulo@123', '', '', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `equipe`
--
ALTER TABLE `equipe`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `equipe_quadro`
--
ALTER TABLE `equipe_quadro`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_TAREFA` (`ID_TAREFA`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`),
  ADD KEY `ID_EQUIPE` (`ID_EQUIPE`);

--
-- Índices de tabela `histor_pag`
--
ALTER TABLE `histor_pag`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_PAGAMENTO` (`ID_PAGAMENTO`);

--
-- Índices de tabela `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Índices de tabela `pagamento`
--
ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`),
  ADD KEY `ID_PLANO` (`ID_PLANO`);

--
-- Índices de tabela `plano`
--
ALTER TABLE `plano`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `tarefa`
--
ALTER TABLE `tarefa`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`),
  ADD KEY `ID_LISTA` (`ID_LISTA`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_EQUIPE` (`ID_EQUIPE`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `equipe`
--
ALTER TABLE `equipe`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `equipe_quadro`
--
ALTER TABLE `equipe_quadro`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `histor_pag`
--
ALTER TABLE `histor_pag`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `lista`
--
ALTER TABLE `lista`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `pagamento`
--
ALTER TABLE `pagamento`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `plano`
--
ALTER TABLE `plano`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tarefa`
--
ALTER TABLE `tarefa`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `equipe_quadro`
--
ALTER TABLE `equipe_quadro`
  ADD CONSTRAINT `equipe_quadro_ibfk_1` FOREIGN KEY (`ID_TAREFA`) REFERENCES `tarefa` (`ID`),
  ADD CONSTRAINT `equipe_quadro_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `equipe_quadro_ibfk_3` FOREIGN KEY (`ID_EQUIPE`) REFERENCES `equipe` (`ID`);

--
-- Restrições para tabelas `histor_pag`
--
ALTER TABLE `histor_pag`
  ADD CONSTRAINT `histor_pag_ibfk_1` FOREIGN KEY (`ID_PAGAMENTO`) REFERENCES `pagamento` (`ID`);

--
-- Restrições para tabelas `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `lista_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`);

--
-- Restrições para tabelas `pagamento`
--
ALTER TABLE `pagamento`
  ADD CONSTRAINT `pagamento_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `pagamento_ibfk_2` FOREIGN KEY (`ID_PLANO`) REFERENCES `plano` (`ID`);

--
-- Restrições para tabelas `tarefa`
--
ALTER TABLE `tarefa`
  ADD CONSTRAINT `tarefa_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `tarefa_ibfk_2` FOREIGN KEY (`ID_LISTA`) REFERENCES `lista` (`ID`);

--
-- Restrições para tabelas `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_EQUIPE`) REFERENCES `equipe` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
