-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/11/2024 às 20:29
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
(5, 300, 134, 'Kaiky Bizon está te convidando para a equipe Starlist', '16:14:48', '2024-11-12', 'Não lida', NULL),
(8, 300, 134, 'Kaiky Bizon está te convidando para a equipe Starlist', '16:43:36', '2024-11-14', 'Não lida', NULL),
(9, 300, 134, 'Kaiky Bizon está te convidando para a equipe Starlist', '13:36:47', '2024-11-19', 'Não lida', NULL),
(10, 300, 134, 'Gabriel Candreva está te convidando para a equipe Starlist', '16:24:50', '2024-11-19', 'Não lida', NULL);

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
  `PLANO_ID` int(11) DEFAULT NULL,
  `FOTO_PERFIL` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`ID`, `DATA_NASC`, `NOME_USUARIO`, `EMAIL`, `SENHA`, `CNPJ`, `CARGO`, `ID_EQUIPE`, `PLANO_ID`, `FOTO_PERFIL`) VALUES
(1, '2007-05-22', 'thaina', 'thaina@gmail.com', 'thain@', '', 'Colaborador', 1, NULL, NULL),
(2, '2007-06-05', 'leticia', 'leticia@gmail.com', 'letici@', '', '', 1, NULL, NULL),
(3, '2001-08-23', 'Joaozinho VT', 'germano@gmail.com', 'Carlos@123', '', '', 1, NULL, NULL),
(4, '2007-05-04', 'Matheus Claus', 'matheusc@outlook.com', 'Matheus@123', '', '', 1, NULL, NULL),
(5, '1999-11-22', 'João Schimidt', 'joaosch@gmail.com', 'João@123', '', '', 1, NULL, NULL),
(6, '1987-09-27', 'junior silva', 'junior@gmail.com', 'Gabriel@123', '', '', 1, NULL, NULL),
(7, '2004-09-17', 'Manoel Bastão', 'giga@outlook.com', 'Manoel@123', '', '', 1, NULL, NULL),
(8, '1986-02-01', 'Fábio Balestrin', 'balestrinfabio@gmail.com', 'Fábio@123', '', '', 1, NULL, NULL),
(9, '2003-12-21', 'Júlio Cariani', 'jcariani@gmail.com', 'Julio@123', '', '', 1, NULL, NULL),
(10, '1990-04-29', 'Ramon Bumbstead', 'ramonbum@gmil.com', 'Ramon@123', '', '', 1, NULL, NULL),
(11, '2000-08-03', 'Chris Dino', 'dinochris@gmail.com', 'Chris@123', '', '', 1, NULL, NULL),
(12, '2002-08-15', 'Paulo Roberto', 'proberto@outlook.com', 'Paulo@123', '', '', 1, NULL, NULL),
(70, '2007-06-05', 'leticia bueno soares', 'leticiabuenosoares.lb@gmail.com', 'Leticia@123', '', '', 1, NULL, NULL),
(71, '2007-06-05', 'leticia bueno soares', 'leticiabuenosoares.lb@gmail.com', 'Leticia@123', '', '', 1, NULL, NULL),
(72, '2008-07-22', 'leticia bueno', 'leticia.soares2@aluno.senai.br', 'Leticia@123', '', '', 1, NULL, NULL),
(73, '2006-06-14', 'sueli de souza', 'suelithaina@gmail.com', 'Leticia@123', '', '', 1, NULL, NULL),
(74, '2006-06-14', 'sueli de souza', 'suelithaina@gmail.com', 'Leticia@123', '', '', 1, NULL, NULL),
(75, '2004-01-03', 'leticia bueno', 'leticia@gmail.com', 'Leticia@123', '', '', 1, NULL, NULL),
(76, '2007-03-28', 'carlos pereira', 'carlospereira@gmail.com', 'Carlos@123', '', '', 1, NULL, NULL),
(77, '2004-06-30', 'Leandro Barbosa', 'leandrobarbosa@gmail.com', 'Leandro@123', '', '', 1, NULL, NULL),
(78, '2006-05-18', 'Julia Cardoso', 'juliacardoso@gmail.com', 'Julia@123', '', '', 1, NULL, NULL),
(79, '1960-12-14', 'Eduardo Costa', 'eduardocosta@gmail.com', 'Eduardo@123', '', '', 1, NULL, NULL),
(80, '2006-09-18', 'Junior Garcia', 'juniorgarcia@gmail.com', 'Junior@123', '', '', 1, NULL, NULL),
(81, '2006-02-17', 'Jorge Batista', 'jorge@gmail.com', 'Jorge@123', '', '', 1, NULL, NULL),
(82, '2002-10-09', 'Jorge Souza', 'jorge@gmail.com', 'Jorge@123', '', '', 1, NULL, NULL),
(83, '2004-10-15', 'Jorge Souza', 'jorge@gmail.com', 'Jorge@123', '', '', 1, NULL, NULL),
(84, '2004-08-10', 'Ricardo Silva', 'ricardo@gmail.com', 'Ricardo@123', '', '', 1, NULL, NULL),
(85, '2008-04-25', 'Paulo Silva', 'paulo@gmail.com', 'Paulo@123', '', '', 1, NULL, NULL),
(128, '1990-05-17', 'Carlinhos Matagal', 'Matagal.Carlinhos@gmail.com', 'Matagal@123', '', '', 1, 4, NULL),
(129, '1991-06-21', 'Pablo Marçar', 'Pablo.Marçal@gmail.com', 'Pablo@123', '', '', 1, 1, NULL),
(130, '1980-09-16', 'Cleiton Rasta', 'Cleiton.rasta@gmail.com', 'Cleiton@123', '', '', 1, 4, NULL),
(131, '1991-10-05', 'Jose Galinha', 'Galinha@gmail.com', 'Jose@123', '', '', 1, 2, NULL),
(132, '1986-06-17', 'Kleber Toguro', 'Toguro,Kleber@gmail.com', 'Toguro@123', '', '', 1, 1, NULL),
(133, '2003-02-21', 'Murilo Ait', 'murilin@gmail.com', 'Mu@123', '', '', 1, 4, NULL),
(134, '2002-09-14', 'Kaiky Bizon', 'kaiky@gmail.com', 'Kb1@', '', 'lider', 1, 4, NULL),
(136, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(137, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(138, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(139, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(140, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(141, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(142, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(143, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(144, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(145, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(146, '2008-08-10', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(147, '2008-06-17', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(148, '2008-06-17', 'erick gabriel', 'erickneguinho@gmail.com', 'Erick123!', '', '', 1, 1, NULL),
(149, '2008-06-12', 'erick gabriel', 'erick@gmail.com', 'Erick@123', '', '', 1, 1, NULL),
(150, '2008-04-02', 'Vinicius alves dos santos ', 'v448035@gmail.com', 'Vini@123', '', '', 1, 1, NULL),
(151, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Ana@123', '', '', 1, 1, NULL),
(152, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Ana@123', '', '', 1, 1, NULL),
(153, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulis@123', '', '', 1, 1, NULL),
(154, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulis@123', '', '', 1, 1, NULL),
(155, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulis@123', '', '', 1, 1, NULL),
(156, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1, NULL),
(157, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1, NULL),
(158, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1, NULL),
(159, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1, NULL),
(160, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1, NULL),
(161, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Anajulia@123', '', '', 1, 1, NULL),
(162, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Julia@123', '', '', 1, 1, NULL),
(163, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1, NULL),
(164, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1, NULL),
(165, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1, NULL),
(166, '2009-04-24', 'ana julia', 'ana@gamil.com', 'Leticia@123', '', '', 1, 1, NULL),
(167, '2008-02-05', 'ana julia', 'anajulia@gmail.com', 'Anajulia@123', '', '', 1, 1, NULL),
(168, '2009-04-24', 'ana julia', 'anacanella080@gmail.com', 'Julia9621!', '', '', 1, 1, NULL),
(169, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1, NULL),
(170, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1, NULL),
(171, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1, NULL),
(172, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1, NULL),
(173, '2008-02-13', 'milena martins', 'milena@gmail.com', 'Corvin@00', '', '', 1, 1, NULL),
(174, '2001-04-30', 'pedro henrique ', 'pedromaximiano100@gmail.com', '#PedroHM30', '', '', 1, 1, NULL),
(175, '2007-04-18', 'Júlia Dias', 'julia@gmail.com', 'Julia@123', '', '', 1, 3, NULL),
(176, '2007-04-18', 'Júlia Dias', 'julia@gmail.com', 'Julia@123', '', '', 1, 3, NULL),
(177, '2007-04-18', 'Júlia Dias', 'julia@gmail.com', 'Julia@123', '', '', 1, 3, NULL),
(178, '2006-10-12', 'Marília linda', 'marilinda@gmail.com', 'Mari@190', '', '', 1, 1, NULL),
(179, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1, NULL),
(180, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1, NULL),
(181, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1, NULL),
(182, '2005-12-04', 'AAAAA BBBBBb', '.@carlos.com', 'Kb1@', '', '', 1, 1, NULL),
(183, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@carlos.com', 'Kb1@', '', '', 1, 1, NULL),
(184, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@carlos.com', 'Kb1@', '', '', 1, 1, NULL),
(185, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@carlos.com', 'Kb1@', '', '', 1, 1, NULL),
(186, '2005-12-04', 'AAAAA BBBBBb', 'ghzin@gmail.com', 'Kb1@', '', '', 1, 1, NULL),
(187, '1988-02-21', 'AAAAA BBBBBb', 'ghzin@gmail.com', 'Kb1@', '', '', 1, 2, NULL),
(188, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(189, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(190, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(191, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(192, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(193, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(194, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(195, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(196, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(197, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 2, NULL),
(198, '2001-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1, NULL),
(199, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1, NULL),
(200, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1, NULL),
(201, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1, NULL),
(202, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1, NULL),
(203, '2002-02-21', 'AAAAA BBBBBb', 'ghzin@carlinhos.com', 'Kb1@', '', '', 1, 1, NULL),
(259, '2004-03-03', 'davi cruz', 'cruz@gmail.com', 'Cruz@123', '', '', 1, 2, NULL),
(273, '1988-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 1, NULL),
(274, '1988-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 1, NULL),
(275, '2002-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 1, NULL),
(276, '2006-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2, NULL),
(277, '2004-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2, NULL),
(278, '2002-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2, NULL),
(279, '2002-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2, NULL),
(280, '2001-02-21', 'davi cruz', 'nathan.costa2@aluno.senai.br', 'Kb1@', '', '', 1, 2, NULL),
(300, '2001-02-21', 'Teste CadEmpresarialT', 'davircruz777@gmail.com', 'Kb1@', '', '', 1, 4, NULL);
INSERT INTO `usuario` (`ID`, `DATA_NASC`, `NOME_USUARIO`, `EMAIL`, `SENHA`, `CNPJ`, `CARGO`, `ID_EQUIPE`, `PLANO_ID`, `FOTO_PERFIL`) VALUES
(302, '2001-02-21', 'Free Willy Wonka', 'davircruz777@gmail.com', 'Kb1@', '', '', NULL, 1, 0x89504e470d0a1a0a0000000d49484452000003410000028a0806000000fba5501a000000017352474200aece1ce90000000467414d410000b18f0bfc61050000000970485973000012740000127401de661f780000bdba49444154785eecdd079c5c65b93ff067dace6cefbda46f7aef41059462418d3758f07245e40a16f4fe2d88782f1a41402580140541298a200a88104825bd90404827a4909e6cc9f632b3d3ffe7397b866d33b353ce993973ceeffbf9ec277326c966cfccc9eefb3beff33eaf61c9e2c57e020000000000d009a3f42b0000000000802e2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae18962c5eec971e431cbeb8f8027dee53cd6436f7bd9cf58d69b4ece12a3a77de2a3d13bb65771ea7ca0aa7f8d8e331d0ab2b0ae99faf148bc7f1b8684107cd99d14935d54ecacbf59035cd4b2693f49b02af97c8e932515bbb998e9fb0d1d61d39b4677f96f4bb91ebfff52be9c0a14cba6b598d7414b9efdd788e16ceeb2083a1f7f8dd7dd974ef8355bd07322ac877d3e51f6fa5e993bba9a4c845369b6fc8ebed721ba9b3d34c0d172c74f05006bdb3275b966b08000000007a99264d98b0547a0c71983cc14ee3c739c8d86f6e2d33c34bb9d95edaf14e8ef44cecae1006ce39c2e7623e9f810e1fcba0f7decf148fa3c503f1ebae69a09bbe514717cd6fa7ea4a27656779c962f10ff8fa191ff3f3fcfb1c942e9adf41977ca49d72723c42284a17035924fa7ffd4a6a6c4aa3cddb72a5a3c88c1beda04f5fd122bc5f3ee919a2f474af183c38c8ca815ff36f5ed7405fffcf7a9a225c2bf9791e4a4b0bf17a0b413a33d34ba5c56e9a32c94e975dd2461f59d84e85051e3a5797468e9e7ea90900000000a23668080672e259856953bae9f24b5ba56792ef739f6ea6bb7f71922e16824c9630d00ecc7c448aff7c51a19b3effa966bae71727c4c179aae3009b9b3b30a06567fa6862ad5d3a8a0fbf4677feef295a38af9dac42f08996d1e8a7f252172d98d341f9b91ee9590000000088154290c232d2bd74c5a52d0929050b27dde6a3effef779fad2e246cacd0e3e9076bb0dd4dd6d1467404e9fb18abff2313f3f1887a1d212177de3da7abafa7317a467433b5f9f267ece483e1c8e819765738b25e89f0bf6d1d06891fe56e4a64fed228bb96f1688994c7e9a36b95b7cdde23143f8dcd72cb920ce040dc6a56ffd5fefba8634b23b4c415f6f76ec783a7d70325d3a020000008058614d904c82ad090ae0f2b5ad6fe5d01ffe5c213d13bd78d7047de786f3e2fa1f9e55e8cfe932d0916319b4716b9ef83586c27ff7e28bdaa876ac7dc86c86db63a4d757e5d30b2f9748cfc467f0faa1f59bf3e8f1a7cba52379f1795dffd53acaccec0d3bbc1e27cdd2fbb8c769a4e75e2ca135ebf2c5e3687180fabf5b4ed1e8913dd233bdda3bcdb4696b2ead5c9b4f2dadc143db9409dd347f6e274d167e2d297689af713c5f0b00000000f4c19a2099f45f13e4f71b847061fc3010f5969079c8ee30d2f118efe4c7b326e8cb4b1ae9131f6b13673702fcc2c3f78f64d01ffe5449ff7ea388ce9c0dbff09e7f7ff3f65c3a782893ca4a5d62495ca094ce2404abea2a575ce7d7dfe0f543274fdb68d79e6ce9485e8b3fdd2486143e170e970785d7b4b8c82dbe8ffcfef5f41869c7aed8d6745d75450b2d98d729be3e013ce373ef43d5b46d476ed8b53dbcb669f7be2c5ab5ae40fcf73b3a4cb47b6f367575633d1000000040bc500ea7009fcf4ffb0f6692d3d957d6c44d1278813bafed48245e8772d9c56d0366a83844f1209c07e3478f47175af8cf0706f1fc7902f8fc3e7365f2cbfea2c1efc5a811bd0188753b4cb447081e5df6bea0316e8c436c9c108bb163ec03caec7806e8c5578ba3eef4c67f9e832a97cb0100000040fc108214c02d8ff98efdee7dd9e28c4b007761e3c6048974c5a56d62038400fe7a76eecaa6479ea820474f6c6f3fffbd3fffb58c0ebe9f31e0fcb89b199704a68af9b33ba9a8a86f7d544bab9956adcba78686be1235eee2366766a774149d92a281eb80f8f3befdae32335a000000001039842005bdb1ba809a9afa06d4bc1e8707d43c3b9308bc1fcdc81103d7a3345c48a3175f2d928e62c741e8d5d70b07ac693118fc3469bc3de6999344ebdf10814b188f7e90213ee63241afb7777a884b08a74ee9161f476b70fb6b5e6f0400000000c98751994272b23d62e9d89b9bf2060c7e7956e6aa2b5be2ee3a168989e3ec64b3f6fd3b3cb0dff98e7c1b6f1e783f535cb7c20122209e9993449a3fa783aa2afb4af7da3b8db47b6fef1aab434208eaecee7bcf4a0a5d62030500000000d00684208558adbd7562bc96e3fd23e903cac646543b69c9e79ba42365f07a97d12307cec834359b69c3963ce9481ebbf66489012280674e26c8b4bf8e92a64cb40fd81cb5bede4a7bf667898ff9d7e3277b67855886f0e7664d8b3ed8b5750c6c629097e34e48f80500000080f0108212e0b53706968d7150e00d34e7ce526ec664fcb8a11b8072e736b917d77360686c1cf8398b0bdd628b67b5e280c8ada7b97c8f71fbe9bd52000a382c04d7c00c1e374ea81d1b7d83847ae1b5ee1f7e4b4a3c74c5c75ba42300000000481684a004e0b2b1f55bf2c4c176006f58caddd4949a19e02e6dfd3b93f1069ce7ce2bd35dece4199ee9ea2b89cbc8f00aff7e62bbe04563704384a62633edd835b061013730686e364b47c2fb25044a6e831e8d434732c96eef7bcf79ffa12b3fd12a066000000000481e84a004796355c190b2b831231df4b9cf2853165798ef11bbd4057000abbf20cf5aa0c1382cb83d7d2188db711715a937040d6c884074e2946dc80c191ff39e418170c77f9eff5e3478f3d9c3470776d0e33553dfb8b69eaefb6a3d4ae3000000009204212841b89b1a778b6b6bef9b5de0b070f1a2769a11e5e03a12d9fd361b65ce1e03b5b729b3d16673ab45dc683480c357fff5366ac2af7559595f43049ea979775ff0b6d5ef0b01c66eef3bafeaca9ea81b243cf752c9908d6839fc7cf213adf4e0af8fd18dd7d55141fec056da00000000a02c84a004e2f5331bb7e50e080c79b91efaf415f297c571b95d7f7687492ccb5302872b0e59fd150fda23472d66cfe8125e9bbed7fa5c9d559cb109869f3f73ce261dc5d620813bf13df37c199d3d37707d10e3a07ae9c7da8430f401fdeaf69374f9a5ad981d02000000480084a0047bf5f522fae064ba74d4bbe87e42ad833ef76979cbe206ef5103431b2270cb70de13289c23c7d23fdc3388dfab51237ac4cf138df70e67d03d0fd4d05b6fe70e581716c033825c1ac965728f2c3b463ff8ce5971bf2500000000500686ca09c66571afaf2aa0f6cebeb2385e6ff2d1851daaeea8a605dc8dafb0b06f86acb5cd4cefec0e5e0a17c0bfcf7f2e801b2a706385687177c087fe5841f73d5c45878450d47f36b0bf8c742fcd133eff6d3f3c4d3ffbd1698421000000000520042501771edbb23df7c31906c6eb423efbe966e9089430bed62176680b3875c62a6e681b0efffed10ffafe4c2c0d12fadb7b2093eef8ed08fae92f47d1facd79d4d6611e5226c7787668eaa46ebaf50767e8fa6b1b502607000000202384a02479e9df45e2203c205016f77999cae27c18330fc00d11468fec9b55e9711a69efc1817b038572e86886f8e703cacb5d346b467ccd2c78add0e34f97d3b77f308e1ef84315ed7f2f939caea1b3431cda2ebfa485fedf77ce220801000000c804212849b82c6ef9aa02eaeaeeebd8c603de4f7cac2dea4d3983e95f6ec7b8cc4aa972bbdc3c2f596d03a7332e34f56d0eab06831b22d8ac3efac67fd6d3f37f3e34ec07ff39fef30139595e9a2963473f9e19bcfbbe1afae1cfc6d0ca37f3a9b37360173f0ec85326dae97ae1eb0000000080f8210425d1f69db9e29a139faf6f06a0a8c84d8b65d83ba8a5756008b2a4f9295318bc2ba130df2d966f0578857fa6bbdf26a1c9c6332813c6f5354488177f1e6eb0106d8384e1f0baa1679e2b134be53818f1eb186034fac5d9a78f7fac557a06000000006285109464afbe514867ce0d2c8b9b3cb19b3ef98916e999d874749a060ca2ad693eaa2aefdb1f474edc6cc0d22f04f1a2ffa6a6819b8f26d34716b58b0d0de4c4e7cc8d1694c061e8fedf57d1b61db90302726686579c110200000080f8200425595d431aaddd9047ddf6be1228abd54f575ed64a9515b18796b3e76ce472f5bdbd168b5ff87cf2ce5c0454943907ccb2d8857339775e3d2168c6d4ee01e56ccd2d163a7dc61af54747bf12432e5de4460b4afad7f2226a681c58565853a54c9005000000d013d3a40913964a8f210e9327d869fc38c787fbf33436a5d1e66db9bd07c3387e325d1cdc5657bac499209699e1a32ce163e7bbbd2d9c2f5ad04e8505bdb3193c3b70f85806bd1766f3530e403c539195d937f8379bfcb4ef60d6807548f1e286031fbfb85508197d218867b6fef14a897414bd2b3ede4a39d97dd358274fdb68d79ef0adac43e1afeff24b5b3efcfa789f9ed75716d2234f540ae1333faa8fe2220f8d1ed9f3e17b949eee151b1cd4372a13f8f87d1a3daa874654f7051fafc740a784d783af2f00000000880d668254e25faf170a03eabebbfe3cb332733a0fe07bd780b8dcd1bd553cc3f4c189f401ed9763dde3269c99d3bb2927ab2f6845b201692271696176665fa06a6a32d38e5db105aadd7b33a9bdb3ef7de0460bdc7041493d4e93f01ef695c40100000040fc10825482671456af2f20bba36f96863bba5d7671ec657107dfcf18f0f9788f9b8b16b4c55566d71f77b19b39a5535cb41f10c906a489c20d11a64cb093497a0938109e38651303622cf6eccfa2e327fb021e07d5b1a31c8ab6ae3619f973f74bb200000000103784201559b33e9ff61dc81c307b5355e9a2cf7f2ab64d54d76dca1707fdfd5594bb63fe7cfdf1c0ff8b5fb82076b30be032bd77f7650fbb0169a2704384b2b2be755076bb51fcfae271f468ba585217c09f9fff1da59496b83f2cbf631c6a0f8429830400000080e12104a9cc8baf1651c385be990ab135f2f4cea8cbe102d66dca1db006883fdf82799d74fdb50dd233b1e13d6b781d54ff01fad97369b47a5d9e74947c831b229cabb3d2d6b772a4a3d870291d97d405f0e7e77f47090be7b5d3c89a1ee9a8d7e9b37d9d0401000000203608412ac365711b36e70e083d99993e9a3e39b6b53cbc1711779feb3f7bc165719ff8580bddfaffce50417edf4c4e24b804ee7f6f394d172de8185006c7ddedd66cc817bf7e35e0afb3a6b22f40c8b556894be9b82945ffd9bad123ed620386fe66cfe8a44f5fde12f5eb1b3069bc9d967cae99b2faad67e2d7f8c021f5acb702000000485508412af4ef378ae8c0c18103edc0ba9658bcf07209bdb573e0a6acfcf978e07eef9d27e807df392b0ebac3e13fcb7feeb61f9da62913ba0704200e6cabd6f57650538b39333b293faf6f6f2039d72a1d38942996d605640b217562edc0d78fbbc85d737523fdeed7c7e9d74b4f88336ffcba0d87d76b7deb1be7e947df3b4b95fdf675e26be1f09174b1c41100000000e26358b27871bfa136c4ea8b8b2fd0e73ed54c6669d3501e28dfb5ac467c1c0b1e307feb863a2a2c183a93c09b91bebaa290fef94ab1f4ccf0780dcf37aead174bac82052a1e64bbdc066a6fb7504f4f5f58b2d9fc949beba6348b7f40e95b4077b751f85a8ac4af472ecbee3c3ea079c3facd79f4f8d3e5d2d1f0f85c7ffe9353347244df4c10af05baf7c12ae9287ebfb8f5144de8177c4e9eb2d11dbf1d418e9ede7034f87a08700bafb1cb65a036e175eebf99ad25cd4f79b91eb1bc6ef0ebccefcde9b3367af8f10ad5ccb401000000a432cc04a9142f7e5fbf6560195b3c7870fefb3f5588fbf7b4f7dbf4338007de5661205e52eca29a6ae7871f7ccccf071b98f380fce1c7ab640d407218dc10a1c769a43dfbe56d2670e458ba58621710698304deb496cb1b39e4f57f9dcb4b5d62781bfc3a7350da7b208b7e2b0438042000000000792004a9d81bab0ae8fd2303f7fa89d7ab6f14d2cf7e3992366ec9156771a2c55f4b53b3855e7ca5986ebf6ba43040575fa7b20963ed4270eb6b88d0da6aa60307e5fd3ab9b48e4bec02780667e2b8be9921de30f642936540096234f875e64d589ff97b19fde677d5d4d2dab7871400000000c4c73469c284a5d2638803774a1b3fce41462957f08efe9bb7e5f61ec488cbde3abb4c34698283d2d3fb06f53cb0e6c5f9efc5d82ad9d163a277f6648b656cf58d5671f6c1228ce78d263f190dc247bf6cc43311bc6167e38534da25fc9d7ffcab989efa5b191d3a92217e7d4ab8e2e3ad9493dd572b76f2b44dfcb723c10d113e7d450b6566f4be5ebcd1e88e5d39b429cef762300e25fc6f5557f695edf14cceb10fd2c5df3b7bde4aabd615d0defd99d421bc8706e145165f577ec9848033b82431d8ebfccc736574fc843ada8d030000006809d604010000000080aea01c0e000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074052108000000000074c5b064f162bff458d3f20b0ac86ab54a470000000000f2f2783cd474e18274046aa6ab10545854241d0100000000c8abadb515212845a01c0e0000000000744537334159d9d9d2230000000000657475764a8f40cd74138200000000000018cae1000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040571082000000000040570c4b162ff64b8f41c5fc7e3fb9dd6ef27a3ce4131ef307f97ce2f3780363633018c40fa3f0213c2093c94466b359fc0000000000ed420852299fd74bdd763bb99c4e720a1f1e21fc40e258d3d228cd6a255b7a3aa50b1f00000000a01d08412ae215828f43083edddddde472b9c4591e483ea3d12806a18ccc4cb2d96ce2ec1100000000a42e842015707b3cd4d1de4e7621fc20f8a81b97cc65e7e652765616c210000000408a42638424f278bdd4dcdc4c75e7ce5177571702500ae0d9bab696163a2fbc675d9d9dd2b300000000904a10829280c34e5b5b1b9d3f7b560c3f907a380cb570183a7f9e7a1c0ee959000000004805084109e6ece9116711b8fc0d529fc7eda6c6c6466a6a6a1283112456bacd47d326754b47fa32636a17a5597cd2917e8ca8eea1c242fd358ac9caf4d29409fabbd68d463fcd9b8d597700901f425082f87c3e6a1606ca0d0d0d182c6b10afe7aa3b7f9e3a31b39750b36776d2a2f9fabca1b0687e8778fe7ac303e28fcc6f938ef4638ef05e2f98db211de9c7a45a3b7dfc63add21100807c10821280f7f7a9abab13bbbe817671d06d6d6e16d779617d57622c98d349f3840fbe5bac2766b3bf77502c9cbbde70f89bafc3f3e6739e3fb793b734d315feff3d75925d9cf5050090134290c2ec763b350801883739057de0755e8d0d0d622802e57029d8f4295de2e068ca04bbf4ac3e4c9dd42d9ef78c69ddba2a89abac705259898b468dd057499c58f639b95b2c899b50ab9f6b9d03dfc2791de24d8eb9b350120700f242085250674707355db8403ecc0ae80e6f70cbb37f3c0b08cae052309e1161f3e6e8ab4c68feecdef3e500c441482f1648e7cd16eae83d9f230480c06ce77c1d9d37073e0e7e4c4fe70d00898110a4106e7cd0da8a3a663de3d9bf86fa7af260165011fd4bc1b854482f6542e242f17ee7aea792b8fe65707a0abefdc39f9eaef579fdce9b67c2501207007242085200ef1fc32db001b8248e4be3d00c435e836740f86ef1449d94094d9938707d44ff19312de332b8ea2aa77444346eb483f272b47f83412c859bd277adf3398f1ba3fdb6fc1cf416cced0bbd7c8dcf9a81c63300201f842099391c0ecc00c1003c13c46db4b146483e33a70f5d0bc38bc6f560705380deb551da2f89eb3f200ed043b7341ef80f0eb98172482de3a03738e4eae1bc012071108264e4723ac53540e80c0683b95d2eba205c1b208f6083212e9dd17a9950ef9e2943cf5d0feb2582bde78303a116053bef450bf4f97ecf9ca6cfbdb1004019084132e1bbfc179a9a10802024de28b71d9be4c68def8acf9e39b42c86ef1ad78ed176491cef99125828de1fb7cbd6729b70ee043772448f74d467fcb8e0af8756f0809f07fe83f1b53e66a4b64be282053dfebf3f733a4ae200401e08413269696e461b6c181637cce811c210c46ec6d4d07783fb370cd0a250e71768a1ac5517cd0b7ef320d04259ab8295c20568f95a1f332af47a2f3dee8d0500ca400892013742e0fd800086c3338562db74ac0f8ad9fcd9a10741bc91a656f1807f6e9873d7f2fa98707bc468b914705e98f35ea4e1f0372fcc751e2e180200440321284edcf50b9de0201a1c80d03c23365cf2c5ddd04211cb844669b34c884bfd42dd1d673c70d462491c9ff3d8d1a1dfd389b50e4d96c4852afb0c282a74d3881a6dce2a870b783c0bccb3c10000f142088a130720dcd58768757775898d34203a91ec1512eeee792a0b77779cf1eb3269bcf666a4879be1e2e0c76ba2b4863bfe0dd704408bd7fa88ea1e31e08533dcff050080482004c58107b13c980588450b6683a216c9a04fab2571910cfcb438288ee4bce7ced6def7e1605d00079b374b7bd77a24efa5d61b810040622004c5016570100f0ed10eac258bd8706b6202f82e7275a5b666d9468d18feee389b3ba753536dc2b9cc6d42049be04e9ba4add6c93cc00fb70e2aa0aad215d175914ae6cf1abe8326cf7af2a6c10000f140088a91c7ed46972f881b778b83c84c0cd11e3a18addd218f6456800db77e26d544baf753effa19edcc824d99601fb6ec33e0a2f9daf91e525eea12835d24b4380b060089851014a3f60e7c0386f8395d2eac0d8ad0bc28ba80696dcd40349b82461a98524134ef63b8ae81a9269af7504bd77a34efe1fcb9da9af50480c4332c59bc1885b551f2f9fd74fecc19f1d7d4e4a7875e71d0ec2ce9306a26daf5a895beff927428b3ab6ef0d2672ff5506da18fd22c81d758f869e7365273bd910e6c31d3d37f36d011e977525d6656161516164a4710caa30f1c0ddb1d6db0effd642c35355ba4a3d45559e1a465771e978e86c7e7cce79eea7826e44f0f1f8978ed874bf8fe70c3cdb5e4f1a4f6c89807f68f3f7824aa8e77dffec1386aeb304b47a9ebaedb4fd0e891915758fcf23723e8fd2319d211004074108262c0fb02b5b4b44847a9c8474fadeaa15a93741835654250edb55ebafb3f5d54fe61f009a3cb426b9eb4d0d257a5e3146614463d15d5d5e2af5a6130f8e9a6afd75149b13ceb15b8dc69dc98e8cabcce9db7524767cc17f9000ea789fef0a70aeaee1e7ef23c33c34bdff9661da55be569db9c9beba58ab2e8660b0f1fcb209f4c5da3eb1bd2e889bf9491df1ffefab408ff6fbffbdfe729275b9e4da333d27d51b7803e71ca463d3df21438b4b59be90f7fae183654c97ead0bafe3b8284b1acf9e4ba3ce2e794290c361a447846bdde118feffce7f7eb181c68c92af2c7c6294dd0d1b1ad3a8a5559ef3767b0df4c4d315d4d49cfa6112002283101483baba3a72bb22ab5b56271f3db7b687464847d1933f042dbac54d775de9a634e93832c2d7f184f075bc201da6309e09e219212db1a6f9e9ba6beae9d28fa57603910f4ea6d3effe5019d5ac122f56ffd177cfd2c811a9bd6ef0cd0d79f4ccf3a5e4f644162cb2b3bcf4fd6f9da32913bba56752d3bb7bb2c400d46d8f2c44f3b57efdb57574f145a9bd3ee7c831e15a7fac8a5a230c1626e1e5f9d2e246faeca75ac43098aaced559e981df578abf02807e98264d98b0547a0c111037474df5d6c697f9e8ba8f7829f6220223d5bd63a61587a4c3782df1d2135f71c5f0f5f8a962869f6a3e30d186b3d25329ca6030504666a674a40d5eaf8176edcda613a7d369c654def324b506493e9f815e5e5e4c7ff85379c483e100bb43b826b7e49341c80e13c63984f757fa8d14c1e7fbc02355f4c6da42f1758894cb65a4cddb72a9bbdb4c9327dac994626d8c9d2e033dfdb7727af61f42f073473ea3c4d7fa3bbbb3e9f4599bb89127cf8aa512e1c71abdf46a313df66479443340015c117ee05026bd773883a60bffc76dd6d4ebd0b76a5d3eddfffb2a6ad740392100440721284af6ee6ee187448a775f9a2984a0b95e8afd9e979c21c84ff7dee1a4b1e9d261b48c3e1a33c948efbf6ca433d253a988c375764e8e1886b4a6ae3e8d366dcda5dab10e2a2c90a7544a697c27fceefb6a68eb5bb9c3968185c203c483c20071ff7b9934634a17a5a7a7c600f19030a0bdf3b723e8e4199bf44cf48e9d48a79dbbb2c52094932d535d9ec2ce9cb58ae7cdef57acced75969d3f63cb19c2d55ae759ee1fcf5fd35b46d67ae7014dbb5ce9f63c3e63caaaa705279596a5449747699e87742f859f9664154411f00b403e570516a6c6848fdd6d85f77d3fa6b87969eb98ed8e8ee9723fb61d0f29e81769d970ee2217c1deb85af2758199cebbc959eff9b891e5f4554bbd04f5ffd86932e1f156c2069a4034fdbe8a667a5c31455525242b6f458d3a0fa71b9cce73fd542572fbe4026937abfedbcfd6e363dfa24af8990676d09e30074f37f9fa35933d4bba927cf66fce35fc5f4daca4231c0c981d772fdd7571ae98a4bd5bb8692cff58d3585f4fc8bc5e26b2007bed6bf705533fdc767f95a979e54210ef97ffa4b19f538e5bbd63f71719bf09ed78b25826ac5b3578ffcb182da3b31fb03a067084151aa3b7f9edcee14df9cee16176dbd72e85dcace3de9f4c91f27f68ed8cd8f39e89ab1412ec1562bddf345132d970e7bf9e9ee677be8e2b2207ffe988daefe9691eaa4c3549497974739b97c3756db789dcc0fbe7d8e4a8ad575c79807824f3d5b469bb629f71e5cfad136719d94d5aaae6fbb8d17d268d92355e26c88127826ec3bdf3c2fae1952131e043ff868a538fba58431231df4ffbe734e751b9af2b5ce8d3e38f02ba1acc4453ffcee59aaae5257fb7f6e72f1fc4b25f4c6ea02e91900d03394c345815b62b7b7a5f6226f56fe312f7d69f4d01995fabd69f4d236e920217cf4edef79a870c84d48031d599546f7ee940e3f64a03785b1ca7fcdf0d1909babb906f23e6ba2217f2585188d46cdad0b0a86bb6eaddf944ff9f96e1a59a38e41d2c95336b1ddee2185dbed9e3c6da36d3b73c4cd307373d41108d66fcea3650f55cbd6652b98fac6de92c891239cb275518bd79e035974f7b21a4517c3b7b659846b3d8f8a0b3d54a39240c08d3eb8ecefd871e5669dbbba4db44eb8ae38ec7369a01aaa7cf91afcd5b211b46bb732c10f00520f42501478dd46a7063649fdec620fcd1b329b62a0c6bd16faf73bd261222c1642d082606b93ccb4fd6e136d09b66fde3e032dfaa2874a0637ea128294c168a6e57ba4e314c4ef4876b63e7e40ab652139aff7f9f71b85f4c81355d42d0cdc12819b0ef00091cfb9764cf206885ceec79dc096af2c94ad0c2c1ca7d434815b584f1242a090f993823bddfde5b912facbf365622307a57984d776e7bbbdd7facce95d62896032f0ba977f2d2fea6df51e65a38f58f0ffad7d07b9694226cd9896dca609dce570d94355622805000848d28fa1d4e4f3a55ee79bc819a9b3517a9828e3bc1474c8df6ea22321d71b19a92e68733e1f1556ababc4285a5e4f6a2ca4961397e3fce8f631626bde44e3cd2597fe7a04bdf072891002a427138443c773ff2ca13bef1d91944d2ef9f5e6d79d5b4127daebab0be967778e12efcc271acffadcb67424ad5e9ff87228bed66fb97db438139368dce883673afff94a71c29b0070a9e12dff375a9c794b340e7bbf79a09afef4d7f288dbbc03807e604d5014b8210237464875b73d65a7abaaa5830f19a9b9de40d985be81ad8cbd46727509a1e480895efb9b91961f919e97c135cb9c74f38c20a3cf3336bae8fad03fb042fd3dd7211b5dfabdd4fe4157535323fcaf5441ed48820516922ff95c131913d05639da7d6094c49babde7cd37971dd8cd2c456c8ff2ea657dee0e607c9bdce2c661f5df7d50671217d227017b0bffda364d8cd4f95c6d7375fe78b3fd39c906b5d89461fb1e20619d77ee582f8de2b8dc3d7438f5526e5260300a40694c345813748b5dba3dbd15a8d3ebad84db543d67efb2923cb3fb49391f043da64f351498d873efa192f7d7a9a91ceae36c8d28e7aea15de206579449d272cf4acf06f8412eaef997accf4e4bf533b407063042db6c91e9e415c8fb3777f264d9bd24d1919ca0c929c4e033df9b772fadb3fa3db074649fc757097ae8e4e696f1d853ae7711be3bbee1b416fbd9d231c25ff1ae319897713b08f14b742e6354f6bd6e7277c1624180e9fefbd9f29762853b2753a373ff8d35fcae9ef2f253ff805f02c98d2add379969567779f10ce5dceae7700a03d084151e0ae70a91f82fcf4a5af79a822a62d40fc945de6a14b2e35d2f9b78d743cd89a9d287cf61a57903046e4aa0f1f829a67f9823676208789f6be9cda1de272751b827a0516925796bbc40f3971e7b35ffe7684b8778f1a1d1706886fedcca1a993e51f20f25a9cdf3e582d0621b509ec233566540f1517c9db348183c65df7d6d09973b1ef79a494e6160baddb9c4f1565f25febdce8e34ee1bc396ca94d679799d609ffc7f946c7d8d1f2eeb9c75d0eefbebf8676bcc3411f00203cdc2689825faecd33922dce0aa0b46a27fdec361f954bc78956176a7c98e5a75ae961aad2c8151617be7bfbc2cbc5d2917cd66ec81307496ac6eb647811b7dcfef14ab1aaef8a73c9d2eb0ab42d7eed8d4255ef05c3256a2fbd5a241dc9678dcaaf759e997ae9df45b2cfcc6ddb992d06400080482004e950dd1913c57bdf316da29b6e5b221d806c0c5a09da719a372bce69c620e6ce51ef46a5fdcd55e0dc2f9adf2e3d52aff9b31578cf15f89c729b3b5bfeeb5289cf29b7d933bb645f13357f8efadf6f00500f84a02868a34cc940f77ccf4a5fbddb461b0fa4d1ae8d367ae69174bae53b1974d165d2c777d269e99f6db4ed44b829232f4dbd44cbddf292c3afe352b8fee62a309899546ba7ac4c65d621c885bfbe09c2d72937b50f8a79303c4781f0b7606e87eafb8ccc9b25ffb60bd3267553ba4ddddf9f9538eff2522e2d54d706ad00a05e084151d0d25a8dba7546fad9ff33d3f7ef34d2e3af18685bffae6f470cb4e67923ddf24d2b5dff741a851a9aa455fbe81ae9b12ab80dd4243d4c55884024eeae3faaa6473a920f0fb4f9eeb39acd9badcca07dcc4807e5e5a8b7053b6f1eabc4a09d4365ed18f5aee3e46bbdba52fe413b5febb366a8775624cde2a36993bba5237929318b0c00da841014053d0e508f3c6ba64776869811caf2d148e9612c4e36c7b638e99ad21025145d4278931e42ea9a2f0401a52871f7594ef3142cdfe25911b5e2f0a71435cf822959a6a84479a15c66cfec546cd35825669101409b1082a2a1d352a5e57b4d216683fc547099f43006ae109549d98531fe70d44015849e3bc305283968e5bbcf7c175a8d782664ea24e5662d940c58f1e04b7efe5ce5be36254375bc94bcd6a78b6dc7d579adcf57f0bc79169967d800008683101405a351a72f57c82a1a23b95ba5873178a93ec4eb99e3a7703d17c697044f4f9deda91d208c08408a972ff1dd67b596c4f1dd712537cfe4b5466a5c13553b56d9af8b07c42347c85f5e192f2e4fe43245a57000e220a436fc7f70e67465ff0faa35f00380ba200445c1a4d71094ed27abf470203f75ee921ec662bf919aa58703e4fac2b4baf65179bef4700003d59d4ced1061b2a86f0f97448b76213bb7563e7c2c433a8acc5c216ca851b46b19de3f9211d56ef8fcba2ad1792e5ed19ef7e93356aa6b88aefdb31adff368cb135b5a2d74f48374e928326a7cbfa74f896e86aadb6ea27def45b7df915aff8f0380ba200445c1688a73839d1475dd0c2f051d72b49ba87f3f85a8ad35d2c9a037043d547bb3f470b06bbd541b741c60a6ba9dd2c3146531ab773f934489e60eeebbfbb2e9c7ff3786eef84d0dbdf45ab1b8137f24782648a9f508b1e241e1cc6991dd1de7bd555e7ca588eef86d8d78fefb0e463e4054e31df2450b220f036bd6e5d3ffdd358a6efdf9285abf39f2fd94d4b83e269af7e29dddd974cbeda368e9af47d02baf17467cadcf5178763116d194271e3e9a41b7fcdf68bae7be1a7ae6b95272bb233beff1e3d4df091200920f21280abc5ec394e203d525b7bbe9a95ffae8aa087715adbdd643d74c097ed7ce75de402f498ffbab5deca3879e72d2fad77a840f273db7cc474b2aa4df1cc040bb4e06bb04fd547bb197ae928efaf869e9159ee081acde482fc5332ba5026969eadec85369bc2666f284e14be17820f4f4dfcae8de07aba8bbdbf86128f8a510865adb87ffffc98163da14759509cd98d61d5130e3f35b7acf880f431f9fff3df7d7d05f9e2f1537a01cce9489ea6a9d3c6a444f445debec0e93f87e3f29bceffcfebb3d467afce9727af0b1ca883681adac708aed93d58207e891b442e7f3fcf35fcbe8be47aac4d780aff5175e2ea1bb96d5505bc7f037e5945e6716ad485ba1f379f266aafdff4faf7cb3806ebf6b2435340eff7d52e9756600a00da64913262c951e4304dc6e37b95deaf9611aad199ff3d0a7e6b9e9a39ff1d07f7d9ee8927944630a0d945548e4386520be175d3ec34f0b2ff5d3fffb918bbe7db12744299c910ebd6ea1e5fba4c380255efadb779d3432d74f264bef475e9987167edc488e7f18e980f4c702f60a03b9c5177969484153ba8fe65f6624d709e1efd4f77e4d3fbed34997d7041b281aa86ea7851edc1cd95d42b5cacbcf27934e671bd9a2791dc3de1de701d09dcb46d2ee7d59d2337d9a5b2cb4614b3e8dace9a1d292f00ba33930f0dd75b5f8c2554d545315beb307cf7cdd7ddf08aa0f32083c763c9ddedd9b250e78c3dd01e78ade33e76d74e66cf0ffd58976e5275a8430107e5dcc51e1dc7e756f0d1d3f39740af8ec792b6ddb912b068afcbcf061aaadcd42ef1f8dae7452291f59d84eb367849ff9abab4fa35f2d1b417bf60fbdd62f345968d3b63c1a513dfcb5ee7419846b431dd7fad48976baf4636dd251701c7a7efb60356ddece337d03bfa7b7779869fde67c2a2c700be71efeff0bdf54d8b23d573a0200180a21284a7e9f8f1c0ee516b32a6dea155e9a57d61b244c361f15967969d22c0f5d22849d2f7dcd4d37081f5fba4238169eab10824c28ae1356bae72e217c48c701377ec745f38a83fc3d9b9f328c665abe473a0ef8c048858bbc34b560e8df31650b5feb157d5fd398fc105f8fc3422fffca44bb52f8c61f37ddc82f28908ef4e98b8b2f504559e81b0c1bb7e6d2bd0fd5506b5be8d91e9e25e0818fdd6ea2c9c2802bd4323e1e38beb632f2b22225f160edc6ebebc812622688cf89677afefaf7f0e540d10c10df7a3b477a945c37fc573d6567050f6dfcdefcebf5227af44f15e2fb190aff1e875f8bc54fb5631c21d79465647869dda6a00b0a13ee4bffd1446525a1af75fe3a973d54456d6166365d2ea378ad3b9dc2b53e21f4b55e52eca6e5c2b5ae06577db285468f0cdda42210f4390086e2f51ae8edddd974aece2a96909a435c1ac5451e5ab1a620a2195200d0a7e1eb0860009bcd263dd231b785563f69a460d5678559a14a6d7c945d2c3d1ce49167d2e854cc1d4d8d74e40d0b3d7e5e3a4c517abfaec44e56214ad4b8dc89cb9e1e7bb242bcab1d89156b0be8ff7e15ba7486cb84268d574799d0d430bbfbf360f067778ea6d5eb230bc8fcfafce1cf15e2eb15eab58ab4f44e69e14ad47836804ba1fef9af62b1346a385e21473df74f2e131b419d9dc147c53cf856c386b1fc5e4f13def360b8e48d4bdf9e78a64c2c858bc4f25505f4bf778e14678782e199415e23936c1c4e433583e070ffcc737d25ae91e0207feb2f46d3a933c1bf778aa577689000006120044589d70459f4bc76a3d542cfdf61a17bb64bc783347785baa40ce40c55fdb1dd483f7ada4acd51af633552dd462bfdec51e93085e93d04cd9a11bc59010f707ef2f3d131cd5cf0dfe54152a8bfab969de54375f0dab82557f8fa47d1d973d17fbf093740e4c039636a644d1894343fc47973a3875b6e1f232e8a8fd6c1f73384eb658cf86b300be7257fcfa050add04f9ce26b7d544c659ac3fd3f514397b850add0f9460507fd956f463f4bc77f9703e01b6b82df2440ab6c000807e57031ea49d19238eb18a28f8cf79135daf8eb35d1a9ed56faddafccf4f743d27341ec12c61e5f9aeb1dba8ea82b8d9efff1d03541015d078db4e1bc8966ccf4526124633eb79976bd9846d73fd0bb8e299571c38d82c242b1244eaffee3b34d545dd957c2e517c688afaf2ea0871eaba4aeeed8d74971e9cc8e7772a8b1298da64e1e38035258e8a1375627b74c88ef8e7feb1b759496d6f775f1ccd7efff5441afbc5e14d12c4828ddc2ebc61dd46c361f8d1b33f0fb955852f46e72d7897ced2b0d94d76f1d0f972dfded1fa5f494d4fc2056fcfaf17a12fe1c13c70f2c13e3d779e3d6c8bbca29e1eacf37516579df0c185febafad28a4479ea812db41c7ca235deb4dcdc2b53e896f2a48bf21282e76d3ebab927bad7ffaf29621d7612425aec3e1b2c97d07b2e8e80719346b5ae780ff4b5c0af8faaa02f2c6f1ff0800b40b212806dccab8b33335ef30d5bd63a4679fb5d0fb6e9310848c64107ee666180d62038301bc4672d98d74f6a485de5e9d460f2e33d323af19e8f870a77dc848c7ad069a3ad247d962983150677d1abdfc80999e3c2bfe8990ba4e18e8df7fb7d05ea7894a0afc946d3390f5c3af4bf821e63652e7050b1dd89846bfbe5bf87c1bb5f1832d232383b2b2862e7ed60b0e26dfbaa18e4ca6def79acb99eeff7d35addd902fdb9a9dd3676ce25df289e31d9497db3bf0b6597db457183cf1fe2bc9c22579975fdab7e330cf06dcf9db117424cabd8f42093540e4c16132d744f106a65ffd62a374d47b47ffeefb6a646d56c13349bbf765d38ca9dd9491de5b6ec8ffeeaa370bc8257c2f49069e85fbe6d7eb3fbcd6b9c3db7d0fd7d03a21ac72189203cf0a6d17ae75ee049893d33bf3c2d73a374708b7c64869dfbcae5ef85ed7fb3ef40ffa1cc8e5d070218d366fcba3b1a37bc4f79971003e793a5d5c3f0400309861c9e2c5327debd597a60b17c86e574feb51485dc52525949e1edd26885ac2a570b77cef8cf898cb981ef9635544ed7f63c183cf6bbfdc489ffc448b78bc7c6501fded9fa5e2e364f8fa7fd6d3951f6f1507c07cc7faef2f978aeb5b94902f84bffff9f6b90fd787706bed68f61892d35557b6d07f7ea9417ccce1349af55ed1ca48f7d2b785901d581fc2eb6d92d52081cbb37ef09ddebb417cad3ff85855c8354cf1e24611fc1af3f5c5787f216eaf9d0cdc0afdee9f9f101f7348e3754fa1d630c5cb60f0d317ae6aa6259f6b12cb0eb7be95438f3c5129fd2e00401fcc04c5c86cb1505757aa176241b2f1de40f9f9eae858952c9fff746f29dc3f5f291106a8e511edfb122b9ef9d8bb3f8b4e9cb489eb62ca4add6207a964b9e91b75e41606ff7d335fd26f28805f572e3fe212bb89b50ef1dfe56e5cc9c083f3cc4c1f3d2ebcdffff857b16cb301c1708381ed3b73a8addd425326d9c5d9b0ad6f25a77532b742e752380e237ffa4b393915bcd6f97de6f6da816b9dbba5f12c5832702bf4f1e31cf4c69a42b16947571c25aec333d0a12319b45f08f833a677517595935e5f5d1857692900681342508c783f1771cf20e1032056050505641102b55ef19dda2f7fa189ee7ba49ab60903d544a96bb08aa533bc692a97a0717be9441b3bda21eef372d7b291742a61fbf6f40d107960ba7643e207c5dca1ed928fb4d3af96d5d07bef276e268adf675e3373d9c56db4797b6ec25b2773d927af7dfbed43d5e2d79128816b7df6cc2e3a722c9d3abb127fad7f69f1057ae2990a5ab35ebe12d7e170992bb74e1f35c2495d5da6a0fb6b0180bea11c2e0ebc696a5ddde09d720022c3b34065e5e5d2913ef52e5af727f52eadd9e4171795275ab2fedd804087b244bff65c92a8e4cccf70b819055f774a951d86225eeb7ee15a4fd23a2c968c6b2e59af777f1c40b15f10000ca6dc5cbc0e70ab6c5ed40e108b3c9d97c1319f2ff183f0c192154492198018bfeec978ed93198018971c2663402e5eeb490c402c19d75cb25eeffe108000201884a038e5151490a1f7763640c4383c63e35d00000080e4c0e83d4e66938972731257df0da98f4373be109e010000002039108264902d8420ab15fb1040640a0b0bc5c61a00000000901c084132e01dff8b8b8bc5592180707284c08c756400000000c985102413a310808a4a4ac44004108cd566433304000000001540089211b73c2e2a2e968e00fa7027c1125c1b00000000aa801024b3f4f4742a2c2a928e00788f0a3395f02c21ba0802000000a80246650ac8cccca4bcbc3ce908f48c1b20149796a21102000000808a200429242737970ad00659d72c3c03545626fe0a00000000ea8110a4a0acec6cb1340ecd12f427cd62a152042000000000554208521897c6959496a27db68e700b6c0e40dc311000000000d4072128017823d5b2f272b2d96cd233a0453ce3c72590dc21104d1000000000d40b23b504e159019e11ca1306c94694c7698e58fe26bcbf5c020900000000ea8610946039c220b9aca2826ce9e9d23390ca38d0e6e7e753697939a559add2b300000000a06608414910d83786cba630704e4d5cfa962d05daec9c1c34bf000000004821084149c40be8cbcacac40f7e0cea6712022cef0155595545f9050562a00500000080d46258b278b15f7a0c49e6f3f9c86eb753775717399d4ee9594836a3d148199999625045730b00000080d48710a4525eaf977a7a7a7a3f1c0ef11812834bdb2c160ba5a7a79355083d083e00000000da82109422fc7ebf18847cc287d7e7137fe5378e9fe71924ac48898eb88647f8e056d6dcdc80677bf8c3643289bf628d0f00000080762104010000000080aea031020000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e80a42100000000000e88a61c9e2c57ee931a410bfdf4fe21bc7bf0a1f06f1598894df6020037f088ff95700000000d00f842095f37a3ce47038c8ed76935b78ece10fe131c8cb683492d96c26b3c54216e1d734ab956c361b021200000080062104a990b3a787ec763b39845f1178928b83507a7a3a65646692c964929e0500000080548610a4126e978bbababbc92e7c78bd5ee9595013abd54a99595994919121ce1c01000000406a42084ab29e9e1eea686f177f85d460341828333b9b727272303b040000009082703b3b09b89141775717d59d3f4f8d0d0d084029c627bc7f9d1d1d74fedc396a6e6a2297cb25fd0e00000000a40284a004f3f97cd4dad242cdcdcd62b303485d6298edeea60b8d8de4b0dba5670100000040ed1082128807ca3cfbd3d5d5253d035ac06bb82e5cb8207e70f73e00000000503784a004e1753f3c4846d303ede290dbd8d8482eccf001000000a81a4290c27c3c4b200c8cdbdadaa46740cbb8a579435d9db8e60b00000000d4092148416200ba7041dcec14f483d70af19aaf8e8e0ee91900000000501384208570d95b437d3d399d4ee919d09bb6d656f10300000000d405214801dc018e03901b8be4758f6783108400000000d4052148667e2100f11a20740983000e429d9d9dd21100000000241b4290cc1a2f5c40091c0cc1b341bca710c82b2fc743175fd42e1de9cba51f6d13cf5f6fa64ceca67163f4b7ceb2a8d04d172dd0df3a4393c944b5132648470000f2410892517b7b3b397b7aa423803edc2ca1051be4ca6ed1fc0e9a374b9f0d28e6cdeea4f973f437c3c8e73d6fb6fedef345f3f479ad975754507575b5740400201f84209970f8e1bd800042e120d474e182f82bc8639e1002a64de9a6348b4f7a461fd26d3e9a36b95b387f7d0d8a0d06a285421858a0c7f0279cf38c69fabbd6ab840094979f4f191919d2330000f240089281d80abba909835b1816cf0461cf2879702958ed183b99cd7e9a3d535f83e239c2f91a8d7e9a586ba7ac4cfd6cc03c7e5ceff97269d8a81afdccbaf3b53e66a4430c40d3a7eaa7acd66834525979b9f8b8b2aa4afc1500402e08413268696911831040243a3b3aa8076593719b3ba7539c1960f367eb2b0405cae0f8fcf5541ac6a570017a9a05e3b2cf80f93a7abf3900f19a20861004007243088a93c36e27bbf001108d56213863e6303efd078333a7eba74c489c0d98d2251d0d0c065ac7a570017a5a0fc5a57001b3667489b39f7ac0a5700105858564b3d9a4230080f82104c581f703e25920806871591cb7ce86d87049d4c4dabe0e617a2a139a3d73e02078ea24bbb84648ebc68e760ce886575eeaa2ea4aed77e20c947d0604d683691d97c27153840083c180d92000901542501cb8e5b117657010236ea4c1411aa2377776ef9a98fef4522634b8f48f5f87b9b3b43f2b126cc64b0fef79ffb2cf003d94409694960a61df2c1df542080200392104c501dde0201e5c0e874d5463136cf0ab8732213ebf99d3fb4ae102f4100616ce1d7a8e7a28050cf6def2790fbe09a0355541024f517131a5a5a549470000f141088a517757176681206edc24016b83a2c3e5405c023698582634696840d09299d3ba82ae7dd27a9bf091237ac48e7083555739833eaf1583cb3e03f85a9f3241bb6b51b9f4adbcb2523aea83923800901342508cda75b09e63f60fdcb47ead9db60efe78c543d7487f460957dde0a53f3eeba4f52b1cfdfe5de1f10a27bdfa949beebec14fb5d29f4d755c0ec7811a22376756e8bbe05a9f1908d5054feb6dc2c3bdaf17cdd7ee8c7cb0b2cf002d97c4159794849cf141080200b92004c5c0e5729147eb3bff2ff4d18fae7053220b0f6aaff5d28b42f0b9ed1a274d29f3529aa5ff0f7fe1b1c54b85d56ebaf81a073df58a9b967e4efaad1487ee82d1591066f0c75db4b45a26c44167d68cd06140cb6dc217846987ade5e01baecc71fedca16b85b42258295c40b0b5420000b140088a013744d0363fdd76a38b4658a4c30458748b9bfef87527950f083e6164b9e9f2ef3be9a12f4bc7298cf70cf278faba5e41685cf2c5a55fa17099d0648d960971a91f9f5f285a6d135e55e9123bc185327a64f052b95417aaec33804be526d46aef5a174bdefab5c61e8c7fbf02b34100200384a018d8351e8216fdd44d5755277030b5c44b3fbf329659272fcdfe868b962e940e5398f683b53cb8e46bb8e6075a9d1918eebcb4da267cfeace1cbddb4f89e872bfb0cd0e2791716150ddbfca032c87a21008068210445894be134dd1061a1977e7859226725fc74ef575c942d1d45cde4a1cbbfeba545d261aa42495c641644b041e682b91d9a2b13e2c170ff0d3343d162495c249ba26a310c842bfb0ce06b5d6b2259f353565e4e2693493a0200880d4250947a1c433bf5688710487ee8a272e92821aef5d09cfce0773b5de7adf4ccbd1974d1651974fdede9b4e64488cbb5cc4dd75d2b3d4e516e215c63cfa0f078a663c6b4e1673ab45826c49dc0c295c205f09a212db509e73237ee00371cde4cb4ff46aaa96eb8b2cf003ee771a3b5f533a92a4c295cc0e08d54010062811014255ebfa155d7fcc6458b420412a5dcfc114ff032b8562bddf735133dbeaaf7f0c876032dfda69536d607bbc5efa3291ff12536bc29c0a9e16b4b0e5cea15e99a17adcd0c44da098c839296da8447daf98d67feb4d42d2d92b2cf002d9d77414101d96c36e9283c7489038078210445c9e91cfeae642a2affb287ae9b3db0cccf75cc4275d26365f868f6a8603fe80d7464a389964b477d0cf4b395660aba447a949796480f53959603b61cc275081b4c4b65423cc0e74e6091d252008ca4142e209272c1541149d967c08228ae0db50bd71061309e09e21921008058e13b48147c5eaf3637b6acf0d36d5f720f5a9763a2770e18284b3a52c4623f95072deb36d19197a587833d2bfc5eb0ea0f9397a67e5d7a9ca2dc5a6fbb1e07be2b3e737ae4331c5c2634562365425cdac7257e919a3db34b136dc2b9146ed488c86f0cf0a6a2d1bc4e6a1569d96700bf4ebc99ac1644520a17c06b8250120700f1302c592c8c4421222e61905a7ffebc74a41dd72c73d2cd33fa0f1e0cd4b9cb469fdce9a595df0ed2b4a02b8d1e596ca6e7a5c398dde2a2ad5706a9e36fb7d2fd4b4cf4927438d8d2bfd8e9f2203ffbea36a6d3d577a6ee8a78defba242235d8f4cc220fce61bcf6b6646e6d4191bfdfafe6a6aeb187e7f92fc3c0ffdec87a7c4d6ce5af0d6db39f4c81315e4f586ffbfc5a578b7febf33347e9c36d6631d7c3f83963d5c4d3d3de1ef157240ff9f6f9da3391ad9ac56bcd61fa8a1b6f6e11b0fcc98358bc68c1d2b1da536eed0b965e346eac2e6d500ba8199a0287835b8974bf9d7dd74e3800024684fa3676e553e4c5c531a227f771842062076b831f80fe7c292d4cef35ada2bc8eb33d0838f55d21f9f2a27a72b7583295bf96601fdef9d23230a40acb5cd4c3fbb7334ad59972f3d939a9c4e033dfae70af17d1c2e00318710167ef99b1a7af19522f209ef7faae2737dfec512ba6bd988610310f3780c74df2355f4a7bf9493cb9dba3f52b9c8e18dd5d2b51e4100627bde7d97b66dde2c3676496567cf9ca1b5ab56210001e80c42501434d7bdabc247777f79f0fe3c26daf59ca9779627db4f56f1b9c4ea6c8e6d0095a668ed5e6268addc72c3963cbaed97a3e9ecb9e877814ab6ee6e23ddfb60153df35c694421a03fb7db404ffead4cfcfb7647eab5f2e5d9805b978ea64ddb72a56722e3f71be8a5d78a69e93d23a8b53df576f5bfd064a1dbef1a49afae2814434134dedc98473f5d3a8aeaea53ef5aefec3489b33f7f7d21fa6bbdaeae8e56af5c492d2d2dd233a9836f6cbeb37327edd8be1d1b5603e810425014b41582fcc2e0d445b516e95064a0e6ed69f4fdc0344cb13f860d4c2337b230b6fafd0d4d217e485bfc345b7a98aab4b8e68c07853c33b27a7d81f48cfa1d3e9a41b7dc3e86dedd17f30e5622fefb3ff9f9283a7a3c5d7a46fd02335f0d8db1ffefe7f395e3f54ba47776f37b359a4e9c8aac3b59307caddffa8b5162204a157cadffe4e76368dfc14ce999e87153970d6fbe4987de7b4f7a46fd3adadb69edead574eae449e91900d01b84a028686980bae816375d316a50a8137e80fffa76f597b1d485ca4e597eaa951e82baf0ccc853cf968a33233cc3a2565cc6f5d2bf8bc4b22eb966329a5b2ce2ccc8cbcb8bc49912b58a67e62b98c0e7e3f79ddf7fb5e272cdc79f29174bda7a9cf15f9b6e8f512c8de3cfa7e65940bed6fff9af62f15a6feb88ffebe49f8fef1d38401bd6ad537da7cb63478fd2bab56b51fe06a0730841d1d04a085ae8a39b3f3e687f1eaf99d6fcde44dba443480e4d761fec8767067886408d33231c7aeef86d0dbdf86ab1ec6145ee01a7dce49af90a8667007926309e9925a5709926976baedf24ffcc4defccd2a8b8669694a264306f6e6a12cbe31aeaeba567d483d72ef11aa6bdbb770b413ff53b0902407c108274c74f4bbfeda41183cae0ead60b3f14b74b87000ae2b0210ec05e53cfcc48209c711850921ca547725262e62b180e1bb7fe62346ddc12dd1a2325ad599f2f863325d7f070d8b8fdae51f4ca1bbcc6483dd7bad2259a1c36b66cda24860db5949107c219af610200600841d1e05d0b53dca2db3d7479c5c0d906d7192bddffebd43f37721ba8497a98aa0c1ab8c62221ce8cbcd23b3392cc05f45ca6f5cc73bd0d0c1255a6c78bd0efb9bf869e7da144ec2c962c4ace7c05c365678f3dd5db6d4e8eb2b35871891a97aa3df96c5942caf478c2e18597b8db5c726701b94c8fcf99aff54495e971d9d9fa24979d89657a070fa644991e002416425014527e807aa5977e7af1a00d39dd665afdb831296570279b63fb411cb2b5769781d6480f53964e425040a00c2b1933235c9ec533012bdf4c4e2bebd75717d2fffd6aa4d8912cd11235f3150cef3b146f038258f1ec07cf8270a95aa2f1be43c99a05149b93dc314a9cfd4ab4b6b6367a73f56a3a9d8406041c7a36ae5f4f87841004003018364b8d427757173537374b47a9c64f773fdf431717cbff769f5a95415fbd573a88c292df38e987b383d4659fb1d145d787cee7433777951c13fedeb7523bd7f38ee946a33eef4d7cfaf216bae6ea4671f349a56ddc9a4b4f3dab8e3d8c6c561fdd747d5d423696e5998fe7fe599ab4e0d79fc944f495ff68a0cf5cd9a278f6e7992e2e4953cb1e46577db24538f746e13550fe5a5fbf39afb7398527f9df57f8fbdbecb973c58da195c6656f6fefd891f27b1801807230131405438a0f4eb3d2d595775faa0ff17ae6f86989f43098f125c117b476b6a7f62c0acf34ea3500b137d6148833234a2ea0e7322c2ec77aecc90ad56ce23ae06b722af735257be66b302e13fb9b10c8787f1a2e11540a97a071d9e53f5e2e56450062cb571688fb1129390bc8d71597fd3dfe74b92a0210e34d49795688678794c20d0f782d92163671050065210445211177af7465bf9182ceabe5fac2b4baf65179d0319c81ea4ea6760832f1ad719d1337e9fcc568b1644a6efcb9b90c4b89cf2d079e9de20d4a95d85856fcdcc2ebaac64d6bb93c8ccbc4b85c4c6e81cf9d8cb2bfe17039a052d763e07327a3ec6f38bc3e68dd9a3574f4c811e919f9f0e7e6fd8a782d1200c0701082a260c620555e6b8d7432e87a590fd5de2c3d1cec5a2fd5066d6a64a6ba9dd2c3148590dd8b67685efc779174249f751b7393b2fe261a3c5bb36e93fc3335ff7ebd4835335fc1f06ccd8a35f26fa6fbfaca42456799e2c5b335afbc5e281dc967ed863c555febdcace0fdf7de137f95d3b93367149d6502006d41088a82510841a9dc1cc1d9652497238a8f909d930c03fe9cd3293d2da95deca3879e72d2fad77a840f273db7cc474b2aa4df1cc040bb4e06bb04fd547bb197ae928efaf869e91583f6370aa837d24bbba4c729ca92a6bebbf4c9327f76a7f4483ef3e6c8ff3995304f817357e2f594db7c05de9f79b3955f67152f25de6f253ea7dc2a2a2b65ff795a5155253d0200181e425094ac56abf428d518e8966b6d74e967a3f85817e20e6a97851eeff7e7ae7f487a9e2df1d24337f7d0ec6a2fa5a5fb840f2f8d98d1433f7cd84bd7487fa4bf6756588297c4e5bbe8477f11fece8cdec3f21942007ac239a4bd772f03d5bd67a414cf40948610f4212502cba4f176caca0cbe9e4c2df8eb1b3fce2e1dc967de1c758701a3d14f7366caff9ecf9fdb290cb4a503955222fc4d9d64a7749b3af6e709a55281c0929d9d4d39b9ead98b0a00d40d21284a569bfa76ff56931b2f7153d02af45c375df275e9717fab4cb4fa58f0d9a0b40a27ddbccc4e5bd7dae9c5650eba7c54881fea0e33ad7e3a7567e802d2d395dbbc30951415ba6944b5fcfb79f06078aecaef902f9cd7a1c8a07dd4881ef17555ab6993bb1519b473a89c502b7fa8944b79a98b2acb074da5cb400c95b3d47bad73e96f4969a97424afcaca4ae9110040780841514add99a0c428cc0a3590f15176b1f47090479e49a353318fcf8c74e40d0b3d7e5e3a4c515c0aa7e7ce70fd2d12828052e6abbc3c4ac932a6052a2e0754f2bcd55c12b750c1b6e80b547cde5c0aa7d4f73b6ec30d0010098cbaa2c421c898c2eb8294d6dc15ea92329033d4a6e1db8df4a3a7add41c75a59291ea365ae9678f4a8729cc8619c60f29b97647cd65423c6bc1257b4a516b18e0598bb90ace5a2c98abe2f0a7e0b53e6d4a37a559d479ad2b1954b81c2e23437ddd0001407d1082a2c40b39d33313bfe377aa787c839982fe58efb2d0ea3061a5ee0513ddf41b1b1de98a3060bacdb4eb052b5d7da781eaa4a75259267e688bf2723c3466a4433a929f9acb843808f0d7a794b1a31de2ebab364aafd5e2731e279cbbda2855f619c09b0ecf56609d55bc782b80d2b232e94819d53535d2230080d010826290891014da4b66bae38534aafb30cc18a8b33e8d9eff8d999e979e09a56e9d91ae5f9c4edf7fc246bb4e98a8d3d1fff2143e9fdb287eae5daf0b7fe68634e1cf6963468eebe3d3506629e23531d1d8b33f8bfef57a74edb4d5da292ddad990979717d1de03917f2fe2096c35ce06cd8bf2bcd7accf17f73d8a861acf3bda52b877f764d1bfdf48fd6bbdacbc3caa52b896e6663ab87fbf741419259a2e0080f618962c5eacdcad470d3b7fee1c793ceabbab0aa927372f8f72d1d148b4f4b653347eecf025611e8f819e7fa984de58ddbbb7cce40976baf9a6b3949733fc8c02ffdd1b6eae259710aad5824bf4fef4f0918866825adbcdf4e0a3951f6e007ad5275be82bffd14826d3f07ff7bdc31974e76f474847c9c7c1ecf1078f443413647798e8d13f977fb801e80221447ceb1be7c99a36fc7937355be87b3f192b1da9c3af6e3f19d1aca7db6da0bffda39456adebdd3f8aaff5fff9d659cace1efe35e36bfc9bdf1ba7aa6b7dc1a245118794f70f1da2f70e1c10f713ca13be4f2eb8e8a2886f42ae58be9cec76f536c50080e4334d9a3061a9f418a221fcf4ee71a8afc402520b975716161545756754abb86ce96bd7348803e3707843d1bbefab19b01b3e6f0cb9695b9e585e545a12becb06bfd467ced9e8ec39f5ccbef1ac4024cd01f61dcca45fdd3b92eaeafbdaa91f39964ebbf765891dd63233c2af01e112ac556f16a86650cc9ddbaeb8b4553a0aedc4291bddf19b11f4c189be0e8a67cf5b69fbdb393471bc83f272c3df90ca105e975d7bb3a94d08906ac0d7fa7f7da5413a0a8daff53b978d14dfdf00bed6370bd7fa282140951485bfd639189f38954ee7ebd471adf3f7b9d973e70efbfdaea7a787b66cda44a74e9e949ee97deee4891394959515511b6c87f0f399679100004241088a11efe9d2ddd525fb8ed7a02fd9393958c42bf9e845ed346b5aa8ee19bdde1206bdbf7ea0869a5b87ee86ef721969cbf65c72ba4ce2ddf2f0e32c03bdf54e8ef438f9bef48526aa2873494743f1ec15cf063cf5b732716660301edcafdf9c47654200acaa0cdd7299036643a3451c18abc1a7af6809bb5e87bfbdbebaa2881e79a292baed43f72debee3689e76db3f968dc98f037a53abbcc74f0903a4a993ffeb1369a3ea55b3a0a8e4bfeee7da8865adb8606b71ea791366fcf13c3eca4f1dd61af759fcf403bdf0dba7141c295575450cd88f033910df5f5b479e346eaea1c7a53c0e7f3d1b9b367c5199ed2d2d2b061ca6cb188a10900201484a018f11d7cfec06c10c48aaf9fa2e2e261ef8aeac557af6e0c79679b077d4f3c534efff8573179bde1a78a229919292976d3f29585e20031d9b883d78d5faf0b39900d36f3158c47785d7608c1aeb9c5425327759339c4a4072f98dff2963aca2fbf75431dd9acc1dfa3b60e13ddf7708d1872c2dd6bf2fb0db4ef40161dfd204308d19d9416a23c8e678b78164c0dfef3cb8d545410fa5afffd9f2ae895d78b86bdd6b92472f7be6c9a31b59b32d283bf8ec5c2ffa9d757abe35a9f387972c8d25f0e38fbf7eea53defbe2b9c77f852bff6b6363a7be60c95949484dcbb8ff75d3b71fc38cad60120248cbee2c0d3f266d3d0bb930091c8cace163b25416f7be889b5c16f289c3a63a39f2e1d459bb6453e70e7f2a99ffc7cb43873140c078f1953c3cf3a25caec995d62300986bffe5b7f315a7c0d22b5614b1edd76c7683a7baeaf64ae3fb5b4090fd7adeee0fb19c2fb3746fc35525c2a78cbed633e5c2b3598b8316985fc1b93468bcfb9764cf0b52afc3e87bb6e83e9bdd647850cc9fc5e73284e36bed9c33341c1747777d3fab56be9e89123d233c3ebeaeaa275c2dff9e0d831e99981f82653051a2400401898098a037f93350a835807165f429438fc1417178bd710105db4b083e60469e7bbf2cd02fadd1f2ac552a6680d981999dc4de64179d3af9232a1ab3fd744558306e73c1bf07884335fc17475998430944f99993e1a336a60b8e44bee7cbd35aa60a5844f5ed64ae3c70efcdaf85cfffe5209fdf9afe5e4145e8368f1ebc665643ee1f3f05aa1c1ffbd3a3a4c74e848724be282957df24cd7ebab0be8a1c72aa9ab3bfa1b236e8f91b6efcc114be7a64eb60f6992c1e594efec49eeb5ce6db1478e1a251df5e1199dad9b36c5d4c480cbd1ebebeaa8ada545ec3a37f8a612dfa4ecbfae0800a03fcc04c5893bd558d382df710508252f3f9f0c2883fbd0fc412d8cbbbb8d74ef8355f4cc73a5318580fec499915f0e9d199935a333e40c4ca2f0bf3f73fac0017160e66b7314335fc1f0daa1a79e2d155f477e3dfb1bfc7a27c3e016d1bce0fff6bb46d26b2b0bc396bf0d87cbe3b87df8d27b468801b8bf489a4f286df06bdfd96912d7b9f19aaf78aff5759bf2c56b67f0b5ceb38d4aee411589aa41b3325e8f87ded9b993766cdf1e77c95a9d108456af5c492d4218ea8fcb8d79fd2e00403098099201eff1c2d3f90091b0d96c942f8420e8c5e53adfbcaefec3bbf65ccec46d9c4f9c966ff17e6066242bc34b6346f56e50691102c8b1e3e954df90bc41d2ec195df49105edd211d18ab505f4bb47639bf90aa5aec12a7613ab1de7a0c2fcdec1a6b84e6455017993b44e64e4881efadca7fa3a77051a5e702b6bb9b4b45a84f73c97aaab5c62291ccbcdf5d2c6ad7962bbed64e0b2cfebffb3af032297fbddb56c249d3a2b5ff7b6c0b59e9de5a5d1237baf755e27c5ffaf1a2f24e75ae7196fee0a1798a9696b6ba3cd1b36d085c646f1580e1ca44e9d3821fe5b1c7e183fe6b2b9b6d6e13b100280fe2004c980bfb15bcc66ec4900c3e26ba56498ae467ac31ba4f21d7a5eb8fdf2ab45f4e893e5e4e8917f90ca9f7ff7fe2c3a71d24633a77793c5e217cb887625b14ce83fae6aa69a2aa7385373df23d5b47a5dbe389321b74099180fbe27d43ac472a933e7ac74f65c724ae2aef8442b4dacb593d365a027ff5a4e7f7fb9442c5f941bbfbfdb76e45087102aa74cb293c9e8a7f60e73c875434a0b947df2baff7fbe522236fbe0f7466ee2b5be2f4b9c55e4a6097cad3b5dc601adb61389bfe78d1e33467c7cece8517a6bdb3672b94277438c0707abc68606b13c8e37a2e6efb5674e9d927e1700a00f42904c2c6969e4f3fbc9e54cfec25b5027be2bc983018b45bebbdd5af0e5c517c896eea35fdf5f23752d537676826746b6be9543e3c63ac435293c23a244f0180e97c2dd787d1d1d3f912ece7c29bd4687cff1bdf733e9c0a10c9a2e0c8cd3adbea4b509bfe1bfeaa9bddd44bf5a3692f6bfa7fc1a1d7e8ddfde9d435327765349899bd66dca937e27b178535b8b99e837bfaba16d3b957fed79ed57e05ae7d0c91d119361fc84096223a11d42f8e110a4345ea7cbedb17983556ea5cd0d17b8fb1c00407f084132e2969c4e970b2d3921282ed1e05238e8c35ddae6ceeaa27b1e1841f58d892bd571384ce2cc88d5ea27839fa8b129f16542dcc2bba9c9428f3da5cccc5728bc4e86cba5e6cfeea477766725bc24aebad249d9995e7ae0d16a715626513a3a4d62f8e112b10f8ea72b3203130e977dce9cd645bf7ea09a1a12589616b8d6f9df777b0c43d649298d6ffe704384ad9b378b657089e2f37ae9f4a953e2cf63febedbd191fc757000a02e86258b172777b5a4c6f87d3e6a6c6c24276684a09ffc8202cace4e7e2732b53108092419b330fd25eb6bd0ebb9abe1bc9341afe70d00a05658982033eef8555c5222d62203b09c9c1c04a010d430284cd6d7a0d773d76b10d0eb790300a815429002782126ef899086b51fbac70188db6103000000807a20042944ec02260421ab55bed6a7905a38fc200001000000a80f4290827846a8b8b4546c9800fac10b810b8b8ac4592000000000501f84208519850131af11e2569da07d668b854acbcb293353f9b6bf00000000101b84a004c9c9cd15f78809ec980dda939e9141e5580b06000000a07a084109c47b1594575450163a85690a07dbe2e262f183bb030200000080ba61c49660bc4ea8a0a000dde334825b5f73b0e5592000000000480d084149c25de3ca84c13397c8d9d03821a57090e5f2c6caaa2a7113543e0600000080d46158b278b15f7a0c49e476bba9bbab8becdddde4f17aa567414d38b8666665894d0fb8031c00000000a42684201572f6f490dd6e2787f0ab470847903cbc8e8b5b9c6708c1074d2d00000000b4012148e5bc1e0f391c0e71a6c82d3ce6637e0cf2e29236b3d92cb6b8e65f79d6870310667c00000000b407212885f9fdc25b277cf884c718aac7400838fcba21e800000000e80b42100000000000e80ada5a010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae2004010000000080ae18962c5eec971e834a793c1ef20a1f1eaf97bcd2874ff8f0fbfde4e30f9f4ffa93100d93d1480683818cc2affc61369bc968329149f8484b4b137f0f00000000b40721488538d8f4381c1f7e70f881c4b35aad949e9e4e36e183431100000000680342908a3884c0d3dddd4d3d76bb1884403d789628333353fc305b2cd2b300000000908a1082928c4bd9ba3a3ba953f8e03237503f9bcd4639d9d964cbc8909e01000000805482c60849e2f678a8b5a585ce9d3d4b6d6d6d084029a4a7a7871a2f5ca0baba3aeaeaee16d7660100000040ea40084a02bb30706eacaf17677f30804e5d6e978b5a9a9ae8821088b8790500000000a40684a004e2817263632335090367ccfc680737afa83f7f9e3a3b3a106a010000005200425082700955437dbd386006ede14616adadadd42c045c3f5a9603000000a81a42500274b4b753634303667f74c06eb7539d10765d6eb7f40c00000000a80d4290c25a5a5ac4c607a01f1e2100f19a2f674f8ff40c00000000a809429042786d08974671fb6bd01f6e7dceebbf78ef27000000005017842005f0fa101e00f3c6a7a05f1c842fe03a00000000501d842005b43637a3140a3ed482eb010000004055108264d6d6da8a3bff3000cf08f1e6aabcaf10c8afac449faf6b79a93ecf3b2fc74b19e9fa6c32939999293dd2979cdc5ce91100807c108264c49dc13a3a3aa423803edc369b8310af1502f94c9fd24d977e549f8d473e71491b4d99a0bf1b2e0be676d0bcd9fa5b6b595e514123478d928ef4830350edf8f1d21100807c108264e2f578c4b2278050f81ae16619201f1e0c2f9aafcf1b0ff3670b61608efec2c03ce1bce7ebf0bc2babaaa842f8d01b3e6ffe30180cd2330000f240089281b8005e18dce22e3f0c87bbc5a163a03c784cc403e2a242378da8d6d79aab51237ac4f39e2b84403d8d0db332bd34a1d64e53267653ba4d3fdf6f39007010c8c9c9a1ecec6ce9597de0f3369bcd545a56263d0300200f84201970099ccbe9948e00c2e37da3785608e23369bc5d1c1433bd9547056642f2723c543bd62e3ed683f9737b439fd9eca7d933f5f39e9794968a41805555578bbfea0107be5c693d1087210000392104c58937c6ec686f978e0086c73386adadadd211c4aa7f29d87c9d85a08be6f77dcfd15300e499bf003dbde7fd03809ec240fff2bf8aca4a94c40180ac1082e2d4dcdc2c96c30144839b68747775494710ad40295c4065855337ddd2aaab9c62295c805ed64471f9db94097db35e33a676519a45fb25718152b880dcbc3ccac8c8908eb4adff79a7a5a5517171b1740400103f84a038388481ac13657010232e8b83d8d48eb18ba560fd2d98a38f3030b82900bf0e63463aa423ede2993fa3b1ef861397c4cd9caefd1b0945c2c09f03407f7a2889e3a0979f9f2f1df542491c00c80921280e2883837878bd5ecc06c5285809985ecac2e6cf1afa7d470fe71eec1cf55012176ce0af8730505553233deac3e57128890300b92004c5a8a7a7879cd8fc12e2847da562b368c1d0d76da4d4314dcbb8e4afaa72e8f71dad97c47129dcb449436f18cc9ed925ce0869d5e052b88082c242b2d96cd29136053b6f3ee7828202e90800203e084131c22c10c8c1ed76538f43fba54c72e2d2afc1a570010be66a7b662054c91f87bf9a6aed96e6ce9ad11934ecf09a20de3057ab78c01f2aec68b9242e5cd841491c00c8052128065cc6a495b54057dde0a37b7fe7a2575fe9a1f52b1cb475adbdef6395f0dc6b4e7af10937dd7bb39f6657487f496157dde0a53f3eeb1cf4f5088f5738e9d5a7dc74f70d7eaa95feac1674a1242e2ae14abf7803512dd3ebb9872b7b9bafe1b560e106fc5a0e03e1025ef58811d2230080f82004c5803b7ba57447b85a3fddf63b37ad5f65a7dbaee9a145533c5498e5a334cba0733209cfa57ba97c949b162d76d0434f39e9b99f2a17406aaff5d28b42f0b9ed1a274d29f30efa7a84c7162f1556bbe9e26b1cf4d42b6e5afa39e9b7521c6fa08a8d762317aef46bece8d0b344a98e677bb8e42f14adae8fe1d99e99d342df2898337360c3042d0937e02f2c2a1ad230412bc2053c94c401805c10826290ca77ee97fcd44d2b1f76d05553dc9466929e8c94c94b232e73d01f9ff2d2e532cf0a2dbac54d7ffcba93ca0707b150b2dc74f9f79df4d097a5e314c6819a3b0dc2f046540fbfee67c15c6dce0c2c1ce6bcb4da269c3bc0855bf7d3bb5e487b2571e14ae118af17d262491c073b0e78e1a0240e00e480101425dee9df9dc20d11d2f27d941d6df81924adda493fbbcd47e5d271dc9678e9e7570aa14c3a8c9c97667fc3454b174a8729acbb5bbbeb1ae414491734ad764a8be4bcb4d8263c92192e2dbee7910cf4b5180638d80dd7012e58e738008068210445894b9752d9f3b7a6d1aef6f85b8ca64df4d24db3a583b8f8e9deafb8285b3a8a9ac943977fd74b8ba4c354c56bccb0e9eef02219104fa8b55356a6573ad2062ef1e352bfe1682d0cf00c1077801bce5ce1bcb5561217c940bfb8a44473257191043bde4388378d05008807425094b835766a33d0f79f4ba3bea1921088dacdb46bad8deebf339daebe2c832e123eaefe713a3dfeba85eadca102939ba65c2e3d8cc7b51e9a931f7cf0e23a6fa567eeedfd7aaebf3d9dd69c0871b996b9e9ba6ba5c7298a031036de0d8f4bbdb8e46b387c1379bec6bac42d9c17d90c8fd6da844f9fd225ae091a0e87de89b5dae9b298270cf079a03f1c9e3129afac948e521f073a0e769140491c00c40b21284aa91f82042f99e891ed26a22e0bad79c246572f49a3efffda482f6d34509df447eaf618e899072c74f51d695417e2a67a5651fc775e6ffe882778195cab95eefb9a891e5fd57b7864bb81967ed34a1beb8385321f4df9888ce57949a2896b4b41c3ad89e96f9ec63aa54533c3a3a536e1f3e7447e2ef3a2f8b36a17cd005f4b61a0420874916e865aa9a1f00700c981101405be5baf952e5ecb6fb7d2458b2db4f485bee013941096769d971e0f1677c5918f668f0a16a40c7464a389964b477d0cf4b395660aba226b949796480f5395c7aded8d3ee3154d109832c12e2e98d7029ee5183f2ef2c6195a09805cdec69ddf22c5e71de1f859f5a20936a5a5a564369ba5a3d416cd79e7e4e6527676cc85d400006458b27831162244889b229c3b774e3ad28fdb9eb2d355439a1019e8d4ebe9f4d507a4c3582cf6d2ca9b9d41d6039969f9d7d2e89ea0e1cb477f7cad87a6a44b871f32d281676d74d3d3d2610ab2a4a5517979aacf67f5320903d8cf7eb2854c9176fb1b86d9eca3c59f6e968e22b36d470e9d6fb04a47f17b737d1eb5750c3fd8cccff3d0c72f6e938ee2575de18c7a2f9c97971791cf274f22f0ba0df4daaa02f27ac37f3e0e9d9fb9a299fc322591027e1d3fd62a1d4566d5ba7ceaec922910f8fcf4fa9a42eae9097fafd0683452edf8f164107e9583c964a2f11326484791397dea94ac5d4b4f7cf0414433d3b5c2d7c95faf5c264d9e2c3d8a4c7d5d1db5b4b44847f13b7bfa3475766a67461100c243088a82cbe512bfe9ea8b9feefda78316e54b87015e0bbd74bd85ee0f354b14895b5cb4f5ca207bbab45be9fe25267a493a1c6ce95fec415b74d76d4ca7abef4cdd5bc14661f0a8a5ae4755952efae177ce5079596ab76dee711ae9f74f54d03bbb23bfebcc6dba6fbabe8e6cd6d49e8daaab4fa3fbff504d67cf45b6f87ef2043bdd7cd359cacb49edc614aded667af0d14a3a7c74f875398cd7f0cc5fb488b2b2b2a4675293dbeda67776eea4f311deeccbcccca405c279e7e50ffe01915ab8c263efeedd745c087f00a01fa64913262c951ec330f80784de5a195ffe53377d79b28f06deeb3350e7ee34faeebfe20b1cd7fc8787e69505c9e0172cf4e37f87fedce517f982fe3dabc34ccfac48dd10c467a4a58e471d9d265ab7298ff2f3bd34b22635d73b9d3865a33b7f3b828e1d1f32f518d6d9f356dab62357ec54c73343a968dda67c5af65015b509812052179a2cb4695b9eb89f5369496a9677bebb2f9beebe6f84180023c5b326a74e9ca0f4f4743110a5229e51d9bc614354332bfc33f1d4c993e26c50416161c4eb79d4a4abb393366ddca8c31b9c00801014055eb3a18710b4e8323f7deaf33ebaf9472e5a32d93b2800f5766d7bf0bb463a221dc76aea15dea061a6f384859e5d1dfa8769a8bf67ea31d39361c2532ae03af7541c4884c22559bbf664d3b93a2bcd98da1d76d34b35e16ee5afad28a4479ea8a2aeeed8ca7dec76136dd8924f69693e1a37c69132eb5578e6ebc1c72a69f9cac2984aea5c2e236dd99e2bfe3a69829d64aa12539cdb6da0675f28a3bf3c5f2a3e8e16cf26f00c4a6747079595978b6572a9e2f0a143f4f68e1d62a88916af956d6c68a0a6a626b19cd79442eb934e1e3f4e5bb76c41531a009d42395c14788fa00b8d8dd291365cb3cc4937cf88b474c5409d47ac74dfaf8cb4269e323849f0b5464208da934e9ffc71e84148f94f5df4e26541eeaed75be9fbd79a689774988aaa6b6a341582fa2b2e72d30fbe7396468d50f780a3adc3448ffcb18a0ebe1f59295424a64deea69bbf798eb2b3d55d26c6335f0ffca14a9cd19103bfd7fc9ef37baf660d8d69c27957d2a93336e999f870591c97c7a97d568807ff3bdf7a4bb69f6b369b8de62d5810719beb64f1783c62e88bb4ec0f00b409dde1a2a0dbcd2cbd466a3e61a597ee15c2c977e40940f108d5b29bb2fc542b3d04f5e181f5ed778da2e52b0bc4991635e2e0f3939f8f913500b17d073315f9bc72e1f7e3d5370ac5f747ae00c43854fde4e7a3e9adb773a467d467d3b65cbaf517a3650b408c9b14ac5bb3868e1e8977be5c390df5f5b466d52a596fec71a8dabc71231dd8b74f9c1953a3b6d6565a2b9c37021000a01c2e0adc18c1618fbc556d2a08555ad6c72084200379dd46f29a840ba6cb4047eaa5df8ad34717bba936573ae8c7551fbe1c8e2ef2d20d6383fc80759968e7df8d74403a4c455a2b871b8c07dbfbdfcba2a31f64d08c295d64b5aa230d71e7b3175e2ea13ffda59c9c4e65ee0d7199d9e6ed79e4f11869626db76acac478e6ebbe876b68dde63c45c2a947786d77bc9343cd2d169a3ab99bccf235138b8bd8f0e24f15f4caf2a2613bdfc58a83464b73736f99988c5dd4e2c137f3f6efdd4b7bde7d57386f6566269b9b9ac435365c1668b1c817aae3c1e77de4f0617106887f9603006026280a5a1e9c86268c8a2c3eca2e73d1eccb7ae8b6650e5af984979604e9ce06102935cd8cf4ce508da45757142a1202fae3cfffcaeb85f4cb5f8f144341b22935f315cc862d7974db2f4747dc694e493ceb93a8192a0e42ab57ae148341b2f19ad644cd50a969c6c5e574aa7e860a00120f334151e03a62bbc61a238cffa88f661711793d86be0fe1f970372dadf95e5af8710339b618e9401c5b2ac83e13d46da637fe69a4e3d2612acad5f84c507f1fce8cb88d34717c726646b8edf5ddf7d55053736203494bab450805b95459eea20ae123d11231f3154c57576fb388ac0c2f8d1995f8b5611c42df585328367e88b5e1452cf867c7c91327c4d988e2e2e2a4fc1f3f7be60c6dddb489ec09ac66e0c0c1ff6e8fc34125a5a5496916c1e57e1c803adadba56700007aa1314214b8de99bbe0e842859f2ebed84f5ffd8c8ba69405bf73e63a66a3af7ecb48b136160dd59461b8c608219b399cb1d145d7a7f6e4a6961b2384336eb483fee7dbe7a8b020310be89d2e033df37c19addf94fc85eb975fda4afff59546b2981373879a67beb8f901afd749a659d33ae9bb37d65146ba3225598375769ae891272ac559c8642a2828a0851ff988d84420117893efddefbe2bb6b24ea6acec6cba48386ffe351138801d3c70808e1e3e2c864f0080c130131405be9ba79b7d823a0d74ea808196bf6ca2d24b7d549b3bf48788a9c040a5074df4668c2968fc27bcb450085b8359dde15b5d875cc77441f87bcb533b40a4ea1e23f14ae4cc089763fd6ad948da9fe4c170c0f193e9f4f6ee1c9a3ab19bb2b3940d04c99af90aa6aec14a5bdfcaa171631d5498afec5e4abce9e99dbf1d49a7ce5aa5679287bb8cf2ac10afffcb563810f0ecc7a60d1b54d1d594d7e19c387e9c6c562be50b415049fc737acba64d74eeec59e9190080a11082a2e0f7f9c4ae3ffa62a02d36a22fcdf6d2d0e1839f0c2e0bbdf4967418a54353fd74436db0bbdf266aff87910e4947835d7dad8bc604193b88fb0bad4ddd10643418c481915eb93d46dabe3387da3a2c3465929d4c26f9efdeae599f4f0ffca19ada3bd4b597496063d9bc3caf222dc479e6ebc967cbe9b97f96888d0ad4c2e130d1c6ad5c024a34a156febd9478ddff8baf14d31f9f2e17cb2fd5c2277c61674e9f16d7aa70999812b3bfc78e1ea51ddbb79353f837d4826764eaeaeaa8bdad4d6c9aa044b3085e83b465e3c68496fd01406a4aeddaa10433aaa4bb4fc285bc492b0c52e3194bee3752b3f470805c5f9856d73e2acf971e0e60a0ba93a91b80985aba2825db9b1bf2e88e5fd74847f279fea512210894c5b411662270087c5c18acff5318b4cb8d5b5faba1f42f18de9095cff9f77f2a979e91cf838f55d1bf5e2f1206dfea7ccf3f38768c36ad5f2f1dc967dfdebdb477f76ec5babfc58b830a374d90db71e1f5dcbe75ab58b50100301c84a028a4d20ee0722a1fed23458a36d61ae964d089350fd5de2c3d1cec5a2fd5a64b8f073053dd4ee9618a32a725bf6b965a1416ca3f8829ca57f7869d01050a7c9da5c5ea6f095c5ca0c07b9ea03566f1c8c894bf2c333d3de8374955b129f0352af1390140bb1082a2c0250be694be5befa3879ef2d06d5ff653c4f75c6bfdb4f4a250831313351d951ef653bb98ff1d27ad7fad47f870d273cb7c215a6a1b68d7c96097a09f6a2ff6d255d2511fe16bb9c24341a342bd915eda253d4e5116b3ba4ab49269feec0ee9917ce6cee994bddc4a6efcf5cd17be4eb9cd9f2dffe794dbbc39f2bfe7f352e0bc2babaaa447f2e1062b6aa7c4792b55620700da84101425ab35f90b6be35154eda2abbee9a0175738e9c5df79e9b61bfc74f10ce937fba95de8a71b7fe9a1571feca12959d29383398cb4eb15e971c0122f3d74730fcdaef6525aba4ff8f0d288193df4c387bd748df447fa7b66852578495cbe8b7ef417e1ef485f5bf90c21003de1a4cb833452104be1de13be16e9285525aa5b94da99cd7e9a334bfeb57779391eaa1da3ee7502136aed9495297f09d3ec999d6434cabfc64a2e45856e45d6428d1fa7cceb29171eb0f3c05d6efcbd84bbd0a9595575b5f4483e5cada1c4eb0900da84101425cd0c542d5e2a9fe2a4abae71d0ddcbecb475edc08fa7ee74d07517b9a8d0126ae024048f9d667a463a0ab8f11277f0d2b95c375df275e9717fab4cb4fa58f0d9a0b40a27dd2c7d6d2f2e73d0e5a342b410769869f5d3a9bd1e887f78a7a578c096cbb429dd946651a65db4da6706e62b301bc2d26d3e9a3659bd9d2d172830fbc578666dc15c655e5339283973a1c44c8b5cf2f2f3292343990d7ad57cde00a02e0841514a855aeb44709db1d2fd770e0d1e8559a106af3eca0eb1defb9167d2e854cca5fb463af286851e3f2f1da628cc02f551a2142e60d102f50e88952a850b5073009ca7e07baee6f35672c05ea5e2923825cfbba2b252b7eb7701203af84e1125f18ebdae17b01ba8f3988deefe5f236d939ee9afb92bd425652067a80aa7ed46fad1d3566a8eba6ac548751badf4b347a5c3148670dd8b4bb6e6ce526ed0ca2571a347ca5f762587b1a31de2d7a7147e5dd55812c7e73c6e8c433a92dfe409ea2c89e39f253c60570acfb4e4aa74dfb19a1123a447f253aac41000b4072128069959a116c9a89d818e9c30912ba6f18081a8dd4cdb5eb2d1f5df32d29a10332f8f6f3053d0216c97855687092b752f98e8a6dfd8e8485784656d6e33ed7ac14a57df69a018f76a550d6eb891ae506948aa9932d12e966e45a3ab3bba72a2b90ace3ac423dad990ceaee8ce9b83c0c45ae5c246aca29dfd8a76bf1f0e7eb367a86f7f37de1f28da5238b72bba2e7f4a86ac58e5e6e6465d0a17ed5e476a3c6f00501f6c961a03ee10d7d5a9de128bd00cb4e135333df3ac85de779bc86a349241f8199c61349069c8da1f03b91c46b2379be9e87b69f4ca6369f4fdfb4cb4e61d03851d4e1c32d271ab81a68ef451b6386166a0cefa347af901333d39cce6dd5d270cf4efbf5b68afd34425057ecab619c8fae1d7258423b7913a2f58e8c0c634faf5ddc2e7db18616052390ed5990ab4c94d459ffd5473c43335cd2d16faf5fd35f4caf26271268117d747a2a8c0432bd6a86fd1f88dd7d50b83c3c802e0c1f733e8ae7b47d2ce5dd9e21aaa8cf4c8fe9e530810bbf7abeb26ce57bfd848c54591bd77a7ced8e857f7d6d0eaf50534794237e5e4447647c7287c9fdbb623473a5287099326515e843335ddddddb479e3463afcfefb545858187188e0463ec73ff8403a52873163c75271498974141e6f26bb7ddb363ab06f1fe508af557676649b356409df538f08af1500403886258b17abb765908a355db8801da941167c47186b82846f4642a67dfcc12311952ebdb33b9b1efd7339d91dbd77d20d063f7de133cdb4e4f34d11957cddba74349d3ea39e4614dc19edee9f9f908e42e3bd2f5f7ca584febda290fcd26966a47be9bb37d6d1ac69c3df9869eb30d3777e38eec3bf9b6cfc5ef37bceeffd7056ac2da0bffda344780d7affb0c5e2a7ebbe524f9fb8a44d3c0ec7e331d08dff534b8e1e75143ff0ecefe7bef0053247d0169f37167d7bc78e011b804e9c3c9926091f9158bd620575aae8a6dd65575e29ce060da7b9a989de1202504f4fdf4d91d163c6d0f49933c552c2e16cddb489eaebeba5230080a130131423a3f0c3abbb4b7d2516905a781094aff256b689c26b372ebba4553a0acee536d2d3cf950a83e152727bfa0f840c74e84806ed3f9819d1cc4847a799de7b5f3d25889fbcac95268c0b7f538567be7ef3bb1adab673e08c06bf0e3ccbd1d969a229931c640a13026d561fed7f2f53fc5c6af0d18b3a68f6f4f0df47bbbb8df4e0a395b4f2cd0221bcf5a5259fcf40efeecb166787664ced164351283c663e73de4a67ceaae366436959198d1c354a3a0a8e43cfee5dbbc459109f6fe0f5cc37e11a1b1ac4b52fc305290e114d42a050039ec9993c658a74141c9feb7b070ed03b6fbf3d20f8b1d6d65631149696960edb4dd3e7f552ddf914ef9803008a42088a11ffe0e13ae5c1dfa401a2c10148df8d36fa5cf5c9161a332af49a95bafa34baebbe11b4274c39574bab85366cc9a5ea2a179597865e3f9193e5a135ebd5133e6fbabe2e6c291ccf7cdd737f35355c087dad7c70329ddede9d43532776537656e8d9349e3ddb77401d25715f59d248a5c5a14be10e1fcda03b7f3b824e9c0edd38e47cbd95b6be9543e3c63aa8303ff4f7639e6ddafeb63a4ae2c64f9840f9f9f9d2d1501dededb469e34631e884e2b0dbe9e4891394939b1bb64c8cbfbf9c387e5c3a4aae5163c68833dfa1707505cfe09c3973467a6628feb9cbe7c3cd64b8d5762819999974f4f061e90800602884a038f0da20cc0641acd284eba7a0b0503ad2371ea0de2804019ea90866dda67c5af65015b5b50f5f3e14c9cc08af25d9b62337eaa60a4aa8ae72d2e73f1d74cb6071e6eba9e7cac432b081335fc17508e7bc6e539e30c0f6d2c89ae06bab8a85d0f1faaae45f77dc00e3bfbf561fb4148e67795efa77113df65439397a867f8f1c42b0dbb835974c663f8d1fdb13f473161779e88d5505e4153e77327129dc9c79f3423645e0353c5c06e6ec5706160acf769c397d5a6c98c0eb6c829589d984b0704a084b6e77ccfb10c8864bd94275c2e4199e2d4200e2f54fc3f1fbfde22c4f674787381b16ecbcf9f5bdc065eb117c3e00d02784a038f06c10ff6051c30f17483d8545456290061206ae76b1246c309eb578e88f95b47c65a138308ec67033236ded167aff68f24be2aef8781b4d1a3fb4148e67beeef8ed08da7720baa619fc3aedda934de7eaac629998590806fd71d0dcb32f8b5adb927bed5db4a023683bf45621e872c38b2d4248e532c74871a9dcc14399f4fe910c9a36b54b38cf81e76d32f9e9d499743a773eb96bc138acf0da96c1f8e7c80e21fc1c3d72441ce447a3a5a585eaebeac459966033cb5c12c76b6c92899b394c9d3e5d3aeac3e56f7bde7d97f6efdd2b3e8e46871082ce0a21b0a8b8580c7b8371a506bf2e0000c12004c5c962b58a779aa2fda105fac603022e63815e9fbebc65c85e31274ed9e88edf8ca00f4ec4be87526066a420df43236b06b6d9cdccf4d29b1b4397d324caf55fad1bd2e5eccd8d79b4ece12a6aef187ee62b94b3c2609f67bb26d4da293f6f609918cf801d100243327de90b4d434a16798dcfddf78da0fac6d84b442f345968d3b63c1a51dd43a525036f507150dab12bb20e634aa91d3f9e0a06ad03e410b379c30671cd4bac38e8f08c8f582636a8eb9cc562a193492e89e352385ecbd31f7759e5b2bf78820a87c753274f92c9681467d679a62d80bfcf1e134225004030084171e26fbc3c15ef70a86fff0d5027be5ef88e6dff1fd67af7edffee2b85e3fb09afad28a4479ea8a26e7bfce56a3c33f24e909991fc5c0f6ddc9af76187b964e010f045210c047c38f3b52afa99af60ecc2ebb7614b3ea5597c62c80c5c7285496e13de5b0a5727362c606eb781fefaf732facbdf4bc5c7f172b98cb4657b2e399d26b1e146e0dfe15014cbaca25cf8fffcecb97307343338f4de7bf4ce8e1db25414f04c0a97950d2e13e36074e2830f92ba8675da8c19034ae138946dddb26540f7b758f14d485e3fc561b2acac8c4cd2ebcbaf7383f03caf9f0200180c214806dca586ebb73ddcbf1660187cb792f7ef805e63463ae8d357b4888fdb3a4c74dfc335b46e739e1886e4146c66a4b5d542473e887da6295e975fd24a9327f60ed0e498f90a865fc7fdef65d1d10f3268c6942ee1daf38b4d18b854309e99a678cc9fd3410be6f696c23534a6d19dcb46d2ee7df2376be0f7963fefb4c9dd94299c3397c4719924971a2603eff133b6b6567ccc837f5e0373fae449f1584e5c2676eecc99de3231a9fd3e07010e09c9c05fc3742104310e623bb66fa723870f8be1454ebc46f7f4a95362d389c0de6b1c2e1bd02a1b00824008928955f826cf9d6d501607e1f0267e91ec91a1279ffc442b8d1fe7103700fdd5bd23c5b0a2940f6746d27a6746d2d37db45e085cc972dd350dc2f5e0a1575714d1234f54ca32f3150a7796dbbc2d8f4609a1b3a4c89dd436e15ffc7c135596bb68e3965cbaf7a11a6a6d532e8c71330d7e8fcb4adc5455e914f719e26e7bc9304e0840bc169007e5bcf9a9929b6ebb5c2e71b6856743f8c60bffca6563c9c0edc07966aaadb595366dd8402dcdc11b81c881431607219e15e3108892380008052148265c76604d4bc306aa1012cffef00f6594c10dc46551afbe51447ffe6b39399d43bb3cc94d9c1939d83b33f2f18fb509c120977a12f0ef0e5654e8a64f5fd92cce7cf1203d11f74ff83c376fcf134bce16cee9a0351b12bf268a4bf3aefb6a033dfa6405bdf27ad1879b9f2ac923fc1b3bdec9a1a696347173552e05ecbfe750a2cc9a33870e1d3a243602f026a87280cbc1780688d7e4704bed44fdbbfd714384b367ced0ce1d3bc4709608bc3752a31036abaaabc5a6103d28590780410c4b162fc6d4858cb849825a36a603f5e02e70bc4122af21833e19e95ecacdf1525d4372ca9332337d9495e9114bb2128dd70371f91fb7774e868a7297303836273c0016e6bbc9eb33525b7b72ce3b3fdf433e210724ba14d0929626de28eb4ad2b60adc1c814bb713bdad03df20cccec9a1f6b636e999c4e2f5413c1bc4eba40000fa430852006f74d796a46ff8a03e469389ca4a4bd10e1b0000004025705b5a01dcfa387f500b54d0270e40dc16160108000000403d108214929d9d2d2e8005fde2f293f2b232f15700000000500f842005718b4ede1ddc807520bac3b5f7e21a2069bf0a00000000500f8cce15c69bc3f5dfbc0db42f332b4b2c810b6c540800000000ea82515a02886551e5e5d8205307f2f2f2c40d11d1061b00000040bd1082128467054a4a4b295718246380ac3d1c74b9fc8d9b620000000080ba21042510879f5c6190ccb342b6f474e959486546e13dcdcbcfa7f28a0accf401000000a40884a024e076c9252525e2ba115e3304a9c7643289b37ae59595949393233d0b00000000a900212889ac369bd83d8e07d2bca33616d2ab1feffa5e505848955555e2ac1e872100000000482d86258b17fba5c790647ebf9fbabbbaa853f870bb5cd2b3906c5cc698919121eefdc4adaf0100000020b52104a994c7ed26474f0ff5381ce4743ac9e7f349bf0389c08d0e78dd96cd6613d7fa60960e000000403b1082520487a0fe1f3c6be4e75ff9f784c706e103a2603088333cfcc10127f06be0838f01000000409b10820000000000405750e3030000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba6258b278b15f7a0c29c4efef7ddbf857fe308847103183f08a091ffcba19f83100000000e8064290ca793d1e72381ce476bbc92d3cf6f087f018e465341ac96c3693d962218bf06b9ad54a369b0d01090000004083108254c8d9d34376bb9d1cc2af083cc9c541283d3d9d323233c9643249cf02000000402a43085209b7cb455ddddd64173ebc5eaff42ca889d56aa5ccac2ccac8c810678e000000002035210425594f4f0f75b4b78bbf426a301a0c94999d4d393939981d020000004841b89d9d04dcc8a0bbab8beace9fa7c6860604a014e313debfce8e0e3a7fee1c35373591cbe5927e07000000005201425082f97c3e6a6d69a1e6e666b1d901a42e31cc7677d385c64672d8edd2b300000000a076084109c403659efde9eaea929e012de0355c172e5c103fb87b1f245679a93e67e2f47adedcacc462b14847fa929595253dd2979cdc5ce91100807c10821284d7fdf020194d0fb48b436e636323b930c39730d3a774d3251f69938ef4e51397b4d19409ddd2917e5455575365559574a41fe515153462e448e9483f3800d58e1f2f1d0100c8072148613e9e251006c66d6dfa1ca8e90db7346fa8ab13d77c81f2e6cdeea445f33ba4237d993fbb83e6cde9948ef48303901e43109f73854ecf9b3fb0671b00c80d2148416200ba7041dcec14f483d70af19aaf8e0e7d0ece1385c744f384205054e8a611d5fa6a2e326a448f78de738510a8a7b1615a5a1a151615514969a9b8b9b15e7000e020c01d29b3b3b3a567f581cf9bdfebd2b232e91900007920042984cbde1aeaebc9e9744acf80deb4b5b68a1fa08c49e3ed9495d95b5eca33427a325f9a01cacbf150ed58fd34e5a8acae160301efd3555159293dab7dfd431f9703ea0507be5c693d108721000039210429803bc07100726391bceef16c10829032fa9782cdd75908ba687ebbf4485f01b0ff40584f8362bd9e77fff23f0ebd28890300392104c9cc2f04205e03842e6110c041a8b3535f8374a5054ae1022a2b9cbae996565de5144be102f4b2268a67424a4a4aa423a2b2f2725d6c561c28850bc8cdcba38c8c0ce948dbfa9f3797421617174b470000f143089259e3850b28818321783688f7140279d48eb18ba560fd2d98a38f301028850be0d761cc48edaf3b0c94c20570491c0721ad2b1206fe1c00fad343491c07bdfcfc7ce9a8979e66c10040790841326a6f6f27678fbe16684364b859420b36c8954db01230bd9485cd9fd5570a17a087730f3600d6c3a058afe75d5553233deac3e57128890300b92004c984c30fef0504100a07a1a60b17c45f213e8b160c9df51929754cd3322ef9abaa1c5af6a7f59238b13b5869a974d487d789f08c90560d2e850b28282c14378dd5b260e7cde75c5050201d0100c407214806622beca6260c6e61583c13843da3e2c3a55f834be10216ccd5f68c48a8923f0e7f35d5da2dc3e58d4283851d5e13a4e592381ef0870a3b5a2e890b1776f4300b0600898110248396961631080144a2b3a3837a503619b370a55fbc81a896e9f5dcc30d7cb5dc2a3bdc796b390c840b78d52346488f0000e28310142787dd4e76e103201aad4270c6cc616cc2957e8d1d1d7a9628d5f16c0f97fc85a2d536e13cdbc33341a17018d0ea3a9170037ede347670c304ad0817f0501207007241088a03ef07c4b34000d1e2b2386e9d0dd119513dfcba9f0573b5f9ba2e1ce6bcb4da269ccbddc2adfb09b55e28d5852b85631cfcb45812c7c18e035e385a9e050380c441088a03b73cf6a20c0e62c48d34384843e422e982a6d54e69919c9716db844732e0d5e2a058afe7cdc16eb899bd609de30000a2851014077483837870391c36518d4e24255f136aed9495a9ad9b135ce2c7a57ec3d15a00e419a048d6fc68b175722403fde29212cd95c44512ec780f21de341600201e084131eaeeeac22c10c48d9b24606d5064b8d48b4bbe86c363e1f91aeb12b7705e64333c5a6b135e5a5626ae091a0e0701de54542bf284013e0ff487c3c1af5c438d21f87de46017092dce820140622104c5a85d43eb39667fc6474b9779e8c5977a68fd2a076d5d6b973e84c72b7a68e5b31e7ae8077e9a1d7a6db2acaebac14b7f7cd649eb570cfe5a9cf4ea536ebafb063fd54a7f36d571391c076a18de706b62fa9ba7b14e69d1ccf068a94d7834035d2d0d8af57ade3ceb17e98c5ea586bb020240622004c5c0e5729147033bff5ffe6d21f8bce610024e0f5d3ec345e5b93e4a33f59f95101e5b7c945de6128292f0e79e72d2733ff59352bb72d45eeba51785e073db354e9a52e6a534cbe0afc54b85d56ebaf81a073df58a9b967e4efaad1487ee82918926084c9960a7749b36d65b7169dff871915f235a09803c188e360c68a5242e9af3e6a610dc1c420ba239ef9cdc5ccacece968e0000a26758b278316a71a2d4dada2a9631a5ac5a3fddfb73272d2a8b659068a0ce6356bae35b46da263d238745b7b8e9ae2bdd145d75bb89763d61a5efbf201da630be03aa95810c3319fdf4d94fb590c92ccfb717b3d9478b3fdd2c1d4566db8e1c3adf60958ee2b7767d1eb5770cff1ee5e57ae81397c8b7216e758593e647d9f0e0e5e545e4f3c913083c6ea2e5ab0ac9eb0dfff9f8fa1d575bdb5b8f2883f4f4741a357ab47414990f8e1d23a7539e4d63b94cf5d89123e4f1846fb9ceeb96c68d1f1fb6835d34b8fc6ffc8409d251644e9f3a455d32ce289ff8e08388f632e3f7db6cb14847f19b3479b2f42832f57575b276683d7bfa34d66902e80842500cce9d3d9bb2eb8178b665d97f3aa930ae9f5b4210da65a34fde2ad35dd7255e5af96d27c5744fcf6ba6354bd368e976e93845f122dfdcdc5ce9481b2acb9df483ef9e137f4d65dd7613fde1cf15f4ee9e2ce999e1cd9ad14537fff73961209fdab351e7eaacb4eca12aaa6f8cecf604b7365eb06851d8d6cea980f77f7b6bdbb68807d8393939b4f0231fa1acacc8af1135e2d6fd3bb76fa7fafa7ae999f0d23332c4f73bd5f7ede1a0bb77cf1e3a79fcb8f40c00e88169d284094ba5c710012e854bdd59203fddf83d17cd288c3ff75a2b0c34f6a889de3c2b3d11333fdd7b8793c6a64b87d132fa68cc2423bdffb291ce484fa5225e1ba4b5d28ece2e33addbc40bbcbd3476f4f07795d5e8c8b174bae3d723e8c4a9e806f575f569b4697b1e8d1beda0c282d4dbbc957b75ac585b40bffb43157574463e43c9e1810792a95caa74fedc39dabc6993b80542a478f689674fac562be5a7682068ba708136ad5f4f6d6d91cf627259f8a91327c4c7dc982215cb11b9cbeb46e1bc2f34364acf00805e2004458917b1475226a04e06dab2cb44333eeea58a21633a0375d65b68d75a2bfdf9150b6dd862a123ed46aaa81006e7416f020bcf6799e9f937e3fca177ad877eb6d04bc1fa3fb9ce5be9d9c7acf4dd5f5868cb5133658e12024f7e900097e5a70a9f9996ef938e5390cfeba5ec9c1ccdac6908e092acbdfbb3e8f0d10c9a39ad8bac69a931f1cca55ffff85731fdf1e972ea710edf9d2c989e1e236ddc9a2bbcb706b16db74cd5528a6b1742cf7d0f57d1da0df93195d471a03f73fa34f5381c62a72fb9cac494c6b301bbde79870eeedf2f9e43b4b87c8ecbb35a9b9ba9bca222a2ae766ac0e77a60df3edabd6bd7b0a57fa15c100254437d3d9595959145c6f23825f1fb75f4f0617a6bfb76f1e62600e80fcae1a2d4d8d090c22148b2d047cffdbc8746883fab0ce412c2cf4b4f9ae99175e2ef0e54e1a787fee0a0d9c1aa3c849072f5d74c54271dc6e2e6c71c74cdd8209760ab95eef9a289964b87bdfc74f7b33d747159903f7fcc46577fcb18d7d7926cc5c5c562798956e5667be8e69bced3948991df614f86c60b69f4c0a3957432cad99f70c68c74d0fffbce39d5b7af3e7028931e7aac923abbe419c07379d8c28b2e126786d4acadb595b66fdd2a5b93122e079cbf70a1eadb76f36cd7b62d5b64dbf38ed707cd9d372fa2bd9d928967eeb8dc9167bf0040bf3013142539176126cd59036df318e85333fc746ab98dbe73ab89d6f556340cd56920cf641f5d521d2478184cd4f877231d900ea3e7a36f7fcf4385436e141be8c8aa34ba77a774f82103bd296484ff9ae11b3a73946b20efb3261af2575208df39e6c5e05ae5741969f3b65c72384c3469bc5d385fe9375484676eee7db0869a5be4bd9bddda66a1f59bf2a8a8c04335d5ea5b23e5f618e9d9bf97d2537f2b2397f03ec985efb09f387e5cbcb60b0a0b5539d3f9fea143f4f68e1db2ce06f08c0a372be05f79364c8de7cd658b1cfc1c8ee137e18d14cf2a9d3d73460c57dcb54e8db380bcde69f3860d688000000841d1e092a50e8dec0fd475d0486fae33d3b36b0d345c4fa1e3737c74c3d820e5212e2174c41382160b2168819786f6ef32d3f6bb4db425d8cfa87d065af4450f950c1ea30a3f6b0d46332ddf231da7201e3064a6f8c2ea481c3d9e4eefecc9a6a993bbc5f6cf6ae07018e9e1c72be9d5378a86ed82162b8ff079df7e379b4e9fb5d1cce95d6496a9735ebcb8f9c1afeeada1ddfb94bbf678069d4ba6b84c4c2d5d1079fdd2d6cd9be9d4c9938a6d58dcdcdc2cae312a2b2f17370255036e7eb063fb763a72f8704c657f91686f6ba3334208e4d96d9b4a6eec7033a3bdbb77d3be3d7b52b6b11100c82b358ab555c2a3d00f8c64a93b2f3d18c66c5b884161ab919e971ec6649c377847b876131d09f9b519a9ae557a38808f0a83cd56a59058ebf153d199b356fac9eda3c47527c9c6cd0f7e74fb1831a02402ff3bb7dc3e9a3e3899fcc1e1eaf505f4d3a5a3c420a4342e3d5abd6245c49dc7945477fe3cad5eb58a9a9b9aa46794c3a5666b857f4b0d9dc7f87cf93de0f3571a9716ae7ff34d71a62dd9f8e625bf07c73ff8407a060000334151e172097b141d83b4c14f37fdb78bc604191f36bf67a1e7d7c77ed7fc9afff0d0bc60eb7b2e58e8c7ff0efd79cb2ff205fd7b5687999e59a1beb29348f15d596e95ad17bce89e671f3e389e4e33a7770fda1c57797c33f8a5578be9b127cbc512bd44b20bffde862db9c45552e3c739c45f1389d7fcfceef755b4726d81f83e240adf81e719025e93519284a6095e8f476c00b07fdf3ec5664182e17f8b8307af3de259a144374de07fffbd0307e89db7df4ee8cd169e61e3ae6b3c13c8e571896e9ac0ff3eef1dc5eb7fe4da3f0a00b40333415148e40f4dd558e2a50515c106a7663ab05199c15367736c9f374d0395644a95e5a8d99e0359f4e3ff1d4d870e27ae294453b3857e71f7487af9b522e1354f70029170f8f8e72bc5f4cbdf8ca0d6d6c4958871f3835bfe6fb4f8ba27cb716160ca77e613595ecc01640dcfc8482d9d93419c815ab12221335001bc3e27d93332e20c94f0da2762062a8043cf964d9bc412385dfeec0680616126280afc4d95dbbeea067786bbd545238334c9721d4ba35b1f1a7e3d51389fbdc645b5419a4671b7ba6757871e9836cff2d1974607f9a1e630d1de9753bb431c6fbaa8b536d991e8711a69d3b63ce1ff9891264d50b69df4d6b772e937bfaba60bcdea58a3c14d18d66dcea78a321755962bd7aad7e331d073ff2ca13fffb55c6c52916c3cb3ce25623c3bc07beb2875ddf38d055eff2277f38358f14c0c0731bf3030577a6f1d5eefc4dddfe4ea7a170f0e22dc3a9dd76229dd3481679e78cf23adace10500656026280afaba4befa7dbee72d2ecdc20e7ec36d3ea67921736ea42ad69cdf253adf410520ffff77a6d6521dd76c728b14db5dc3868ddfffb2a7ae4890af1b19a706306feda1e7b4a99afadbe318d7e76e7287a7d75a1f48c3af0c098efd4f31d7b25ca95783b834d1b3688fbe0a86d368067667886269a4d5923c59b9872e7b77776ee54dd5a430e803c23c73373720b343fd8bc71a32a022f00a81b425034741482ae59e6a2abaa830d1a8c746a9d85eed92e1d82acf4580e3718374df8d57d35d2917cfef27c69c29a1fc46ae3965cfadb3f4aa423f9dcf9db1af175552bbe73cf333572e32e686ade0b8683000740b9ed11820077a5532b0e7e1bd7af978ee4c3c1f2d8d1a3d211004078084130c435bf71d2cd33824db718a87997957e74affecab520b1a64d92ffeef854053ea71294f83aa74f51ffb99794964a8fe4c365576aa7c4d7c87b13a99d121bc9a6c2fb0d00ea8110140d1dacd51003d0ece001a8738f8d6ebad5a0de35376e03256eb9b132f4b81e289879b3e5afe59f3d533d7bf3849266f1d18c69f20796b9b3d4bf31645575b5f4483e159595d223f5aaacaa921ec9873fa7dabf9728f17e171615a9663f2600503f84a028687d801a2e0035efb2d1f53f9637009d6c8ead4dec35a52106b25d065a233d4c590841946ef3d19489f22fe4e680316db2ba6744a64fe556e1f2af5de1d9257e5dd52a2f3f9f3232e4ef0e98939babc8e7950b0fd8959811e10d69959859930bff2c5522fc29f57901409b1082a260d4f0003574003252dd466566805c211a1c6417c678b75e0bdb40604d10cd99d94946a332afc3bc59eaee16354fa1191b9e019b393d9e5e8eca5272c6a6ba46fef56572e1f356eae65aa58a67c1b85c8f839a12108200205208415130247863bf44b96e59e80074e4552b7def4e654ae05eaa0ff17ae6f86989f43098f125c1d353677b6a87541e0c257af348359a375bb9d22d2e89532a60c58bbfaed94200548a9a0360958203d70a150f8a951cb05756572b16b0e2a56440e31930a5021600680b465c51d0e237560e4037066d8260a25d4fdbe8fa87145c03b4df48cdd2c301727d615a5dfba83c5f7a3880f0759e4ced1094e85de4d5485c133355b9198bac4c2f4daa4dfe9e29c1703308254bd6664eef166784d4263b3b9bb27372a423f915141490cd1664b3b32453ba648d4bed0a0ad5d5129d71305332988a9f3f05d6820140f2210445c1aca941aa9f6e7e384400729b69db1356fafeb3d2b152d61ae964d0f1ae876a6f961e0e76ad976ad3a5c70398a96ea7f43045e1ee25894d01a21da8777547f7ff728e82334df1981365295c675774e7cd01538d5de2a29d0d8965df1b2516e1c7abbca222ea995f77947bdfa8b1248e37c68d369446bb8714421000440221280a462104a9b5bc203a7efae1634eba6662b00064a135f7a6d12d2f48c731a85deca3879e72d2fad77a840f273db7cc474b2aa4df1cc040bb4e06bb04fd547bb197ae928efaf869e9151e0adafba7de482fed921ea7280bba1a4555b2d5dc62a19fdf35926ef9bf3174f868e48bdfe7cf5167088ae6eb3af87e06fde4f631e2f9f3eb10a9f90a74dd8b573403d6b6b6367a73f56a5ab5620575b4b74bcf0e4f8deb44a2396fde57e7cd356b68f5ca95d4dc14790f4c2e89539b6882994b083fbc8fd2aa37dea0babac86b12cacacb31b30e00c3324d9a3061a9f41822e0ece951dd0edcd1e90d404bc60629bb719b69e35f2cb4c941346674841fa5063a7e56fafb6c8997fef65d278dccf593c9d2fb9157e6a1851f3792e31f463a20fdb180bd7e032dbec84b4386b0e93e9a7f99915c2784bf534f543ec34f3fbed34997d7049b253050dd4e0b3db839b5032a9705e9b9bd2bcf00dd787d1d592298097a677736dd737f35355c48a31ea791366ecd259fd74013c73b68b8fb1436ab8ff61dc8a296d6c8c383d2268eb7d3e5970ebf83bed74bf4cf7f95d0137f2917cf9bcf61c3965caaae725179e9f0b30425c56e7a6d6521f985ff776ac03302d366cc908ec2e34d30dfdab68d5c2e97f871eae449b25aade2ccc270d23332e88363c784d72ff87ac244e319a039f3e6453413c49b9e6ed9b891ec76bbf8b3e7e48913e2f391ec0564b158a8fefc79ea117e6ea9c5ecb973c5af6b381cf6366dd840ed42f0f5f97c74e6f469f1e76f6959d9b03723f9756d6d6da5ce4e75def0000075302c59bc589dab8455aabdbd5dfca69c9afc74db134eba6a948ceb0eced8e8a2ebfb7e90dff8700f5d3731d8e717c2ccb336bae969e9b09f9b1feba16b8285b248392cf4cc4d167afcbc749ca2b86447cf8d11664deba45bfea77fa21ecae536d25fff5e426b37045d1846e3463be87fbe7d8e0a0bdcd233c12d5f59407ffba77a5a085ff7d506fae4275aa4a3e078c6e7c1472be9e8f1a0f5a074c5a52d74ed572e082132fcffa57beeafa17d0733a5a3e41a377e3c4d9b3e5d3a0a8e4bc0dedeb123e44c00cfa870a0186e60fdee3befd089e3c7a5a3e4e299a9058b164947c171e0d9bb7bf787a16730de13873fc770a565870f1da203fbf74b47c9c5add03f71f9e5d251701c780e1d3c48ef0b5f7730dcf67ca170de59d9d9d233c19d3e754abc6e00004241395c94f8ce632a2b2f96310005519815eaf3fb283bc476188f3c9346a7c28f59c330d29137523f0071299c9e03109b3b3b7c4384bafa34fadf3b47850c408c03c24f7e3e8adedd177e80b460aebaee102f981bbe4c8d67bef8bc420520b67a7d01fdec8e51e2eb148e9abac40d571ac5b3015c0216ae148a674ad6ae5a452d2de143a49abac40d570ac7a57e5cfe162a00b1485e1b964ae7cdb35d1bd7ad0b198018bf366b84f73bdc6bc3f8dfd2fbf75400080fdf21a2c42148cbfb05c5abb92bd425652067a831ee7623fde8692b35475da9c27b1859e9678f4a87294c8dddab1289db43f3fe40a1acdb944fb7fe62149d3d377cb9a0dd61a27b1faca2a79e2d25b727f8f55854e8a611d5ea28111a33d2417939c14b6c79e6eb4f7f2da7fb1ea912cf6b38fcfaf0ebb4614b9ef4cc50f38500a8866f61e1ba97f9fd7e7aefc001da200c882329e5e2c1f38637df0c3b782e5549ebe4e1ba971dffe0035ab7762d754550cac5b364db366f16678c4295fa71996d8e82ddf7a211ae157aa46196f16cd1aeb7dfa61ddbb7872c4f57bafb1e00a43e84a028f10fb0f44c759492a8d1e31bcc14f4477797855687092b752f98e8a6dfd8e8485784a333b79976bd60a5ab15dac328d13255bcab7d224cac7588edab07e3813f0780279e290b196842196e6664b899a74409f575f0d7fdd3a5a3e8cd0da1034d30fc3afdf1a9727af0b14a71ddd060fc3ad78e4d7e9bf050fbd870e8e14073e8bdf7a46722c3c1e9e0fefde23a9260c189ff2deec8966ca1f6b171bbdd62a0d9bd6b57d46b9778bd14bf665d5dc1afa5e166601221542b740e347ccedbb76e155f83689c3d73460c4e6dadc1d7d3a979c35800483e344688014fb173b79e54f4a9af78a842ceb5f71d667af2dffd0632878c74dc6aa0a9237d942dfe3b06ea1406732f3f20fcb9f0cb3da8eb8481fefd770bed759aa8a4c04fd93603592d81256bc2bfe13652e7050b1dd89846bfbe5bf87c1b55703b5b063c20e25a793dbbea932d346694433aea75e2948deef8cd08fae044e812b0e174749a68dda63c2ac8f7d0c89a816d76b3b3bcb4667df25ff79baeafa38c8c8165a46f6ecca3650f5751bbf0ff2b5667cf5b69db8e5c9a506ba7fcbc8177cbed7613ed3b98251d25c79469d3282b6be0d7c0a55d9b376ea4ee1083f948d885efcddc34212f2f6fc8e7e720c403e7641a3f6102e50ffaffceb31f9b85f0c68bf963c5c1efd48913949e9e2e9e7b7f5c6e9becf550a3c68c193233c3b35d9b84f7bb3e8ace6f837170e2f7db24fc5ce699c5fec13a2333938e1e3e2c1d01000c84c60831e2a9fb50d3f000d1c815062cb9b9b9d2913e3dfac0d10f4bc2fcc277a4d75614d23f5e2911bba1c985d7dd70e0e0ee7001dffbc9586a6a4e5e97b8ea4a27fdf68ebec129cf7c3dfae772710d905cb853f057fea3813e73658b3040ec7d8ecf99cf3d5938f87fee0b5ff870c0ca331ffbf7ee153bb8c9a976fc78316cf5ff775e7be595a8675ae4c25fc7559ffffc802e903ce3c58d0078264b2edc6485bbb0f59f715ab17cb95836982cdc10a1ffcd9e934228dbfdeebbe24c905cb873dcbcf9f329addfdadd8debd753d3850bd21100401fcc04c54af861d6e31878e71a205a3c28e22e4f7a5ec0cb1ddd3e7579ef3a80b60e13ddf7700daddb9c27862139059b19e1999668f61892dbe597b4d2a409bd03533966be82e1d771ff7b5974f4830c9a31a58bac56bf38f3f4ee9e6c6a6b4fce1a99aa9a9a0ff7eee1122e9efd8967362094e6e66671768907c71c3cf8ff19ef35d4d9919ce61045c5c534666c6ff8e4991bde03e7f4c993e2b19c3a84f33b77e68cf8ef05d61b3a849f572dc2eb910cfd5ba1f3cd435ecb73e4f06159831fe31944ee0ac7336d9952d93aff7b0df5f5e2630080fe108262c43f50f91baedcdfc4415fb8463e43e7eb813e79592b8d1feb103700fdd5bd23c5b0a2142e03dbb0255ff8ffeba371631c9491ee13cbe592e5baaf36526e8e875e5d51448f3c5149ddc2d7a714de5369f3b63c1a35d24125456eeae836d3c143c959df3879ca14718d08976ff15a101ea02b85c3067712e3d2386eafcc330f3c939f0cdc129c4bb67850cec12f92e607b1e2bd9478b6856783f8dfb408bf0ed7514d29a3468f168328afdde1355b4a86310e3d1c84f87de6109829bcef2889038060108262c477f0f903b341102bbe7ef887b4dedbb8def05f75f4ea1b45f4e7bf969333c8427eb9893323077b67462efd689b100c72833610501a77a8fbd415cde2ccd77a0566be82e1f3dcbc3d8fdc6e032d98d399943551bc93fff49933e99d9d3bc56e6e72964385c2ffc6b9b367c572301e901f3b7244fa9dc49a357b361d12ce79cfbbef26ac24afa1a1415c73c4e7cd212819a580bc17d4d9d3a769e78e1d62384b84a6a6266a14c226cf38b6088f950cda00909ab026280e3c0b54c76b8392545f0ea98d6781062f90d69b8c0c2fe564fba8be2139eb7232337c9495e911674912adacd44ded1d266170969c105c51e6a2e656734282677fe91919e4174249b00e6e89c08d03f87b77a2ff7dae1ee00d5d93d554879b23042a1812896ff2f0f7ba646d32ce33617ccd25ab041200d40b21284efc038d37ad038806df0dafa8a82083ce678100000000920123b038f1e24b6b5ae2ef22436ae32e49084000000000c98151980cf207ed4d00100e774a0a742e0200000080c443089201d759170a410860385c06c72db1010000002079108264c23b53f3e24f805078b6b0b8a4440c4200000000903c084132e24e5fb67479373a04ede019209e350400000080e442089259b130d0b55a95dbec1152537e4181ee374505000000500b84209971c72f2e79e2bd0900584e4e8eb83b3e00000000a8034290027873b8d2b2324ab324670348500f0e40dc0e1b00000000d403214821bcf8bd440842288dd32f0e3f084000000000ea8310a4209e112a2e2da574344bd015ee02c74d1078160800000000d40721486146a92d725e5e9ef40c6899d962a1d2f2726c860a000000a06208410992939b4b25a5a5d82346c3d23332a81c6bc100000000540f2128816c361b95575450163a85690a07dbe2e262f183bb030200000080ba61c49660bc4ea8a0a000dde334825b5f73b0e5592000000000480d084149c25de3ca84c13397c8d9d03821a57090e5f2c6caaa2a7113543e0600000080d46158b278b15f7a0c49e476bba9bbab8becdddde4f17aa567414d38b8666665894d0fb8031c00000000a42684201572f6f490dd6e2787f0ab470847903cbc8e8b5b9c6708c1074d2d00000000b4012148e5bc1e0f391c0e71a6c82d3ce6637e0cf2e29236b3d92cb6b8e65f79d6870310667c00000000b407212885f9fdbd6f9df8abf41822c4e146f8e08883a003000000a02f08410000000000a02b686b050000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba8210040000000000ba6258b278b15f7a0c2ae6f5f9c8e7f188bf7abd5ef2f1b1f0abdfef279ff0213c90fe2444c46020a3d14846e15703ff2a7c98cd6632994ce2af00000000a05d08412ac541c7d9d3430ee1a3c7e1108f21310c4230b2582c949e9e4e569b8d6cc20700000000680742908af0ec4eb7dd4ef6ae2e723a9dd2b3906c3c4b9491914199595964b55aa5670100000020552104251997b3391c0eb277778bbff231a897d964a28ccc4cca143e2c6969d2b300000000904ad018218938f834343450d3850b64b7db11805280c7eba58e8e0e6aa8afa7d69616727b3cd2ef0000000040aa40084a028f30706e6c6ca4a6a62672a1ec2d2571338acece4eaa3f7f9e3adadb1160010000005208425002f140b9b3a3431c3873b303487dfc9eb6b5b551435d1db95c2ee95900000000503384a004e176d65cf6d6dadadadbd21a34c5e5768b25723c3b0400000000ea86109400dce9adbeae4e6c7c00dac5b342bc4e88c3aedfe7939e0500000000b541085258777737353634880bea411fb8c905cf0af1ec1f00000000a80f429082ba3a3ba9b9a9098be67528501e87ee7100000000ea8310a410ee18d6d2d2221d811e7100e220c4810800000000d403214801bc389e3b86017049dc858606f2a2340e0000004035108264c6cd0fda5a5ba52300120310ef0b85660900000000ea80102423ee02277606c31a2018c4ed725123ae0d0000000055400892090f6e5b9a9b31c885909c3d3dd4d1d1211d41a264a47b292b539fe588999999d2237dc9d0e9795bad56325b2cd291bea46764488f000022831024136e82e0c60278180637cce01943489c85f33a850f7d86cf69336650860e078763c68ea592d252e9483faaaaaba9aaaa4a3ad28fb2f2721a357ab47404001019842019747775891f00c3e199c2a6a626f2617d50c2cc9bdd41f3e6744a47fa613299a8b4ac8caa6a6aa467f483c340a50ec3009f73a570ee7a23863f1d9e3700c40721284e3c984527388886d7e3a1f6f676e90894946ef3d19489769a546bd75d491c07200e427a0b03f9f9f9e2ec170f8a0d0683f4acf6a5a5a55151713195969692d96c969ed53e7e8ff91acfcecea6ec9c1ce9590080e12104c5a9b5b515ed8f216a9d1d1de472b9a42350cabcd99d6434fac58fb9b3f4351b14b8335e505040369b4d7cac071552e8e350505854243ed6030e021c0802a1402fb8ec3110faf416f801203e084171e0b51d2883835871230d501697c2057020d20ba3d148e51515d21151b58e4ae2fa0f84f53428c679ebebbc01207e084171e0bbf900b1e299a01e87433a02b97129dcb4c9ddd211d19489dde2737ad0ffee38d3cbe0303737572c8b0ad0cb3a117eaffb37820894426adde059afbcbc3c5d36020180d82004c5c8e37693dd6e978e00628396d9ca9935a34b181cf6b5ace7c7b367ea633668f0e0bfa0b0501725718152b8003ee7fc8202e948bb3808f45fff34782650ab780d14973df6a7a7594f00880f42508c300b0472e8e9e921175a662b627ebf52b880f93a28890bb626849faba8ac948eb42bd88c971e66c182cd78e9e1bcf5fa7e03803c108262e0f3fba9bbbbafcc466b2effbe9b56aeb5d3d6411f2b97256623d8ab6ef0d21f9f75d2fa158e7effbef07885935e7dca4d77dfe0a75ae9cf6a41376614659766f1d1f4a943ff8fce98da25fe9e960d2e850bd0fae090cbe0b81c6e30adcf0c0c2e850be099209e11d2aa500d2078e64f4f8d40002076084131700801888390f6f8e9e6df3969e9e7dcd457559f38b5d77ae94521f8dc768d93a6947985c16affd758786cf15261b59b2ebec6414fbde216be4ee9b7521c076ade3f08e433737a77d0b0c3257133a76bbb9949a8b0535c5232a474484b0697c205f01a115e2ba2553cc3172cec04f689d2aa70259e7a590b0600f141088a812667816afd74eff34eba664a72da7d2fbac54d7ffcba93ca07049f30b2dc74f9f79df4d097a5e314e6f37ad1204166e1cade166878e3d45077c799d64be2c2cd74850a485a10eebcb51c06f47ade00201f84a028f19e40dc1a5b4bca3fe7a5171feca145c5492a135ae2a59f5fe9a6e8ef517b69f6375cb474a17498c2b45c5e9968c3354018dc30414b822d14ef2fdcc03195f16c0f6f921a8a56cf7bb8d91e0ebd1c7eb528dc7bcab3445a9ef50400792004458917b16ba97469c9ed2e7aeefb51ccc0c8ce4ff77ec5157bf99dc943977fd74b8ba4c354c50d12401ed3a7042f850b10d70b4dd16649dc7083fd50eb85525dd530eb7e72727206b4ced60a5ef713ae1536bfd75a2c89e3753fe15a6173f0c36c10000c0721284a9a295baaf0d30f1feba11f5eec8961064646d77a684e7ef000e63a6fa567eecda08b2ecba0eb6f4fa73527425cae656ebaee5ae9718af2f97ce2be4110bf605de1069bafc192b870a57001bc76448b257191ccf46871501cc97947f267528d5ecf1b00e485101425bb16eed82ff4d11f1feca1256383dd2d3792cb2d3d4c809b3f122284b55ae9beaf99e8f155bd8747b61b68e937adb4b13e5869878fa67cc447e5d251aaea41abecb8198d7e9a336bf880336766a7f867b524d2bd80b43638e4732e88602f20ad9d77a47b0169b1242e928e7f5a6f040200f143088a027784f37a3cd251aaf2d343b7f6d094a0b32f46aadbc841433a549c8f668f0af67518e8c846132d978efa18e8672bcd1474be64949796480f53951b3341719b36a99bd26dc3af6de33fc37f564b2a239ce1292b2f0f5b42956a229de1c9cdcb0b5b42956a227d1f39081417174b47a92fd2f751eb8d4000207e084151e02e5ea9cf40f73c9f4643ef951be9c82b56bafa4e03256c3e62b19fca83fe0c37d19197a587833d2bfc5eb08a449397a67e5d7a9ca23c0841719b17c566a8d1fcd95450196118e019041e406b4534333c5a2a898b34f4322dcd8245732e5a9bfd030079210445813bc36941dd0b66ba63a3453a12b8cdb4f1211b5dff48824b26c679833744681782ce79e9f11046aa6b951e0ee0a3c2ead42e6f72a7fc2c63727179dbdc28820dff59ad94c40db7507c30ad0c0e7996a3b0a8483a1a9e56ce5b9ce588e25cf8cf6aa5242e9af0a7d5462000200fc392c58bb55518af207b77373535354947a9ce4fb73de5a42b6c167afa17267ae688f4b4e0b6a7ec7455901ba69d7bd2e9933f96ef07e935cb9c74f38c20c1f28c8d2eba3e743e0ff5f75c876c74e9f7523bd773adbbd6eaf743b1597df4992b9a85f422cff9e6667be8f24b8326e490d6accfa7f64e79064906bf9f5e5f5d488e9ee1af41ee5616e9cc4d240a0b0ba3ea02e61102f791c387a5a3f8f1e73b1ac1e74b4f4fa791a3474b47f1e3d731dad99d43efbd275b874fbfcf4787df7f7fd8cf67b158685c6d2d6ff92c0b7e1d4745f93a7e70ec987cdb3b08e77bf4c811f17d0f87671d6bc78f274390cd5c63c19f6fc2c489d251644e9f3a455d5df275833c2ee7eb080049851014856ee11b6973b33068d38a0aa2f2f34475d26140b243d070ff4eace12915f0808e7fd0ebc5f87176fa9f6f9fa3fcdcd49e056beb30d1237faca283ef473e1bc383e229d3a6a5fcfbddd2d2423bb66d23bbdd2e3d131e5fe3b3e7ce4df93bf45d9d9db45d38ef8ef676e999f078a1febc050b226a5ea166dcceff2de1bc9b23bc2198979747f3172da2acac2ce999d4e476bbe99d9d3be9fcb973d2330090eaf433da92013746d094200128914616c6565eb8a1294440b2f869b6f41052c3e1a31974cbed6368dfc14ce999d4c35ffb4f7e3e26aa00c4f84efafab56b65bd4b9d68ef1f3a441bde7c33e200c4ce9e39436b57ada2b6d6e866edd4e4e4f1e3b4463887480310bbd0d828fe9d86fa84759e915d5d5d1dad5eb932e200c4dadadae8cdd5abe9f4c993d233a987833e5fb3084000da821014052d6d929acaea4265a72c3fd54a0f217574771be99efb6be82fcf9792c7933aa5805eaf819e7da144fcda3b3b63ebb6161820723048253c1bb061dd3a3ab87f7f4cdf17bbbbbb69bd109e8e44504aa6265cfeb57deb56daf5ce3be2de5ed1e2cdb6b76cda44fbf7ed4ba9f3e6f5b07b77efa66d9b37c7d4c5925fb7b777eea41ddbb70f5b42a736876308fa00901a1082a2c0f5df004ad273d05eb1b680feef5723a9a151fd7b7b5c68b2d0ffde39525c03142f1e14f2e0900789a93040e4990c9ed188663620180e111c06b60a036b0e076ac7335772cd0670f85bb776ad1806d58e672a39041c3b7a547a26761cf639f473f8573b0efa9b366ca00331067d00503f84a028c8b5b81300823b75c646b7fe62346dde9e2b3da33e6fbd9d433ff9f968f16b9513970ba97980c8a165dfdebde24c869ca12510aab85c4c8d7800cccd0f78e64aced01208556a9e053ca5c035c9a16add9affdfdeddc746919f77007f76edb5bd367e7f7f810b1883e120bc4392d33551abe4af44a5a5ad1429aa12f5ed9fa87ff4d4568a94e89453a546778a9a4b7abd866b9aeb45975e151245972b87e10e1bce70c6d870c6bc1c07b6b101fb3006638cd7f6daebccf7c72caccdae77673db333ebf97e24cb3b63e3ddf10cebdf33cff37b7e875539a85339fd9a24227370546f805bba76a5ada047d2bd771faf3191a9698fbcf25a8dfce8d55af5d829a6a63cf2eacf1ebeaec9296bde3ac3034433eeba9b4995af1d39925007b864e0aefbf19616555e974c99995510ece17575777559f2bac259c08ef676476501c3af0b8d00ac785d082cbbce9e5501b5931689c6eb3a6741a04f44cec420c8000e50cdd53792dc3c8aaf57c6284d18f7c861fd21a53f645c9015323be3928ceb37b2e49f9f5f232dadd667a830105bcafc0bb33d6a646071860ac78d460b2defbfef88f917e14606a9c806f4f5f6ca7b5af06ba4d1825552394f0d1917a38d16ac82401f258a66b68e27226763106480974190a9a6633438c82f4db2fe7a19dcb863a03d1fe60761ee0de60bd9e5ddf78ae53b2fac49f95ca5643a7199697666466502523d99ddee4e5ce1b94ac8002143952a68b98d4138d6f3b103825064fa90894c65c7c270938d0bddddea35d8e151a09fc61d0b89c838064106783392cb5c50740786625c7e0573b24f7f18cdfa8ae8d1d3fd7be91d4020c86610f424746143e73874614327b954c173bdf8a33a79fdcd2a0906ed392f8f0688e7cfa77480886cc091a6263527c40e5893055dd83a3b3a5467b254b1bb6b1d8ef56c6767cab38028fd42830accf9b22b10c122b6a9eec2a602fdf6f6b4ec5a47444bc720c8800c0641e63ae795a84bcf16861669751d92ea62fde13c1e19ec4bef0022c3e7d31f5134588f076b0a616d21ab85d72feaeccad7f7d8eba21604b51c3d9a92cc04e623a53a1b104befd5ab2a184396c46ac83c39251b10ce02222b6635641a9db27e51380b88e3b71a4a0f55a0dfdbabef2122b7c9d8d8d8f8bcfe98e240773827d46c5bedd9bd41591765eac3f4904f7ed16462a0d1e391cfffe98cd43c5165342752e093df9ed237237d63469edb159227c3519f74bf9e21efd9b9faeb12e564674b6e5efa2e1a9a0a6848807939a1904736ac0b88d98933fcdc036f97cbab3fab96c0a4b36e7a042626d4dc9182c242c9cf373f3843e6a1edc409c7356598d65e576f4f8fe4e4e4487171d43b204b820cc099ce4ecb9a1f240baf0b03746487cbcacbf5bde641c607c1b555cd0f92857330d0df2f5353535259596949761c2587c8fee03988c8bd98093200e54a199999fa16c5b26e6f485efeef2939faf6a4f631256fbe14927d35fa17e7f148475fb44b704ed67d7156beaa6f3d3627cf7f6546a2cecc18f2ca810efd719acaca4aed9c93743537e7915fbf5d262fff67adbec73c3fd95f2d077e5ba69ec38910a8a054ca8a3235641e5271073e191818779e3eadd66c311bcadffab420cb8910a89cefee96f6b6367d8f793ed4025e94a039558f16a8609d1eb3a12b1d4a0e5359664944cec420c820dc8da445ec9b9597bf3d293b56ce4a963fa47dccca535b27e51f7e3c2b5fd7bf25d2eb077dd14be28aa7e5b9ffd1fecdd6879bd55bb50068ff947cb9265abdba47062f7825cd6320c9f1fbf5479488b212f3e74c9497a6c7bc002bde87d2e1facbcb35bf1472c58a15fa23e7f25b706ef2d220eb6cc57133db4e44610c820c42c912c5f6b75f0a4ad4429dc2a07ce99bfae3488732a4e94af46c5056cd947cfba509693d3221bf7a29205f5e1da3542590294d3f4feff9405eaf9799208376ef307f9e88153fd36c999999525159a96f99a7b6ae4e7fe44c288baa5db952df328fd38f1bac788d6e3dee3a0bae21224a4f0c820c62266871a52b62d5d487243f4659fb4f5ecf926b417dc330af5cfe7f9ffcf4a6be99a6785d19535430230df5017dcb3cf5ab03ea673b598d3630b4629e84d307c5a5656596dc28a8a9adb5e4f76996dcdc5c292e31bf457c4969a9a36fbca01151754dd43aea255173cb2cf87d1251fa61106410e604f978c73ea691f158979447a662359b3ae995e77e9e2d23864bb4bd32d8922ddff90f7d338d31083266cfcefbdac055df30d9e7778fe98f9ca9cea26005cd16f20b0af42de7b12a484366adb2aa4adf721eab8e1b819f93b32238275675644d872c1811598f415012d2a186dc2e3f6dce94a80545e33e695a2458197c2b43feee073972793cc1916d30533adeca963f7bc12369dc104ec160c46fc15c87e56cf74eeb02152797c4615068e580ddc983432b07ec4e3e6e2b5f9b5b8f7be5aa55fa23227233064149c0e45c27974fd8ea40a67cffad2c197c14cc78e4fe5096fcf20799f24b7d4f2c83ef7be55b7bfdf2f7fb73a4a33743ee07222f4fede705bdea6775bca37dcf5f6569dfb73cce0126ff720daac4adc89b950debac5b50717dc3847a0e27427910e68f59c5a983e29292124bb3a54e2d89c331a36ccd2ae515158e2c89c3358e7362159418161515e95b44e4569e7d7bf7dab33c749abb3d3c9cd295ad69f9c240c48a2e48cbd51f7d7154fefa2fadcdfffdd71b5572a4d9fc356996ea735ff882e581cac1dffdce71ef6d9bb76c9175ebd7eb5bd638dedc2cb76eddd2b79ca17eed5ad9ba7dbbbe658d8ef676b5fe9493545557cb33cf3eab6f59e3d2850baafd3811b917334149c28285444b85bbb00c808cd9b53df152b8c0a4575e79ad467ef8ef756aa1d544ed7260491cb285181c266a7c7c5cde3f7c582e7ffcb1be27314e9c2762e4354d4e4e4acbd1a372eea38ff43d8941c309a73112f0ce048372b2b555da0d2e7eeac4e3363aefeda33367e4784b8ba1c54fadcc3411517a601094240c5e9152275a8a4206d386f87342b2796362598aab7d7ef9a7efad91e3270ba5bd335ffef1bb6bd4be446c6a745e499c9189e2bd3d3d72f8dd77e5eeddbb2a18405090e800d18a36d44b515c5c9cf07bedd0d090341d3ca832f508fe0e1f3a240f1e3cd0bfba38041c4e2a89c3df98b2f2182d3517b873e78e3469c77af3c60de9efeb53e77e543bf789a8acac54cd219c02e720d16b10813e8ef5ca279fc8ad4f3f55e71e9f13811b9968064244ee95b1b1b1f179fd3119e4f3f9d49b30513230c861ab56639ed93326bbb62f9ea5999bf3c86fde299357f6d7c88389c741c34420439a3fd0824e6d90d5d810c0a798f0b5c1a12ce9eb774ed7be0d4f3f1d37680e0683d276f2a47ca2050073738f2b9d51de8692a7c2a2a2b88d5d9099ecbd7ad55036c14af50d0d718301acfe8f6c40d7d9b3120a3d6ed38fc00fc78db935455a30b51804029f6a03e880434a01573df554dc6c05ce31caba4e9f3aa5ce7d181e5fd38221af7621c7fbdd21e8b83f3626f7eeddd3f7d80bc1fe6756afd6b762ebd1aed1131f7ca0327f61b80efaaf5d93e0f4b42a338e377f0ed707026622722706414b80bbb2f86313f9c787285158f7c4497760d3c15ffcc9b054574deb5b4fba7b3753fef5df56c9f113852a185a08fb2e5cca958fcee5c9b6cf8e6b03fe58eb5ae1ffb7486b9b33327518ccedd8b56bd1411d0673c78e1e8d9901c00071401b2062e057116780381908c89d91117dcb5edb76ec90ec4516a91ed306ef386e0430d120281abc7953fd5e504eb858360defe59f0e0de95bf6dab479f3a2012b02dbd663c7a4bfbf5fdf331f0224cc71426604d91edcb48b0581d0f581017dcb5eeb1b1b55f62f96692dc0f9b0b555657f2203fd48c88c212b86806ab1c60ff81a822922722796c32d5151498978e2dc6d225a08e53d5c1bc81894c27df6e9d8a54d9d6757c873dfad97cb57e297bca12c0edf8b32b958366f7ca09ed3092a162959c240b0bbab4b8e3537cfbb2b1e4bcf952b72e4d021191b8b3db7ca295de290f98a55b284e3fee4f26539d2d49450461e8110caa5466edfd6f73cc929ad9371ae71ce63c1001f656018ecc783e345a91c8e3f9678c161aaa852b845ae3d04fa3887287b8c07d7377e478b0539c88cb2ac9dc8bd98095a22dc4dc5fde644061f4480a039de9d787a121648fddcae2707ee53531e79ed8d1a79f35715323393f89c0e7cefc9f602b93d92259bb480273373fe5d659c9e819bd93270ddfe60b571e3c6a82d7d31df0513c26f5cbfaeef490ceea6f7f5f4a8ec40b416ccaa244efbbadd25716bd6ae55654d0b219b85260046efe2e378501e87ec10cac430e88ea44ae20607251008e87bec81602c5a3080d7df79fab4749f3b37afec2f1e7cef407fbf2af5435668e17b0f7e0fa3a3a3aa2cce4e38d76beaebf5adc7f0fa71cc673a3a0c5d93089487b4f37977642466a087ace78843b29e44945a0c824c90959d2d535a10847213a278cacaca162defa1e8fefc8f87a5b67a7e295cdfb51c79e1c5a7e4c2a53c7d8f71d70672e4e4a902d9d010d0028df9032c8c911128d90903d45d7bf63c3170bda60de6312722d976d61820a2f40b9902ac3f143940c4733e181f578d15ec84f6d00b33a628ef42f9db6299ac7870cc181c6360bcb04c0cf349129d5c6f15550ab7200386723e34b858ca1c16043a08869065ca5ef07bc5f5603498361bdaa0634da84808f491e544f62b59c814e2ff0b02fedcbcf9ef1538ff4e6b114e44a9c120c8041830e4fafd32a1bd5987b43f2444b114141448bef641c664f942f237df1cd206ea0fff7f616ecfdb074be5c7fbebb401ced2cb78d040a1f98362ede78bac5ffbb86942657950de395422b3a1c4334c665b38511cad90db3efc503ebe74c9503620160c32314044e380bc883928088a30c9dc2e28837b7ad3267deb6136008d0fce76769a72c309d97b64c390f58accb2f97373e5cae5cbfa56ea211bb57de74ef57725ecd2c58bd2ded6a632784b85794fc8f26568cf83a020fc3c987f848e7a0886ec80d781796f91659f383fc8f89991990b374d98d13e9747640171be9dd4088488528741904950e2843b6b89b66325f7c1f5812c1019b773fbb83cb3e761f7aad1b14c79f1e59572f47891366053bb4c819fd57d314f2e7c9c2b5b363f909cec902a89bb36e0971b37edcbdc454e144706e3584b8bdc4d602e8811d1ba6ae18ef9d52b576ccb70afaeaf7f342f06591f2c663a3868ee22b908ac9061b8373a2ad5d5d5e2d5023f6406b00fd97d3b604da4f0ba48285f6b3d7e5c757a333b3841b66b78785865c31078e09c23db74ffbe3d6b64a151ccda8606f518811aba1c22283323d08f84ff4338bf38ee70d304fc9e13995f4544cb0b832013e1ce29de549111228ae4d3ae8b4a6d701979779712b7ef6b23b2b2764a353ff8979756c9cd21eb8292db233e69d602acba9a29d5890e59a7b60e7bd613c1f5b273f76ef5f9e2f9f3aa153232415689ecaa8592cd716d408c122a3b6cd9b64d65691088a11b9895f32e31f04797350cc4f19c9873347ceb96fed5d4dab86993ca16a39101025e94255a45b54eefe991422dc84626684e0f0aedd0b06e9d949696aa2005657f89ae73948c85add3110422d024227761106432dc45ccd43e9cb2d604d90f7f60d564e48839179438342cf8d63786e48dffad925ffc5fa50483d63794c0739c385528a3f77cf2877f70570e1e2991900d2571c8cae08e355a21632e472a608088f2200441080ad0563bd5d0b16bfd860d715b219b09c125ca02a1a6aece96d6c9b891b665eb56397be68c9cebea323d0b120d9e43b54ed7824c64dfd071cf0edbb66f57eb5b9d6e6f4f49691a8e3bdc3a1dcd185022c879bd44eee2d9b777af3d05c0cb1cd6aeb0eb0e2a39070635155555e28ba8732763ca4a828204daf048ec754eac545e1a54a572b7efa4fef93149fcded898ccda345f014110eecca71ae6ce21f363c61c9864a075324a9badccba45939797a706e77675a753cfaf5deca9be8987801b0d86ecea4ea79e3f2bcbb6524022b20783200ba1948475c6ee85c0a7acb292011011111191c3585f57e26268718a3ba99c07e23e593e9f9a57c10088888888c8791804590ce5056ab577ce07710dcc674000c4394044444444cec4202805506f8cc9cd0b17fda3e505193fcce1502bd12f58d892888888889c8323b51441560019a1226d90ec6579dcb2a3cadfb4f3bb70957722222222721e06412956a00d92ab6a6a24c7efd7f7503a43408b852c2bb1f05eb67d0b6a1211111151e21804d900ebc6545454a8b2290e9cd3134adff2f580160b1bb2f90511111151fa601064234ca0afaaaa521f784cce97a105b0454545525b5727c525252aa025222222a2f4c275821c048be44d4c4cc883f171b56a3b3983d7eb95dcbc3c15a8b2b90511111151fa6310e450b3b3b36ac574f51108a86d4a0d94b6f97c3ef1fbfd92ad053d0c7c8888888896170641690259a2192d109a9d99510151081f737332870fed6bda03fd3b291108743c1919ea339a1b20db83523794b7a9359d38c78788888868d96210444444444444aec2c6084444444444e42a0c828888888888c8551804111111111191ab3008222222222222576110444444444444aec2208888888888885c8541101111111111b90a83202222222222721506414444444444e42a0c828888888888c8551804111111111191ab3008222222222222576110444444444444aec2208888888888885c8541101111111111b90a83202222222222721506414444444444e42a0c828888888888c8551804111111111191ab30082222222222221711f93dcacfbc9694118d980000000049454e44ae426082);

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
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

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
