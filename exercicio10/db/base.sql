-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Tempo de geração: 04/03/2026 às 12:58
-- Versão do servidor: 8.0.45
-- Versão do PHP: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `novos_titans_db`
--

-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `novos_titans_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `novos_titans_db`;

--
-- Estrutura para tabela `exercicio10`
--

CREATE TABLE `exercicio10` (
  `id` int NOT NULL,
  `data_consumo` date NOT NULL,
  `consumo_kwh` decimal(8,2) NOT NULL,
  `classificacao` varchar(20) NOT NULL,
  `data_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `exercicio10`
--
ALTER TABLE `exercicio10`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `exercicio10`
--
ALTER TABLE `exercicio10`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
