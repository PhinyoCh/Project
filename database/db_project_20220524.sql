-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 23, 2022 at 05:37 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
CREATE TABLE IF NOT EXISTS `record` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `record_type` int NOT NULL COMMENT '1=ไฟล์เสียง, 2=ไฟล์บันทึก',
  `record_name` varchar(50) NOT NULL,
  `record_detail` varchar(250) NOT NULL,
  `record_by` int NOT NULL,
  `reccord_date` datetime NOT NULL,
  `update_by` int NOT NULL,
  `update_date` datetime NOT NULL,
  `active` int NOT NULL COMMENT '0=ไฟล์ที่ถูกลบ, 1=ไฟล์ใช้งาน',
  PRIMARY KEY (`record_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(50) NOT NULL,
  `room_number` varchar(32) NOT NULL,
  `mac_address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ip_address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `floor` int NOT NULL,
  `active` int NOT NULL COMMENT '0=ไม่ใช้งาน, 1=ใช้งาน',
  `create_by` int NOT NULL,
  `create_date` datetime NOT NULL,
  `update_by` int NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(80) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `s_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `user_role` int NOT NULL COMMENT '1=admin, 2=staff',
  `active` int NOT NULL COMMENT '0=ไม่ใช้งาน, 1=ใช้งาน ',
  `create_by` int NOT NULL,
  `create_date` datetime NOT NULL,
  `update_by` int NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
