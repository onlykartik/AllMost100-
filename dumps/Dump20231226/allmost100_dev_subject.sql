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
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SubjectTitle` varchar(255) DEFAULT NULL,
  `SubjectDescription` text,
  `DeadlineDates` json DEFAULT NULL,
  `CC` varchar(255) DEFAULT NULL,
  `Closed` int DEFAULT NULL,
  `StudentID` int DEFAULT NULL,
  `AssigneeID` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `StudentID` (`StudentID`),
  KEY `AssigneeID` (`AssigneeID`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `student` (`Id`),
  CONSTRAINT `subject_ibfk_2` FOREIGN KEY (`AssigneeID`) REFERENCES `assignee` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'Math','Mathematics course','{\"one\": \"2023-09-01\", \"two\": \"2023-12-31\"}','ramisetty@gmail.com,abbak@gmail.com',1,1,5),(2,'History','History course','{\"one\": \"2023-09-01\", \"two\": \"2023-12-31\"}','ramisetty@gmail.com,abbak@gmail.com',0,1,2),(3,'Science','Science course','{\"one\": \"2023-09-01\", \"two\": \"2023-12-31\"}','ramisetty@gmail.com,abbak@gmail.com',1,3,3),(4,'English','English course','{\"one\": \"2023-09-01\", \"two\": \"2023-12-31\"}','ramisetty@gmail.com,abbak@gmail.com',0,2,4),(5,'Computer Science','Computer Science course','{\"one\": \"2023-09-01\", \"two\": \"2023-12-31\"}','ramisetty@gmail.com,abbak@gmail.com',0,2,5),(6,'English','eligli peace','{\"one\": \"2023-09-01\", \"two\": \"2023-12-31\"}','ramisetty@gmail.com,abbak@gmail.com',0,5,4),(7,'Science','Movie fiction','{\"one\": \"2023-09-01\", \"two\": \"2023-12-31\"}','ramisetty@gmail.com,abbak@gmail.com',0,4,3),(8,'Cyber security','It is the stududy of firewalls to prevent applications from etical hacking','{\"one\": \"30/11/2023\", \"two\": \"\"}','mohan@gmail.com,abbak@gmail.com',0,6,3),(9,'Blockchain','It is the study of daps means decentralised applicaions','{\"one\": \"31/12/2023\", \"two\": \"\"}','mohan@gmail.com,abbak@gmail.com',0,7,4),(10,'english','syllabus , abc , paragrah','{\"one\": \"2023-10-17T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,8,1),(11,'english','syllabus , abc , paragrah','{\"one\": \"2023-10-17T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,8,5),(12,'english','syllabus , abc , paragrah','{\"one\": \"2023-10-17T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,8,2),(13,'english','syllabus , abc , paragrah','{\"one\": \"2023-10-17T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,8,1),(14,'sanskrit','sanskrit is the indian ancestorial language','{\"one\": \"1998-07-10T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,9,4),(15,'ethnic science','sience sign signature ','{\"one\": \"2023-11-21T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,10,1),(16,'Physical Education','Description for PE class','{\"one\": \"2023-10-26T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,11,4),(17,'Music','Description for Music class','{\"one\": \"2023-10-25T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,12,2),(18,'Foreign Language','Description for Language class','{\"one\": \"2023-10-25T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,13,4),(19,'Art','Description for Art class','{\"one\": \"2023-10-24T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,14,5),(20,'frontend','frondend','{\"one\": \"2023-12-12T18:30:00.000Z\", \"two\": \"\"}','mohan@gmail.com,abbak@gmail.com',0,15,4),(21,'Geography','Description for Geography class','{\"one\": \"2023-10-23T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,ramisetty@gmail.com',0,16,5),(22,'Computer Science','Description for CS class','{\"one\": \"2023-11-12T18:30:00.000Z\", \"two\": \"\"}','abbak@gmail.com,mohan@gmail.com',0,17,2);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-26  8:38:33
