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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CommentText` text,
  `PostedBy` varchar(255) DEFAULT NULL,
  `PostedByEmail` varchar(255) DEFAULT NULL,
  `SubjectId` int DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `SubjectId` (`SubjectId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`SubjectId`) REFERENCES `subject` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Excellent job!','Assignee','assignee@example.com',1,'2023-11-21 02:27:47'),(2,'Well done!','Student','student@example.com',2,'2023-11-21 02:27:47'),(3,'Impressive work!','Assignee','another_assignee@example.com',1,'2023-11-21 02:27:47'),(4,'Thank you for your help!','Student','another_student@example.com',2,'2023-11-21 02:27:47'),(6,'hi komati moham ','assignee','anu@example.com',15,'2023-11-23 21:39:40'),(7,'Hey, komati  moham,Anusha','admin','abbak@gmail.com',15,'2023-11-23 21:41:04'),(8,'Math john ravi.','admin','abbak@gmail.com',1,'2023-11-23 21:46:53'),(11,'anu ms1','assignee','anu@example.com',15,'2023-11-23 23:00:29'),(12,'hey komati 1','admin','abbak@gmail.com',15,'2023-11-23 23:02:28'),(13,'anu ms2','assignee','anu@example.com',15,'2023-11-23 23:02:48'),(14,'hey komati 2','admin','abbak@gmail.com',15,'2023-11-23 23:02:53'),(15,'anu ms3','assignee','anu@example.com',15,'2023-11-23 23:02:58'),(16,'hey komati 3','admin','abbak@gmail.com',15,'2023-11-23 23:03:03'),(17,'anu ms4','assignee','anu@example.com',15,'2023-11-23 23:03:07'),(18,'hey komati 4','admin','abbak@gmail.com',15,'2023-11-23 23:03:11'),(19,'Hey, komati  moham,Anusha I hope everyone is enjoying this channel. ... write you ping Gratitude in advance, abbak@gmail.com & Team100%.','admin','abbak@gmail.com',15,'2023-11-23 23:32:21'),(20,'Gratitude in advance,\nabbak@gmail.com & Team100%.','Admin','abbak@gmail.com',15,'2023-11-24 00:08:26'),(21,'greate team','Admin','abbak@gmail.com',15,'2023-11-24 00:13:38'),(22,'bye','Assignee','anu@example.com',15,'2023-11-24 00:17:11'),(23,'... write you ping\n','Admin','abbak@gmail.com',15,'2023-11-24 00:21:57'),(24,'abbak i hope you doing fine','Admin','abbak@gmail.com',15,'2023-11-24 00:24:56'),(25,'hey','Assignee','anu@example.com',15,'2023-11-24 00:25:26'),(26,'Hey, John,ravi I hope everyone is enjoying this channel. \n                      \n                                ... write you ping\n                        \nGratitude in advance,\nramisetty@gmail.com & Team100%.','Admin','abbak@gmail.com',1,'2023-11-24 00:27:18'),(27,'Hey, John,ravi I hope everyone is enjoying this channel. \n                      \n                                ... write you ping\n                        \nGratitude in advance,\nramisetty@gmail.com & Team100%.','Admin','abbak@gmail.com',1,'2023-11-24 00:29:11'),(28,'Hey, John,ravi I hope everyone is enjoying this channel. \n                      \n                                ... write you ping\n                        \nGratitude in advance,\nramisetty@gmail.com & Team100%.','Admin','abbak@gmail.com',1,'2023-11-24 00:30:04'),(29,'Hey, Ella Davis,ravi I hope everyone is enjoying this channel. \n                      \n                                ... write you ping\n                        \nGratitude in advance,\nabbak@gmail.com & Team100%.','Admin','abbak@gmail.com',19,'2023-11-25 16:34:15'),(30,'Hello, ella davis how are you doing?. I have several questions about this week\'s lab, discussion, and quiz:)\n\n                                   ...write you ping \n\nThanking in advance,\nElla Davis & Team100%.','Assignee','ravi@example.com',19,'2023-11-25 16:34:22'),(31,'Hey, ravi. Any hurdles in submitting the Art weekly deadline? kindly Don\'t hesitate to ping me there :).\n\n                                ...write your ping \n\n','Student','ella.davis@email.com',19,'2023-11-25 16:34:43'),(32,'Hello, saroj kumar how are you doing?. I have several questions about this week\'s lab, discussion, and quiz:)\n\n                                   ...write you ping \n\nThanking in advance,\nsaroj kumar & Team100%.','Assignee','aish@example.com',20,'2023-12-25 23:26:37'),(33,'can you pls let us know when is your next deadline ','Assignee','aish@example.com',20,'2023-12-25 23:27:19'),(34,'Hey, saroj kumar,aishwarya I hope everyone is enjoying this channel. \n                      \n                        \nGratitude in advance,\nmohan@gmail.com & Team100%.','Admin','abbak@gmail.com',20,'2023-12-25 23:27:57'),(35,'Hey, Samuel Harris,Karthik I hope everyone is enjoying this channel. \n                      \n                                ... write you ping\n                        \nGratitude in advance,\nabbak@gmail.com & Team100%.','Admin','abbak@gmail.com',22,'2023-12-26 08:25:40'),(36,'Hey, Samuel Harris,Karthik I hope everyone is enjoying this channel. \n                      \n                        \nGratitude in advance,\nabbak@gmail.com & Team100%.','Admin','abbak@gmail.com',22,'2023-12-26 08:25:52');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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
