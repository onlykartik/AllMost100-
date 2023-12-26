-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: allmost100_dev
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `University` varchar(255) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'John','John@example.com','University of ABC',NULL),(2,'Karen','Karen@example.com','University of XYZ',NULL),(3,'Mark','Mark@example.com',NULL,NULL),(4,'Ali','Ali@example.com',NULL,NULL),(5,'Freeman','Freeman@example.com',NULL,NULL),(6,'abba ramya','abbaRamya@gmail.com','rowuniversity',NULL),(7,'ravinder','ravinderreddy@gmail.com','saint louis',NULL),(8,'karhtik reddy','karthik.rdyy@gmail.com','University A',NULL),(9,'surya namaskar','surya@gmail.com','Unknown University',NULL),(10,'komati  moham','komati@gmail.com','Unknown University',NULL),(11,'Olivia Hall','olivia.hall@email.com','Unknown University',NULL),(12,'George Lee','george.lee@email.com','Unknown University',NULL),(13,'Sophia Wilson','sophia.wilson@email.com','University B',NULL),(14,'Ella Davis','ella.davis@email.com','Unknown University',NULL),(15,'saroj kumar','saroj@gamil.com','albyna',NULL),(16,'Charlie Brown','charlie.brown@email.com','Unknown University',NULL),(17,'Samuel Harris','samuel.harris@email.com','University C',NULL),(18,'Bob Johnson','bob.johnson@email.com','Unknown University',NULL),(19,'jyothi undela','jyothi@gmail.com','paris',NULL),(20,'paul milk','paul@gmail.com','saiint jesus ','987654321'),(21,'siri sir','sirish@gmail.com','pas univercity','92423324'),(22,'saalar cease fire','salaar@gmail.com','zoo','98313121');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-27  1:29:47
