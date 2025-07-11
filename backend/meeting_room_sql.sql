/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 8.0.42 : Database - meeting_room_system
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`meeting_room_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `meeting_room_system`;

/*Table structure for table `audit_log` */

DROP TABLE IF EXISTS `audit_log`;

CREATE TABLE `audit_log` (
  `Log_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int NOT NULL,
  `Action_Type` varchar(100) NOT NULL,
  `Description` text,
  `Timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `IP_Address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Log_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `audit_log_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `booking` */

DROP TABLE IF EXISTS `booking`;

CREATE TABLE `booking` (
  `Booking_ID` int NOT NULL AUTO_INCREMENT COMMENT 'Stores the booking id of the meeting',
  `Room_ID` int DEFAULT NULL COMMENT 'Reference to the meeting room id',
  `User_ID` int DEFAULT NULL COMMENT 'Reference to the user id',
  `Title` varchar(100) NOT NULL COMMENT 'Stores the title of the meeting',
  `Start_Time` datetime DEFAULT NULL COMMENT 'Stores the start time',
  `End_Time` datetime DEFAULT NULL COMMENT 'Stores the end time',
  `Status` varchar(10) DEFAULT NULL COMMENT 'Confirmed or Cancelled',
  `Created_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time when the meeting was booked',
  `Updated_At` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Time when booking is updated',
  PRIMARY KEY (`Booking_ID`),
  KEY `Room_ID` (`Room_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`Room_ID`) REFERENCES `meeting_room` (`Room_ID`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `email_log` */

DROP TABLE IF EXISTS `email_log`;

CREATE TABLE `email_log` (
  `Email_ID` int NOT NULL AUTO_INCREMENT,
  `Booking_ID` int DEFAULT NULL COMMENT 'Reference to the booking id',
  `Recipient_Email` varchar(100) DEFAULT NULL COMMENT 'Stores email of the recipient',
  `Subject` varchar(100) DEFAULT NULL COMMENT 'Stores the subject',
  `Body` varchar(500) DEFAULT NULL COMMENT 'Stores the body',
  `Sent_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Status` varchar(100) DEFAULT NULL COMMENT 'Sent or Failed',
  PRIMARY KEY (`Email_ID`),
  KEY `Booking_ID` (`Booking_ID`),
  CONSTRAINT `email_log_ibfk_1` FOREIGN KEY (`Booking_ID`) REFERENCES `booking` (`Booking_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `location` */

DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `Location_ID` int NOT NULL AUTO_INCREMENT COMMENT 'ID of the location',
  `Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Postal_Code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Location_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `meeting_minutes` */

DROP TABLE IF EXISTS `meeting_minutes`;

CREATE TABLE `meeting_minutes` (
  `Minute_ID` int NOT NULL AUTO_INCREMENT,
  `Booking_ID` int DEFAULT NULL COMMENT 'Reference to the booking Id',
  `Notes_Text` varchar(1500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Stores the notes of the meeting',
  `Attachments_Path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Stores the attachments of the minutes',
  `Created_By` int DEFAULT NULL COMMENT 'Reference to the USER ID',
  `Created_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Minute_ID`),
  KEY `Booking_ID` (`Booking_ID`),
  KEY `Created_By` (`Created_By`),
  CONSTRAINT `meeting_minutes_ibfk_1` FOREIGN KEY (`Booking_ID`) REFERENCES `booking` (`Booking_ID`),
  CONSTRAINT `meeting_minutes_ibfk_2` FOREIGN KEY (`Created_By`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `meeting_room` */

DROP TABLE IF EXISTS `meeting_room`;

CREATE TABLE `meeting_room` (
  `Room_ID` int NOT NULL AUTO_INCREMENT COMMENT 'Room ID',
  `Name` varchar(100) NOT NULL COMMENT 'Name of the room',
  `Location_ID` int DEFAULT NULL COMMENT 'Reference to location id in Location table',
  `Description` varchar(250) NOT NULL COMMENT 'Description of the meeting room',
  `Capacity` int NOT NULL COMMENT 'Stores the capcity of the meeting room',
  `Created_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Stores the time when created',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Stores the time when updated',
  PRIMARY KEY (`Room_ID`),
  KEY `Location_ID` (`Location_ID`),
  CONSTRAINT `meeting_room_ibfk_1` FOREIGN KEY (`Location_ID`) REFERENCES `location` (`Location_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `participants` */

DROP TABLE IF EXISTS `participants`;

CREATE TABLE `participants` (
  `Participant_ID` int NOT NULL AUTO_INCREMENT,
  `Booking_ID` int DEFAULT NULL COMMENT 'Reference to the meeting booking',
  `User_ID` int DEFAULT NULL COMMENT 'Reference to the user',
  `Invitation_Status` tinyint(1) DEFAULT '0' COMMENT 'Stores the invitation status',
  `Notification_Sent` tinyint(1) DEFAULT '0' COMMENT 'Stores the notification status',
  PRIMARY KEY (`Participant_ID`),
  KEY `Booking_ID` (`Booking_ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`Booking_ID`) REFERENCES `booking` (`Booking_ID`),
  CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `recurring_bookings` */

DROP TABLE IF EXISTS `recurring_bookings`;

CREATE TABLE `recurring_bookings` (
  `RecurringRule_ID` int NOT NULL AUTO_INCREMENT,
  `Booking_ID` int NOT NULL,
  `Frequency` enum('Daily','Weekly','Monthly') NOT NULL,
  `End_Date` date NOT NULL,
  `Repeat_On` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`RecurringRule_ID`),
  KEY `Booking_ID` (`Booking_ID`),
  CONSTRAINT `recurring_bookings_ibfk_1` FOREIGN KEY (`Booking_ID`) REFERENCES `booking` (`Booking_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `room_feature` */

DROP TABLE IF EXISTS `room_feature`;

CREATE TABLE `room_feature` (
  `Feature_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL COMMENT 'Name of the ammenity like projector,whiteboard , etc.',
  PRIMARY KEY (`Feature_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `room_feature_mapping` */

DROP TABLE IF EXISTS `room_feature_mapping`;

CREATE TABLE `room_feature_mapping` (
  `Room_ID` int NOT NULL COMMENT 'Reference to the room_id',
  `Feature_ID` int NOT NULL COMMENT 'Reference to the feature id',
  PRIMARY KEY (`Room_ID`,`Feature_ID`),
  KEY `Feature_ID` (`Feature_ID`),
  CONSTRAINT `room_feature_mapping_ibfk_1` FOREIGN KEY (`Room_ID`) REFERENCES `meeting_room` (`Room_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `room_feature_mapping_ibfk_2` FOREIGN KEY (`Feature_ID`) REFERENCES `room_feature` (`Feature_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `test` */

DROP TABLE IF EXISTS `test`;

CREATE TABLE `test` (
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'The name of the user',
  `City` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'The city of the user',
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Auto id for each user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `user_preferences` */

DROP TABLE IF EXISTS `user_preferences`;

CREATE TABLE `user_preferences` (
  `Preference_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int NOT NULL,
  `Default_Location_ID` int DEFAULT NULL,
  `Receive_Email_Notifications` tinyint(1) DEFAULT '1',
  `TimeZone` varchar(50) DEFAULT 'Asia/Kolkata',
  PRIMARY KEY (`Preference_ID`),
  KEY `User_ID` (`User_ID`),
  KEY `Default_Location_ID` (`Default_Location_ID`),
  CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_preferences_ibfk_2` FOREIGN KEY (`Default_Location_ID`) REFERENCES `location` (`Location_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `User_ID` int NOT NULL AUTO_INCREMENT COMMENT 'User ID system generated',
  `First_Name` varchar(255) NOT NULL,
  `Last_Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Created_At` datetime DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Email_2` (`Email`),
  UNIQUE KEY `Email_3` (`Email`),
  UNIQUE KEY `Email_4` (`Email`),
  UNIQUE KEY `Email_5` (`Email`),
  UNIQUE KEY `Email_6` (`Email`),
  UNIQUE KEY `Email_7` (`Email`),
  UNIQUE KEY `Email_8` (`Email`),
  UNIQUE KEY `Email_9` (`Email`),
  UNIQUE KEY `Email_10` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
