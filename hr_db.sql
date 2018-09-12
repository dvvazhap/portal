-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 12, 2018 at 04:55 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hr_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
CREATE TABLE IF NOT EXISTS `education` (
  `email` varchar(50) NOT NULL,
  `ind` int(3) NOT NULL,
  `college` varchar(50) DEFAULT NULL,
  `degree` varchar(50) DEFAULT NULL,
  `stream` varchar(50) DEFAULT NULL,
  `start` varchar(7) DEFAULT NULL,
  `end` varchar(7) DEFAULT NULL,
  `cgpa` float DEFAULT '0',
  `percentage` float DEFAULT '0',
  UNIQUE KEY `email` (`email`,`ind`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employerinfo`
--

DROP TABLE IF EXISTS `employerinfo`;
CREATE TABLE IF NOT EXISTS `employerinfo` (
  `email` varchar(50) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `designation` varchar(30) DEFAULT NULL,
  `org_name` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employerinfo`
--

INSERT INTO `employerinfo` (`email`, `name`, `designation`, `org_name`, `city`, `phone`) VALUES
('info.werthere4u@gmail.com', 'Owner', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `email` varchar(50) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `profile` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`email`, `subject`, `profile`) VALUES
('dijil2208@gmail.com', 'heloooo', 1),
('dijil2208@gmail.com', 'dsxfsdf', 1);

-- --------------------------------------------------------

--
-- Table structure for table `openings`
--

DROP TABLE IF EXISTS `openings`;
CREATE TABLE IF NOT EXISTS `openings` (
  `ind` int(3) NOT NULL AUTO_INCREMENT,
  `timestamp` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `fullTime` int(1) NOT NULL DEFAULT '1',
  `partTime` int(1) NOT NULL DEFAULT '0',
  `intern` int(1) NOT NULL DEFAULT '0',
  `designation` varchar(100) DEFAULT NULL,
  `company` varchar(30) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `min_years` float DEFAULT NULL,
  `max_years` float DEFAULT NULL,
  `skills` varchar(300) DEFAULT NULL,
  `specificReq` varchar(300) DEFAULT NULL,
  `noticePeriod` int(3) DEFAULT NULL,
  `gender` varchar(11) NOT NULL DEFAULT 'Anyone',
  `count` int(3) NOT NULL DEFAULT '1',
  `viewers` int(5) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ind`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `email` varchar(50) NOT NULL,
  `ind` int(3) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `skills` varchar(500) DEFAULT NULL,
  `start` varchar(7) DEFAULT NULL,
  `end` varchar(7) DEFAULT NULL,
  UNIQUE KEY `email` (`email`,`ind`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`email`, `ind`, `name`, `description`, `skills`, `start`, `end`) VALUES
('dijil2208@gmail.com', 1, 'dfgdfg', '', '', '2015-12', '2016-03');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
  `email` varchar(50) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `looking` int(1) DEFAULT '0',
  `fullTime` int(1) DEFAULT '1',
  `partTime` int(1) DEFAULT '0',
  `intern` int(1) DEFAULT '0',
  `designation` varchar(30) DEFAULT NULL,
  `fut_location` varchar(100) DEFAULT NULL,
  `experience` float DEFAULT NULL,
  `noticePeriod` int(3) DEFAULT NULL,
  `skills` varchar(1000) DEFAULT NULL,
  `specificReq` varchar(1000) DEFAULT NULL,
  `gender` varchar(11) NOT NULL DEFAULT 'Anyone',
  `viewers` int(5) NOT NULL DEFAULT '1',
  `objective` varchar(1000) DEFAULT NULL,
  `languages` varchar(200) DEFAULT NULL,
  `academic_ach` varchar(1000) DEFAULT NULL,
  `extra_curricular` varchar(1000) DEFAULT NULL,
  `certifications` varchar(1000) DEFAULT NULL,
  `hobbies` varchar(1000) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `linkedin` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`email`, `name`, `phone`, `looking`, `fullTime`, `partTime`, `intern`, `designation`, `fut_location`, `experience`, `noticePeriod`, `skills`, `specificReq`, `gender`, `viewers`, `objective`, `languages`, `academic_ach`, `extra_curricular`, `certifications`, `hobbies`, `address`, `linkedin`) VALUES
('dijil2208@gmail.com', 'DIJIL VV', '', 1, 1, 0, 0, 'Lead Engineer', 'Bangalore', 4.8, 30, 'Angular', '', 'Male', 1, '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `token` varchar(75) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `v_profile` int(20) NOT NULL,
  `validity` varchar(30) NOT NULL DEFAULT 'lifetime',
  `user_type` int(2) NOT NULL,
  `reset_code` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`token`, `password`, `email`, `v_profile`, `validity`, `user_type`, `reset_code`, `name`) VALUES
('1536727493607dijil2208@gmail.com', '2f9453c5ab5205dace6ad5b1618aba1c', 'dijil2208@gmail.com', 1, 'lifetime', 2, NULL, 'dijil'),
('1536727672641info.werthere4u@gmail.com', '2f9453c5ab5205dace6ad5b1618aba1c', 'info.werthere4u@gmail.com', 1, 'lifetime', 3, NULL, 'Owner');

-- --------------------------------------------------------

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
CREATE TABLE IF NOT EXISTS `work_experience` (
  `email` varchar(50) NOT NULL,
  `ind` int(3) NOT NULL,
  `company` varchar(50) DEFAULT NULL,
  `start` varchar(7) DEFAULT NULL,
  `end` varchar(7) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  UNIQUE KEY `email` (`email`,`ind`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
