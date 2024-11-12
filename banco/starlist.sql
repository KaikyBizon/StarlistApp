-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12/11/2024 às 20:22
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
  `PESSOA_EQUIPE` varchar(100) NOT NULL,
  `CNPJ` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `equipe`
--

INSERT INTO `equipe` (`ID`, `NOME_EQUIPE`, `PESSOA_EQUIPE`, `CNPJ`) VALUES
(1, 'STARLIST', '6', NULL),
(2, '3', 'sdnjkasdjk', 'shghasgdhas'),
(3, '3', 'sdnjkasdjk', 'shghasgdhas'),
(4, '3', 'sdnjkasdjk', 'shghasgdhas'),
(5, '3', 'Bosta', '05.311.244/0001-09'),
(6, '3', 'Joao', '05.311.244/0001-09'),
(7, '4', 'Baoa', '05.311.244/0001-09'),
(8, '4', 'Baoa', '05.311.244/0001-09'),
(9, '4', 'Baoa', '05.311.244/0001-09'),
(10, '4', 'Baoa', '05.311.244/0001-09'),
(11, '4', 'Baoa', '05.311.244/0001-09'),
(12, '4', 'Kaiky', '05.311.244/0001-09'),
(13, '4', 'Kaiky Bizon', '05.311.244/0001-09'),
(14, '4', 'Kaiky Bizon', '05.311.244/0001-09'),
(15, '4', 'Kaiky Bizon', '05.311.244/0001-09'),
(16, '4', 'Kaiky Bizon', '05.311.244/0001-09'),
(17, '4', 'Grupo', '05.311.244/0001-09'),
(18, 'Grupo', '4', '05.311.244/0001-09'),
(19, 'Grupo', '4', '05.311.244/0001-09'),
(20, 'Grupo', '4', '05.311.244/0001-09'),
(21, 'Grupo', '4', '05.311.244/0001-09'),
(22, 'Grupo', '4', '05.311.244/0001-09');

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
(20, 'dwadwad', NULL),
(21, 'uggfugf', 81),
(26, 'dwadw', 81),
(27, 'dwadwad', 81),
(28, 'dwadwada', 81),
(29, 'dawdadw', 81),
(30, 'dwa', 81),
(47, 'exame', 149),
(53, 'Diretoria', 174),
(59, 'Mercado', 175),
(62, 'Pendentes', 75),
(65, 'gregergr', 3),
(66, 'palmeiras', 3),
(68, 'dwadawfgbb', 6),
(69, 'fewfwefwef', 273),
(70, 'Escola', 9),
(71, 'Casa', 80),
(72, 'dwadwdaw', 1),
(73, 'aaaa', NULL),
(74, 's', NULL),
(75, 'jj', 3),
(76, 'caecvebb', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `mensagens`
--

CREATE TABLE `mensagens` (
  `ID` int(6) NOT NULL,
  `ID_REMET` int(6) DEFAULT NULL,
  `ID_DEST` int(6) DEFAULT NULL,
  `TXT_MSG` varchar(300) DEFAULT NULL,
  `HORA_ENVIO` time DEFAULT NULL,
  `DATA_ENVIO` date DEFAULT NULL,
  `STATUS_MSG` varchar(40) DEFAULT NULL,
  `CONVITE` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `mensagens`
--

INSERT INTO `mensagens` (`ID`, `ID_REMET`, `ID_DEST`, `TXT_MSG`, `HORA_ENVIO`, `DATA_ENVIO`, `STATUS_MSG`, `CONVITE`) VALUES
(2, 300, 134, 'Kaiky Bizon está te convidando para a equipe Starlist', '16:13:06', '2024-11-12', 'Não lida', NULL),
(3, 300, 134, 'Kaiky Bizon está te convidando para a equipe Starlist', '16:13:33', '2024-11-12', 'Não lida', NULL),
(4, 300, 134, 'Kaiky Bizon está te convidando para a equipe Starlist', '16:14:35', '2024-11-12', 'Não lida', NULL),
(5, 300, 134, 'Kaiky Bizon está te convidando para a equipe Starlist', '16:14:48', '2024-11-12', 'Não lida', NULL);

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
(2, '2024-03-21', 'Médico', 'IMPORTANTE', 'Médico-Dermatologista', 'leticia', 'Endereço', 2, '10:00:00', NULL),
(4, '2024-02-29', 'Estudar para o exame de matemática', 'IMPORTANTE', 'TEM QUE FAZER', 'KAIKY', 'HTTPS/', 3, '10:00:00', NULL),
(5, '2024-02-23', 'Fazer compras no supermercado', 'IMPORTANTE', 'TEM QUE FAZER', 'NATHAN', 'HTTPS//.', 4, '15:30:00', NULL),
(6, '2024-02-24', 'Preparar uma apresentação para o trabalho', 'MÉDIO', 'TEM QUE FAZER', 'GABRIEL', 'HTTP//', 5, '14:00:00', NULL),
(7, '2024-03-05', 'Correr por 30 minutos', 'BAIXA IMPORTÂNCIA', 'TEM QUE FAZER', 'NATHAN', 'HTTPS/', 6, '18:00:00', NULL),
(9, '2024-04-25', 'Agendar uma consulta médica', 'URGENTE', 'TEM QUE FAZER', 'LETICIA', 'HTTPS//', 8, '11:30:00', NULL),
(10, '2024-02-24', 'Enviar e-mails de acompanhamento aos clientes', 'MUITO IMPORTANTE', 'TEM QUE FAZER', 'KAIKY', 'HTTP/', 9, '09:00:00', NULL),
(11, '2024-02-23', 'Aprender uma nova receita de culinária', 'BAIXA IMPORTÂNCIA', 'TEM QUE FAZER', 'GABRIEL', 'HTTPS/', 10, '17:00:00', NULL),
(12, '2024-02-22', 'Limpar o quarto', 'IMPORTANTE', 'TEM QUE FAZER', 'THAINA', 'HTTPS//', 11, '14:00:00', NULL),
(13, '2024-02-25', 'Planejar férias de verão', 'MÉDIA IMPORTÂNCIA', 'TEM QUE FAZER', 'THAINA', 'HTTPS//', 12, '16:00:00', NULL),
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
(53, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(54, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(55, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(56, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(57, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(58, '2024-08-20', 'Tarefas', NULL, 'Importante', NULL, NULL, 75, '22:11:00', NULL),
(60, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(61, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(62, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(63, '2024-08-23', 'Tarefas', NULL, 'Feito', NULL, NULL, 75, '21:13:00', NULL),
(67, '0000-00-00', 'Correr', '', '', NULL, NULL, 79, '00:00:00', NULL),
(69, '2024-09-27', 'bvvnbvnbvn', 'Pendência', 'nn,mn,mn,mn', NULL, NULL, 81, '20:15:00', NULL),
(72, '2024-09-22', 'sdfsdfsdfsd', 'Importante', 'sdffsdfdsfdsdsd', NULL, NULL, 129, '14:38:00', NULL),
(81, '2024-09-22', 'cxvccvcv', 'Pendência', 'xcvxccxv', NULL, NULL, 129, '15:05:00', NULL),
(92, '2024-09-19', 'asas', 'Importante', 'ss', NULL, NULL, 80, '16:30:00', NULL),
(93, '2024-09-19', 'Olarias', 'Importante', 'Olarias do zé', NULL, NULL, 80, '19:25:00', NULL),
(94, '2024-09-26', 'Nathan', 'Importante', 'AIAIAIAIAIAIA', NULL, NULL, 80, '20:28:00', NULL),
(99, '0000-00-00', 'dwadwad', '', 'dwadw', NULL, NULL, 1, '00:00:00', 29),
(100, '1111-11-11', 'dwadw', 'Importante', '', NULL, NULL, 1, '11:11:00', 29),
(101, '2024-09-27', 'Correr', 'Pendência', 'De manhã\n\n', NULL, NULL, 75, '06:59:00', NULL),
(102, '2024-09-20', 'Correr', 'Pendência', 'De manha', NULL, NULL, 75, '06:15:00', NULL),
(103, '2024-09-18', 'Aniversario', 'Importante', '', NULL, NULL, 75, '10:42:00', NULL),
(104, '2024-09-11', 'Festa', 'Importante', 'Festa legal \n', NULL, NULL, 75, '10:53:00', NULL),
(105, '2024-09-20', 'Ahaha', 'Pendência', 'Gahzh', NULL, NULL, 75, '05:54:00', NULL),
(106, '2024-09-18', 'Ginecologista ', 'Importante', 'Exame do toque', NULL, NULL, 75, '16:30:00', NULL),
(107, '0000-00-00', 'ginecologista', 'Importante', 'sksk', NULL, NULL, 149, '10:30:00', 47),
(108, '2024-09-19', 'Cozinhar', 'Pendência', '', NULL, NULL, 75, '12:00:00', NULL),
(109, '2024-09-19', 'Prova de português ', 'Importante', '.', NULL, NULL, 150, '11:30:00', NULL),
(110, '2024-09-18', 'Matemática ', 'Importante', 'Qualquer coisa\n', NULL, NULL, 75, '11:38:00', NULL),
(111, '2024-09-18', 'Parque aquático ', 'Importante', 'Campinas', NULL, NULL, 75, '11:48:00', NULL),
(112, '2024-09-17', 'Correr', 'Importante', 'Exercícios ', NULL, NULL, 75, '12:00:00', NULL),
(113, '2024-09-26', 'Correr', 'Importante', 'Com o cachorro ', NULL, NULL, 75, '05:15:00', NULL),
(114, '2024-09-27', 'Correr', 'Importante', 'Com o cachorro', NULL, NULL, 75, '06:25:00', NULL),
(115, '2024-10-12', 'THERMAS', 'Importante', 'Dia das crianças, passeio thermas hot world', NULL, NULL, 174, '08:00:00', 53),
(118, '2024-09-26', 'Correr', 'Importante', 'Com o cachorro ', NULL, NULL, 75, '06:40:00', NULL),
(119, '2024-09-18', '', '', '', NULL, NULL, 75, '13:42:00', NULL),
(120, '2024-09-27', 'Comprar tomate', 'Pendência', '', NULL, NULL, 175, '15:26:00', 59),
(123, '2024-09-18', 'Senai', 'Importante', 'Nao faltar na aula \n', NULL, NULL, 75, '14:45:00', NULL),
(124, '2024-09-18', '', '', '', NULL, NULL, 75, '14:45:00', NULL),
(125, '2024-09-19', 'Tomar banho', 'Importante', '', NULL, NULL, 75, '20:00:00', 62),
(129, '2024-10-05', 'dwadwad', 'Importante', 'dwwad', NULL, NULL, 3, '11:11:00', NULL),
(130, '2024-10-20', 'dwadwd', 'Pendência', 'dwdawd', NULL, NULL, 3, '11:11:00', NULL),
(131, '2024-10-23', 'fesfsefe', 'Pendência', 'fseffs', NULL, NULL, 1, '08:44:00', NULL),
(134, '2024-10-23', 'dwadaw', 'Importante', 'fdfs', NULL, NULL, 3, '19:00:00', 65),
(136, '2024-11-13', 'dwadw', 'Importante', 'dwadwa', NULL, NULL, NULL, '13:00:00', NULL),
(137, '2024-10-31', 'dwa', 'Importante', 'dawddwad', NULL, NULL, NULL, '13:00:00', NULL),
(140, '2024-10-31', 'afffff', 'Importante', 'dwadwa', NULL, NULL, 6, '20:00:00', NULL),
(141, '2024-11-01', 'pmogskgfnkes', 'Importante', 'fkmfkkkkkfe', NULL, NULL, 273, '12:00:00', NULL),
(142, '2024-11-02', 'dwadawd', 'Pendência', 'sfpomsomppomf', NULL, NULL, 273, '12:00:00', NULL),
(143, '2024-11-21', 'fewfew', 'Importante', 'fwmpefespm', NULL, NULL, 273, '12:00:00', NULL),
(144, '2024-11-21', 'fewfew', 'Importante', 'fwmpefespm', NULL, NULL, 273, '12:00:00', NULL),
(145, '2024-11-21', 'fewfew', 'Importante', 'fwmpefespm', NULL, NULL, 273, '12:00:00', NULL),
(146, '2024-11-02', 'dwadawd', 'Pendência', 'p´,gs´fp´s´\np,f´p,', NULL, NULL, 273, '20:00:00', NULL),
(147, '2024-11-02', 'dwadawdawd', 'Importante', 'f,´´ef´´p\nad', NULL, NULL, 273, '21:00:00', NULL),
(148, '2024-11-02', 'dwad', 'Importante', 'dawdwda', NULL, NULL, 273, '10:00:00', 69),
(149, '2024-11-01', 'Lição', 'Importante', 'dsajdhsjkshdakjhs', NULL, NULL, 9, '13:02:00', 70),
(153, '2024-11-01', 'dsasddasds', 'Pendência', 'asddsasdsaddas', NULL, NULL, 80, '17:42:00', NULL),
(154, '2024-11-02', 'knlergnkernkgknreg', 'Importante', 'gi´0joinerinpgk\n', NULL, NULL, 1, '09:00:00', NULL),
(155, '2024-11-02', 'fvffvfvvfd', 'Reunião', 'ffefsfes', NULL, NULL, 1, '08:00:00', NULL),
(156, '2024-11-09', 'vsvdvdsvsd', 'Importante', 'vsddsvds', NULL, NULL, 1, '08:00:00', NULL),
(159, '2024-10-31', 'pojgrnoigrn', 'Pendência', 'gergrregrgegre', NULL, NULL, 1, '20:00:00', NULL),
(160, '2024-11-01', 'sss', 'Pendência', 'sqs', NULL, NULL, 3, '15:35:00', 66),
(169, '2024-11-01', 'dwadwadwad', 'Importante', 'dwadwad', NULL, NULL, 1, '12:11:00', 72),
(170, '2024-11-02', 'dwadaw', 'Importante', 'wdadw', NULL, NULL, 1, '13:00:00', 72),
(171, '2024-11-15', 'bre', 'Importante', 'dafwfwf', NULL, NULL, 1, '11:11:00', 76),
(173, '2024-11-07', 'gregreggr', 'Importante', 'grerggr', NULL, NULL, 1, '22:22:00', 76);

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
  `ID_EQUIPE` int(11) DEFAULT NULL,
  `PLANO_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`ID`, `DATA_NASC`, `NOME_USUARIO`, `EMAIL`, `SENHA`, `CNPJ`, `CARGO`, `ID_EQUIPE`, `PLANO_ID`) VALUES
(1, '2007-05-22', 'thaina', 'thaina@gmail.com', 'thain@', '', 'Colaborador', 1, NULL),
(2, '2007-06-05', 'leticia', 'leticia@gmail.com', 'letici@', '', '', 1, NULL),
(3, '2001-08-23', 'Joaozinho VT', 'germano@gmail.com', 'Carlos@123', '', '', 1, NULL),
(4, '2007-05-04', 'Matheus Claus', 'matheusc@outlook.com', 'Matheus@123', '', '', 1, NULL),
(5, '1999-11-22', 'João Schimidt', 'joaosch@gmail.com', 'João@123', '', '', 1, NULL),
(6, '1987-09-27', 'junior silva', 'junior@gmail.com', 'Gabriel@123', '', '', 1, NULL),
(7, '2004-09-17', 'Manoel Bastão', 'giga@outlook.com', 'Manoel@123', '', '', 1, NULL),
(8, '1986-02-01', 'Fábio Balestrin', 'balestrinfabio@gmail.com', 'Fábio@123', '', '', 1, NULL),
(9, '2003-12-21', 'Júlio Cariani', 'jcariani@gmail.com', 'Julio@123', '', '', 1, NULL),
(10, '1990-04-29', 'Ramon Bumbstead', 'ramonbum@gmil.com', 'Ramon@123', '', '', 1, NULL),
(11, '2000-08-03', 'Chris Dino', 'dinochris@gmail.com', 'Chris@123', '', '', 1, NULL),
(12, '2002-08-15', 'Paulo Roberto', 'proberto@outlook.com', 'Paulo@123', '', '', 1, NULL),
(70, '2007-06-05', 'leticia bueno soares', 'leticiabuenosoares.lb@gmail.com', 'Leticia@123', '', '', 1, NULL),
(71, '2007-06-05', 'leticia bueno soares', 'leticiabuenosoares.lb@gmail.com', 'Leticia@123', '', '', 1, NULL),
(72, '2008-07-22', 'leticia bueno', 'leticia.soares2@aluno.senai.br', 'Leticia@123', '', '', 1, NULL),
(73, '2006-06-14', 'sueli de souza', 'suelithaina@gmail.com', 'Leticia@123', '', '', 1, NULL),
(74, '2006-06-14', 'sueli de souza', 'suelithaina@gmail.com', 'Leticia@123', '', '', 1, NULL),
(75, '2004-01-03', 'leticia bueno', 'leticia@gmail.com', 'Leticia@123', '', '', 1, NULL),
(76, '2007-03-28', 'carlos pereira', 'carlospereira@gmail.com', 'Carlos@123', '', '', 1, NULL),
(77, '2004-06-30', 'Leandro Barbosa', 'leandrobarbosa@gmail.com', 'Leandro@123', '', '', 1, NULL),
(78, '2006-05-18', 'Julia Cardoso', 'juliacardoso@gmail.com', 'Julia@123', '', '', 1, NULL),
(79, '1960-12-14', 'Eduardo Costa', 'eduardocosta@gmail.com', 'Eduardo@123', '', '', 1, NULL),
(80, '2006-09-18', 'Junior Garcia', 'juniorgarcia@gmail.com', 'Junior@123', '', '', 1, NULL),
(81, '2006-02-17', 'Jorge Batista', 'jorge@gmail.com', 'Jorge@123', '', '', 1, NULL),
(82, '2002-10-09', 'Jorge Souza', 'jorge@gmail.com', 'Jorge@123', '', '', 1, NULL),
(83, '2004-10-15', 'Jorge Souza', 'jorge@gmail.com', 'Jorge@123', '', '', 1, NULL),
(84, '2004-08-10', 'Ricardo Silva', 'ricardo@gmail.com', 'Ricardo@123', '', '', 1, NULL),
(85, '2008-04-25', 'Paulo Silva', 'paulo@gmail.com', 'Paulo@123', '', '', 1, NULL),
(128, '1990-05-17', 'Carlinhos Matagal', 'Matagal.Carlinhos@gmail.com', 'Matagal@123', '', '', 1, 4),
(129, '1991-06-21', 'Pablo Marçar', 'Pablo.Marçal@gmail.com', 'Pablo@123', '', '', 1, 1),
(130, '1980-09-16', 'Cleiton Rasta', 'Cleiton.rasta@gmail.com', 'Cleiton@123', '', '', 1, 4),
(131, '1991-10-05', 'Jose Galinha', 'Galinha@gmail.com', 'Jose@123', '', '', 1, 2),
(132, '1986-06-17', 'Kleber Toguro', 'Toguro,Kleber@gmail.com', 'Toguro@123', '', '', 1, 1),
(133, '2003-02-21', 'Murilo Ait', 'murilin@gmail.com', 'Mu@123', '', '', 1, 4),
(134, '2002-09-14', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', 'lider', 1, 4),
(135, '2006-08-03', 'Kaiky Bizon', 'kaikybizon@gmail.com', 'Kaikybizon1@', '', '', 1, 4),
(136, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(137, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(138, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(139, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(140, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(141, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(142, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(143, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(144, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(145, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(146, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(147, '2008-06-17', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(148, '2008-06-17', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1),
(149, '2008-06-12', 'erick gabriel', 'erick@gmail.com', 'Erick@123', '', '', 1, 1),
(150, '2008-04-02', 'Vinicius alves dos santos ', 'v448035@gmail.com', 'Vini@123', '', '', 1, 1),
(151, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Ana@123', '', '', 1, 1),
(152, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Ana@123', '', '', 1, 1),
(153, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulis@123', '', '', 1, 1),
(154, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulis@123', '', '', 1, 1),
(155, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulis@123', '', '', 1, 1),
(156, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1),
(157, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1),
(158, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1),
(159, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1),
(160, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1),
(161, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1),
(162, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Julia@123', '', '', 1, 1),
(163, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1),
(164, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1),
(165, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1),
(166, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1),
(167, '2008-02-05', 'ana julia', 'anajulia@gmail.com', 'Anajulia@123', '', '', 1, 1),
(168, '2009-04-24', 'ana julia', 'anacanella080@gmail.com', 'Julia9621!', '', '', 1, 1),
(169, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1),
(170, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1),
(171, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1),
(172, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1),
(173, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1),
(174, '2001-04-30', 'pedro henrique ', 'pedromaximiano100@gmail.com', '#PedroHM30', '', '', 1, 1),
(175, '2007-04-18', 'Júlia Dias', 'julia@gmail.com', 'Julia@123', '', '', 1, 3),
(176, '2007-04-18', 'Júlia Dias', 'julia@gmail.com', 'Julia@123', '', '', 1, 3),
(177, '2007-04-18', 'Júlia Dias', 'julia@gmail.com', 'Julia@123', '', '', 1, 3),
(178, '2006-10-12', 'Marília linda', 'marilinda@gmail.com', 'Mari@190', '', '', 1, 1),
(179, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1),
(180, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1),
(181, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1),
(182, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1),
(183, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@carlos.com', 'Kb1@', '', '', 1, 1),
(184, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@carlos.com', 'Kb1@', '', '', 1, 1),
(185, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@carlos.com', 'Kb1@', '', '', 1, 1),
(186, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@gmail.com', 'Kb1@', '', '', 1, 1),
(187, '1988-02-21', 'AAAAA BBBBBb', 'ghzin@gmail.com', 'Kb1@', '', '', 1, 2),
(188, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(189, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(190, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(191, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(192, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(193, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(194, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(195, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(196, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(197, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2),
(198, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1),
(199, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1),
(200, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1),
(201, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1),
(202, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1),
(203, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1),
(204, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(205, '2002-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(206, '1999-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(207, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(208, '1999-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(209, '2002-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(210, '2001-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(211, '2001-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(212, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(213, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(214, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(215, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(216, '2001-01-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(217, '2001-01-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(218, '2001-01-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(219, '2002-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(220, '2002-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(221, '1998-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(222, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(223, '1988-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 3),
(224, '1981-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(225, '1988-01-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(226, '1987-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(227, '2002-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(228, '2001-02-21', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(229, '2001-01-21', 'Kaiky Bizon', 'andrade.gabrielcandreva@gmail.com', 'Kb1@', '', '', 1, 1),
(230, '2001-01-21', 'Kaiky Bizon', 'andrade.gabrielcandreva@gmail.com', 'Kb1@', '', '', 1, 1),
(232, '1999-02-21', 'Kaiky Bizon', 'andrade.gabrielcandreva@gmail.com', 'Kb1@', '', '', 1, 2),
(259, '2004-03-03', 'davi cruz', 'cruz@gmail.com', 'Cruz@123', '', '', 1, 2),
(261, '2006-08-03', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(266, '2006-08-03', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(269, '2006-08-03', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(270, '2006-08-03', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(271, '2006-08-03', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 1),
(272, '2006-08-03', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', '', 1, 2),
(273, '1988-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 1),
(274, '1988-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 1),
(275, '2002-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 1),
(276, '2006-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2),
(277, '2004-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2),
(278, '2002-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2),
(279, '2002-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2),
(280, '2001-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2),
(300, '2001-02-21', 'Teste CadEmpresarialT', 'davircruz777@gmail.com', 'Kb1@', '', '', 1, 4);

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
-- Índices de tabela `mensagens`
--
ALTER TABLE `mensagens`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_REMET` (`ID_REMET`),
  ADD KEY `ID_DEST` (`ID_DEST`);

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
  ADD KEY `ID_EQUIPE` (`ID_EQUIPE`),
  ADD KEY `FK_PLANO` (`PLANO_ID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `equipe`
--
ALTER TABLE `equipe`
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
-- AUTO_INCREMENT de tabela `lista`
--
ALTER TABLE `lista`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de tabela `mensagens`
--
ALTER TABLE `mensagens`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=302;

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
-- Restrições para tabelas `mensagens`
--
ALTER TABLE `mensagens`
  ADD CONSTRAINT `mensagens_ibfk_1` FOREIGN KEY (`ID_REMET`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `mensagens_ibfk_2` FOREIGN KEY (`ID_DEST`) REFERENCES `usuario` (`ID`);

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
  ADD CONSTRAINT `FK_PLANO` FOREIGN KEY (`PLANO_ID`) REFERENCES `plano` (`ID`),
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_EQUIPE`) REFERENCES `equipe` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
