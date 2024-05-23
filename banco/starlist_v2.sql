-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/03/2024 às 14:50
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
-- Estrutura para tabela `colaboradores`
--

CREATE TABLE `colaboradores` (
  `ID` int(6) NOT NULL,
  `CARGO` varchar(50) DEFAULT NULL,
  `DESCRICAO` varchar(200) DEFAULT NULL,
  `NOME_USUARIO` varchar(50) DEFAULT NULL,
  `ID_EMPRESARIAL` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `colaboradores`
--

INSERT INTO `colaboradores` (`ID`, `CARGO`, `DESCRICAO`, `NOME_USUARIO`, `ID_EMPRESARIAL`) VALUES
(1, 'Gerente', 'XXXXXXXXXXXXXXXXXXX', 'thaina', 1),
(2, 'Coordenador', 'ZZZZZZZZZZZZZZZ', 'leticia', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresarial`
--

CREATE TABLE `empresarial` (
  `ID` int(6) NOT NULL,
  `CNPJ` varchar(20) DEFAULT NULL,
  `PESSOA_EMPRESA` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `empresarial`
--

INSERT INTO `empresarial` (`ID`, `CNPJ`, `PESSOA_EMPRESA`) VALUES
(1, 'XX.XXX.XXX/0001-XX', 10),
(2, 'YY.YYY.YYY/0002-YY', 15),
(3, 'XX.XXX.XXX/0001-XX', 15),
(4, 'XX.XXX.XXX/0001-XX', 10),
(5, 'XX.XXX.XXX/0001-XX', 15),
(6, 'XX.XXX.XXX/0001-XX', 20),
(7, 'XX.XXX.XXX/0001-XX', 30),
(8, 'XX.XXX.XXX/0001-XX', 10),
(9, 'XX.XXX.XXX/0001-XX', 20),
(10, 'XX.XXX.XXX/0001-XX', 25),
(11, 'XX.XXX.XXX/0001-XX', 15),
(12, 'XX.XXX.XXX/0001-XX', 30);

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
  `ID_USUARIO` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `equipe_quadro`
--

INSERT INTO `equipe_quadro` (`ID`, `ID_TAREFA`, `STATUS_QUADRO`, `COLAB_TAREFA`, `DATA_TAREFA`, `PROGRESSO`, `ID_USUARIO`) VALUES
(1, 1, 'EM ANDAMENTO', 'Nenhum', '2024-02-22', 12, 1),
(2, 2, 'PENDENTE', 'Nenhum', '2024-03-21', 50, 2);

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
(1, 1, '2024-03-15', 500),
(2, 2, '2024-03-31', 150);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamento`
--

CREATE TABLE `pagamento` (
  `ID` int(6) NOT NULL,
  `TIPO_PAG` varchar(50) DEFAULT NULL,
  `ID_USUARIO` int(6) DEFAULT NULL,
  `ID_PLANO` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `pagamento`
--

INSERT INTO `pagamento` (`ID`, `TIPO_PAG`, `ID_USUARIO`, `ID_PLANO`) VALUES
(1, 'PIX', 1, 1),
(2, 'Parcelado', 2, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `plano`
--

CREATE TABLE `plano` (
  `ID` int(6) NOT NULL,
  `VALOR_PAGAMENTO` decimal(4,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `plano`
--

INSERT INTO `plano` (`ID`, `VALOR_PAGAMENTO`) VALUES
(1, 500),
(2, 150);

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
  `HORA` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tarefa`
--

INSERT INTO `tarefa` (`ID`, `DATA_TASK`, `TITULO`, `ETIQUETA`, `TEXTO`, `AUTOR`, `ANEXO`, `ID_USUARIO`, `HORA`) VALUES
(1, '2024-02-22', 'Aula SENAI', 'IMPORTANTE', 'Banco de Dados', 'thaina', 'devmedia', 1, '10:00:00'),
(2, '2024-03-21', 'Médico', 'IMPORTANTE', 'Médico-Dermatologista', 'leticia', 'Endereço', 2, '10:00:00'),
(4, '2024-02-29', 'Estudar para o exame de matemática', 'IMPORTANTE', 'TEM QUE FAZER', 'KAIKY', 'HTTPS/', 3, '10:00:00'),
(5, '2024-02-23', 'Fazer compras no supermercado', 'IMPORTANTE', 'TEM QUE FAZER', 'NATHAN', 'HTTPS//.', 4, '15:30:00'),
(6, '2024-02-24', 'Preparar uma apresentação para o trabalho', 'MÉDIO', 'TEM QUE FAZER', 'GABRIEL', 'HTTP//', 5, '14:00:00'),
(7, '2024-03-05', 'Correr por 30 minutos', 'BAIXA IMPORTÂNCIA', 'TEM QUE FAZER', 'NATHAN', 'HTTPS/', 6, '18:00:00'),
(8, '2024-04-23', 'Ler 2 capítulos do livro atual', 'MÉDIA IMPORTÂNCIA', 'TEM QUE FAZER', 'DAVI', 'HTTPS/.', 7, '20:00:00'),
(9, '2024-04-25', 'Agendar uma consulta médica', 'URGENTE', 'TEM QUE FAZER', 'LETICIA', 'HTTPS//', 8, '11:30:00'),
(10, '2024-02-24', 'Enviar e-mails de acompanhamento aos clientes', 'MUITO IMPORTANTE', 'TEM QUE FAZER', 'KAIKY', 'HTTP/', 9, '09:00:00'),
(11, '2024-02-23', 'Aprender uma nova receita de culinária', 'BAIXA IMPORTÂNCIA', 'TEM QUE FAZER', 'GABRIEL', 'HTTPS/', 10, '17:00:00'),
(12, '2024-02-22', 'Limpar o quarto', 'IMPORTANTE', 'TEM QUE FAZER', 'THAINA', 'HTTPS//', 11, '14:00:00'),
(13, '2024-02-25', 'Planejar férias de verão', 'MÉDIA IMPORTÂNCIA', 'TEM QUE FAZER', 'THAINA', 'HTTPS//', 12, '16:00:00');

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
  `LOGIN` varchar(200) DEFAULT NULL,
  `ID_EMPRESARIAL` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`ID`, `DATA_NASC`, `NOME_USUARIO`, `EMAIL`, `SENHA`, `LOGIN`, `ID_EMPRESARIAL`) VALUES
(1, '2007-05-22', 'thaina', 'thaina@gmail.com', 'thain@', 'thaina', 1),
(2, '2007-06-05', 'leticia', 'leticia@gmail.com', 'letici@', 'leticia', 2),
(3, '2001-08-23', 'Carlos Germano', 'germano@gmail.com', 'Carlos@123', 'Carlos', 3),
(4, '2007-05-04', 'Matheus Claus', 'matheusc@outlook.com', 'Matheus@123', 'Matheus', 4),
(5, '1999-11-22', 'João Schimidt', 'joaosch@gmail.com', 'João@123', 'João', 5),
(6, '1973-05-30', 'Gabriel Joel', 'joelgabriel@outlook.com', 'Gabriel@123', 'Gabriel', 6),
(7, '2004-09-17', 'Manoel Giga', 'giga@outlook.com', 'Manoel@123', 'Manoel', 7),
(8, '1986-02-01', 'Fábio Balestrin', 'balestrinfabio@gmail.com', 'Fábio@123', 'Fábio', 8),
(9, '2003-12-21', 'Júlio Cariani', 'jcariani@gmail.com', 'Julio@123', 'Júlio', 9),
(10, '1990-04-29', 'Ramon Bumbstead', 'ramonbum@gmil.com', 'Ramon@123', 'Ramon', 10),
(11, '2000-08-03', 'Chris Dino', 'dinochris@gmail.com', 'Chris@123', 'Chris', 11),
(12, '2002-08-15', 'Paulo Roberto', 'proberto@outlook.com', 'Paulo@123', 'Paulo', 12);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_EMPRESARIAL` (`ID_EMPRESARIAL`);

--
-- Índices de tabela `empresarial`
--
ALTER TABLE `empresarial`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `equipe_quadro`
--
ALTER TABLE `equipe_quadro`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_TAREFA` (`ID_TAREFA`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Índices de tabela `histor_pag`
--
ALTER TABLE `histor_pag`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_PAGAMENTO` (`ID_PAGAMENTO`);

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
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_EMPRESARIAL` (`ID_EMPRESARIAL`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `colaboradores`
--
ALTER TABLE `colaboradores`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `empresarial`
--
ALTER TABLE `empresarial`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
-- AUTO_INCREMENT de tabela `pagamento`
--
ALTER TABLE `pagamento`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `plano`
--
ALTER TABLE `plano`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tarefa`
--
ALTER TABLE `tarefa`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD CONSTRAINT `colaboradores_ibfk_1` FOREIGN KEY (`ID_EMPRESARIAL`) REFERENCES `empresarial` (`ID`);

--
-- Restrições para tabelas `equipe_quadro`
--
ALTER TABLE `equipe_quadro`
  ADD CONSTRAINT `equipe_quadro_ibfk_1` FOREIGN KEY (`ID_TAREFA`) REFERENCES `tarefa` (`ID`),
  ADD CONSTRAINT `equipe_quadro_ibfk_2` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`);

--
-- Restrições para tabelas `histor_pag`
--
ALTER TABLE `histor_pag`
  ADD CONSTRAINT `histor_pag_ibfk_1` FOREIGN KEY (`ID_PAGAMENTO`) REFERENCES `pagamento` (`ID`);

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
  ADD CONSTRAINT `tarefa_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`);

--
-- Restrições para tabelas `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_EMPRESARIAL`) REFERENCES `empresarial` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
