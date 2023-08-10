-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: Groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `postId_idx` (`postId`),
  KEY `commentUserId_idx` (`userId`),
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (31,'Remember what happened last time?','2023-08-08 21:44:59',43,92),(32,'Oh you look so handsome trying to save me :)','2023-08-08 21:47:47',45,93),(33,'Not too late this time....I have a kingdom to run','2023-08-08 21:48:09',45,92),(34,'BEAUTIFUL SUNLIGHT!!!!','2023-08-08 21:51:04',44,94),(35,'Im so down','2023-08-08 21:51:15',44,92),(36,'so pixilated bro.....LOL','2023-08-08 21:51:39',44,93),(37,'HAHAHA you will never defeat the ghosts','2023-08-08 21:55:54',46,95),(38,'YOU KNOW ILL BE THERE AND DESTROY YOU ALL!!!!!','2023-08-08 21:56:14',46,92),(39,'You got lucky that time','2023-08-08 21:56:32',46,93),(40,'All thats missing is me my love......right??','2023-08-08 21:56:59',46,94),(41,'look how happy i am :)','2023-08-08 22:09:57',47,94),(42,'i could never do that, you\'re so strong Luigi','2023-08-08 22:10:21',47,95),(43,'Good form','2023-08-08 22:10:31',47,96),(45,'Mario be tripping, pfffttt ill see you fools there','2023-08-08 22:12:16',42,92);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendships`
--

DROP TABLE IF EXISTS `friendships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `friendId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  KEY `friendId_idx` (`friendId`),
  CONSTRAINT `friendId` FOREIGN KEY (`friendId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requestUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendships`
--

LOCK TABLES `friendships` WRITE;
/*!40000 ALTER TABLE `friendships` DISABLE KEYS */;
INSERT INTO `friendships` VALUES (188,45,47),(189,45,43),(190,43,44),(191,43,45),(192,43,47),(193,43,46),(194,43,42),(195,44,47),(196,44,43),(197,44,42),(198,44,45),(199,47,44),(200,47,45),(201,47,43),(202,47,42),(203,42,44),(204,42,45),(205,42,43),(206,42,47),(207,45,42),(208,45,44);
/*!40000 ALTER TABLE `friendships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `likeUserId_idx` (`userId`),
  KEY `likePostId_idx` (`postId`),
  CONSTRAINT `likePostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likeUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (66,43,92),(67,45,93),(68,45,92),(69,44,92),(70,44,93),(71,44,94),(72,46,95),(73,46,92),(74,46,93),(75,46,94),(76,47,93),(77,47,94),(78,47,95),(79,47,96),(80,42,96),(81,42,95),(82,42,94),(83,42,93),(84,42,92),(87,45,95),(88,45,96),(90,43,94);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (92,'Anyone down for a game of MarioKart tonight?','',47,'2023-08-08 21:44:13'),(93,'Flasback to this gem!!!','1691524033980supermario.jpeg',43,'2023-08-08 21:47:14'),(94,'Just hanging out with my little toad overlooking the kingdom','1691524216790peach:Wtoad.jpeg',45,'2023-08-08 21:50:16'),(95,'Time to exterminate these ghosts......I\'m not scared, you are','1691524426741luigisghosts.webp',44,'2023-08-08 21:53:46'),(96,'Nice day on the greens today','1691524532552bowser golf.png',46,'2023-08-08 21:55:32'),(98,'2 in Miami, 1 in Cleveland and 1 (for now) in L.A!! Strive for greatness!!','1691667036429lebrongrings.avif',42,'2023-08-10 13:30:36');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `coverPic` varchar(500) DEFAULT NULL,
  `profilePic` varchar(500) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `bio` varchar(200) DEFAULT NULL,
  `occupation` varchar(45) DEFAULT NULL,
  `hobbies` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (42,'Lebron','James','j@j.com','$2a$10$.vML48vPLB2gb3l2j97R9e6s/qNi5a6jLXHOYYWBrwCfPjPjt5p9.','1691522142060Lakers.png','1691522336307lebron.jpeg','L.A','4 time champ','pro baller','jump rope'),(43,'Mario','Mario','m@m.com','$2a$10$2I079CNjGMR0D5TDARUSperTMsZtVGY64z05SyeZGAI2Kg.PUmm.y','1691522436214mario64.jpeg','1691522436221mario.png','Mario Land','It\'s a me a Mario!!','Saving Peach','Eating mushrooms'),(44,'Luigi','Mario','l@l.com','$2a$10$nUOIUhBXzTknO.Lq/5cQ7O0nPPrjAfA8A8rQ/hdotUbW1HekXjORO','1691522661393Luigis-Mansion11.webp','1691522607131luigi.jpeg','Luigis Mansion','Always second best to my brother!','Ghost buster','Popping balloons with friends'),(45,'Princess Peach','Toadstool','p@p.com','$2a$10$185rWk5rIcZv2tTQyVNm3OffFv2K.L90jlgN4lDu1yd7AI2fUJd0S','1691522997702Mushroom_Kingdom.jpeg','1691522915989peach.webp','Mushroom Kingdom','Ruler of the Mushroom Kingdom','Ruler','Playing Mario Kart 64'),(46,'King Bowser','Kooper','b@b.com','$2a$10$sv0kani7sdP4fsaAPgmgDOBUTN0Cz5ANm8KcA.ls4WMG/Scn5iw5W','1691523475706bowsers castle.webp','1691523475715Bowser.png','Bowser\'s Castle','MWAHAHA King bowser is here','Ruler of all Kooper\'s','Walks with Peach'),(47,'Toad','Toadstool','t@t.com','$2a$10$68BpOpDw3Q.c45fTUZXne.1jhOP8HGKnlIi/lVdqaglcmlhO2S0E2','1691523793419Mushroom_Kingdom.jpeg','1691523793429toad.jpeg','Mushroom Kingdom','Just a little Toad trying to be my best','Protector of our beloved princess','Eating mushrooms');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-10 15:59:37
