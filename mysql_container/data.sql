-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.33 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for social
CREATE DATABASE IF NOT EXISTS `social` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `social`;

-- Dumping structure for table social.activitis
CREATE TABLE IF NOT EXISTS `activitis` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK__users` (`userid`),
  CONSTRAINT `FK__users` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table social.activitis: ~0 rows (approximately)

-- Dumping structure for table social.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `useridincomment` (`userId`),
  KEY `postidcomment` (`postId`),
  CONSTRAINT `postidcomment` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `useridincomment` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table social.comments: ~0 rows (approximately)

-- Dumping structure for table social.likes
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `postid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `likesuserid` (`userid`),
  KEY `likespostid` (`postid`),
  CONSTRAINT `likespostid` FOREIGN KEY (`postid`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likesuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table social.likes: ~0 rows (approximately)

-- Dumping structure for table social.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(500) DEFAULT NULL,
  `area` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `startDate` varchar(200) DEFAULT NULL,
  `endDate` varchar(200) DEFAULT NULL,
  `images` varchar(1000) NOT NULL,
  `userid` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `teammate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `outcome` varchar(500) DEFAULT NULL,
  `obj` varchar(500) DEFAULT NULL,
  `type` varchar(1000) DEFAULT NULL,
  `award` varchar(100) DEFAULT NULL,
  `verified` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '2',
  `admres` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table social.posts: ~2 rows (approximately)
INSERT INTO `posts` (`id`, `desc`, `area`, `startDate`, `endDate`, `images`, `userid`, `createdAt`, `updatedAt`, `teammate`, `outcome`, `obj`, `type`, `award`, `verified`, `status`, `admres`) VALUES
	(13, 'Presented', 'wce', '2023-05-17T07:00:00.000Z', '2023-06-19T07:00:00.000Z', '["https://res.cloudinary.com/dcnzisojf/image/upload/v1684916571/test3341.png"]', 2, '2023-05-24 01:22:52', NULL, 'Aniket', '', '', '[{"label":"Sports Achievements","value":"sport"},{"label":"Academic Achievements","value":"edu"}]', '', 0, 2, NULL),
	(14, 'Preseted', 'wce', '2023-06-02T07:00:00.000Z', '2023-07-05T07:00:00.000Z', '["https://res.cloudinary.com/dcnzisojf/image/upload/v1684932367/test7272.png"]', 4, '2023-05-24 05:46:08', NULL, 'Aniket', '', '', '[{"label":"Sports Achievements","value":"sport"},{"label":"Research and Innovation","value":"res"}]', '', 1, 1, '');

-- Dumping structure for table social.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `converPic` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `profilePic` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `role` int DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE,
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table social.users: ~7 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `converPic`, `profilePic`, `city`, `website`, `role`) VALUES
	(1, 'sanketmote', 'sanketmote99@gmail.com', '$2a$10$/cCjRk2NbsFAgHESouDOxOUZkBRdPXObTb17/m5.TEseJvOBBHvLi', 'sanket mote', NULL, NULL, NULL, NULL, 2),
	(2, 'user', 'user@gmail.com', '$2a$10$YgSuBCulQw2GmbBCVX5Ue.OKzuvJdHmmaxXSWLldjFiOB77hMdq/W', 'S M', NULL, NULL, NULL, NULL, 1),
	(3, 'admin', 'admin@gmail.com', '$2a$10$8Kl0zq49i9AuAn44rCtek.6EKjbrJPzKbyLhriKmv/BQcAGQsbJ/e', 'Admin', NULL, NULL, NULL, NULL, 1),
	(4, 'aniket', 'vyawahareaniket2@gmail.com', '$2a$10$lg53qCHkTbl5kV.s2LsKrOjwkYu70VNP7oY.6BeKePME2x5y7sxBi', 'Aniket', NULL, NULL, NULL, NULL, 2),
	(5, '', '', '$2a$10$0D1Oa4VZbLyAj29KJmPZbumTJmDr74H46YHrYsf082b7yWw7XORg.', '', NULL, NULL, NULL, NULL, 2),
	(6, 'ok', 'ok@gmail.com', '$2a$10$mV4yiMu8w8Pa5txWDUD/RO40kMJk.4AZ4AIygxRVqzEAC8rxF8Os2', 'ok', NULL, NULL, NULL, NULL, 2),
	(7, 'mk', 'mmk@gmail.com', '$2a$10$nvxYSu8hCnQl2lyI4o71UuLprJ5bHsHxCiBPrjTO6mwV3XBzFHWO.', 'mk', NULL, NULL, NULL, NULL, 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
