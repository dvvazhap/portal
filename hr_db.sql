-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 07, 2018 at 05:09 AM
-- Server version: 5.7.19
-- PHP Version: 7.0.23

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
('dijil2208@gmail.com', 'Dijil', 'SSE', 'Samsung', 'Bangalore', '9739091906'),
('dijil2208@gmail.comv', NULL, NULL, NULL, NULL, NULL),
('info.werthere4u@gmail.com', NULL, NULL, NULL, NULL, NULL);

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
('undefined', 'dijil2208@gmail.com', 1),
('dijil2208@gmail.com', 'undefined', 1),
('dijil2208@gmail.com', 'undefined', 1),
('dijil2208@gmail.com', 'undefined', 1),
('dijil2208@gmail.com', 'undefined', 1),
('dijil2208@gmail.com', 'undefined', 1),
('dijil2208@gmail.com', 'undefined', 1),
('dijil2208@gmail.com', 'undefined', 1),
('dijil2208@gmail.com', 'dsfg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `openings`
--

DROP TABLE IF EXISTS `openings`;
CREATE TABLE IF NOT EXISTS `openings` (
  `ind` int(3) NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  PRIMARY KEY (`ind`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `openings`
--

INSERT INTO `openings` (`ind`, `timestamp`, `email`, `fullTime`, `partTime`, `intern`, `designation`, `company`, `location`, `contact`, `min_years`, `max_years`, `skills`, `specificReq`, `noticePeriod`) VALUES
(28, '2018-06-05 18:34:19', 'dijil2208@gmail.com', 1, 0, 0, 'sse', 'Samsung', 'Chennai', '78789798', 0, 1, 'Angular', '15 lacs', 10),
(31, '2018-06-05 18:37:26', 'dijil2208@gmail.com', 1, 0, 0, 'dfsd', 'fsdfsdf', 'sdfsdf', '34534534', 0, 0, 'dsfsdf', 'sdfsdf', 30),
(32, '2018-06-05 18:38:36', 'dijil2208@gmail.com', 1, 0, 0, 'zxczx', 'czxc', 'zxcz', '43534534', 0, 0, 'dsfsdf', 'dsfsdf', 320),
(30, '2018-06-05 18:36:07', 'dijil2208@gmail.com', 1, 1, 1, 'bbbbb', 'bbbb', 'bbbb', '456456546', 0, 10, 'sddasd', 'asdas', 112),
(29, '2018-06-05 18:35:46', 'dijil2208@gmail.com', 1, 1, 0, 'aaaa', 'aaaa', 'aaaa', '677868768', 0, 56, 'ghgjhgj', 'hgjhghj', 10);

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
  `company` varchar(30) DEFAULT NULL,
  `cur_location` varchar(30) DEFAULT NULL,
  `fut_location` varchar(100) DEFAULT NULL,
  `experience` float DEFAULT NULL,
  `noticePeriod` int(3) DEFAULT NULL,
  `degree` varchar(30) DEFAULT NULL,
  `stream` varchar(30) DEFAULT NULL,
  `institution` varchar(30) DEFAULT NULL,
  `passout` int(4) DEFAULT NULL,
  `skills` varchar(300) DEFAULT NULL,
  `specificReq` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`email`, `name`, `phone`, `looking`, `fullTime`, `partTime`, `intern`, `designation`, `company`, `cur_location`, `fut_location`, `experience`, `noticePeriod`, `degree`, `stream`, `institution`, `passout`, `skills`, `specificReq`) VALUES
('dijil2208@gmail.coma', 'Dijil234234', '324356756', 1, 1, 1, 1, 'ashjdj', 'hkjh', 'kjh', 'kjh', 3.4435, 70, 'sajknbjkn', 'njk', 'nkjn', 2018, 'asdasd', 'asdasd');

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
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`token`, `password`, `email`, `v_profile`, `validity`, `user_type`, `reset_code`) VALUES
('1528311708932info.werthere4u@gmail.com', '6a64e78b762e44c0d25b81c152dcdbfe', 'info.werthere4u@gmail.com', 1, 'lifetime', 3, NULL),
('1527966559098dijil2208@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'dijil2208@gmail.com', 1, 'lifetime', 1, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
