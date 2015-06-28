-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 28 jun 2015 om 11:25
-- Serverversie: 5.6.24-log
-- PHP-versie: 5.5.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `starty`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `backlog_items`
--

CREATE TABLE IF NOT EXISTS `backlog_items` (
  `id` varchar(6) NOT NULL,
  `project_id` varchar(50) NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(20) NOT NULL,
  `time_expected` int(11) NOT NULL,
  `time_reality` int(11) NOT NULL,
  `creator` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `issues`
--

CREATE TABLE IF NOT EXISTS `issues` (
  `id` varchar(6) NOT NULL,
  `project_id` varchar(50) NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(20) NOT NULL,
  `priority` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `time_expected` int(11) NOT NULL,
  `time_reality` int(11) NOT NULL,
  `creator` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `organizations`
--

CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `shortcode` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `project_users`
--

CREATE TABLE IF NOT EXISTS `project_users` (
  `UID` int(11) NOT NULL,
  `PID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `providers`
--

CREATE TABLE IF NOT EXISTS `providers` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `access_token` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `backlog_items`
--
ALTER TABLE `backlog_items`
  ADD PRIMARY KEY (`id`,`project_id`);

--
-- Indexen voor tabel `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`,`project_id`);

--
-- Indexen voor tabel `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`), ADD KEY `shortcode_index` (`shortcode`) USING BTREE;

--
-- Indexen voor tabel `project_users`
--
ALTER TABLE `project_users`
  ADD PRIMARY KEY (`UID`,`PID`), ADD KEY `fk_projects` (`PID`);

--
-- Indexen voor tabel `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`,`project_id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD KEY `email` (`email`) USING BTREE;

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT voor een tabel `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT voor een tabel `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=43;
--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `project_users`
--
ALTER TABLE `project_users`
ADD CONSTRAINT `fk_projects` FOREIGN KEY (`PID`) REFERENCES `projects` (`id`),
ADD CONSTRAINT `fk_usersp` FOREIGN KEY (`UID`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
