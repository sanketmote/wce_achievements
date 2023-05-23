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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table social.posts: ~1 rows (approximately)
INSERT INTO `posts` (`id`, `desc`, `area`, `startDate`, `endDate`, `images`, `userid`, `createdAt`, `updatedAt`, `teammate`) VALUES
	(9, 'sad f ', 'fev', '2023-05-02T07:00:00.000Z', '2023-05-11T07:00:00.000Z', '["https://res.cloudinary.com/dcnzisojf/image/upload/v1683050929/test5654.png","https://res.cloudinary.com/dcnzisojf/image/upload/v1683050930/test9625.png"]', 2, '2023-05-02 11:09:56', NULL, 'S M'),
	(10, 'Presented', 'fev', '2023-05-02T07:00:00.000Z', '2023-05-19T07:00:00.000Z', '["https://res.cloudinary.com/dcnzisojf/image/upload/v1683052327/test7198.png","https://res.cloudinary.com/dcnzisojf/image/upload/v1683052328/test3287.png","https://res.cloudinary.com/dcnzisojf/image/upload/v1683052329/test1300.png"]', 2, '2023-05-02 11:33:16', NULL, 'gtrg'),
	(11, 'sample', 'WCE Sangli', '2023-05-02T07:00:00.000Z', '2023-06-02T07:00:00.000Z', '["https://res.cloudinary.com/dcnzisojf/image/upload/v1683183629/test3472.png"]', 4, '2023-05-04 00:00:29', NULL, 'Aniket'),
	(12, 'Presented in res', 'wce', '2023-05-04T07:00:00.000Z', '2023-05-12T07:00:00.000Z', '["Error in Uploading images","Error in Uploading images","Error in Uploading images"]', 4, '2023-05-04 00:54:26', NULL, 'Aniket');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table social.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `converPic`, `profilePic`, `city`, `website`, `role`) VALUES
	(1, 'sanketmote', 'sanketmote99@gmail.com', '$2a$10$/cCjRk2NbsFAgHESouDOxOUZkBRdPXObTb17/m5.TEseJvOBBHvLi', 'sanket mote', NULL, NULL, NULL, NULL, 2),
	(2, 'user', 'user@gmail.com', '$2a$10$YgSuBCulQw2GmbBCVX5Ue.OKzuvJdHmmaxXSWLldjFiOB77hMdq/W', 'S M', NULL, NULL, NULL, NULL, 1),
	(3, 'admin', 'admin@gmail.com', '$2a$10$8Kl0zq49i9AuAn44rCtek.6EKjbrJPzKbyLhriKmv/BQcAGQsbJ/e', 'Admin', NULL, NULL, NULL, NULL, 1),
	(4, 'aniket', 'vyawahareaniket2@gmail.com', '$2a$10$lg53qCHkTbl5kV.s2LsKrOjwkYu70VNP7oY.6BeKePME2x5y7sxBi', 'Aniket', NULL, NULL, NULL, NULL, 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
