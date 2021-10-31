/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : ins-tool

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 03/01/2021 23:41:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mate_user_info
-- ----------------------------
DROP TABLE IF EXISTS `mate_user_info`;
CREATE TABLE `mate_user_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gmt_create` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `gmt_modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user_id` int NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mate_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `chinese_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `primary_center_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `primary_center_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `primary_center_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mate_user_info
-- ----------------------------

-- ----------------------------
-- Table structure for refresh_token
-- ----------------------------
DROP TABLE IF EXISTS `refresh_token`;
CREATE TABLE `refresh_token`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gmt_create` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `gmt_modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `exp_date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of refresh_token
-- ----------------------------
INSERT INTO `refresh_token` VALUES (1, '2021-01-02 15:47:14.393434', '2021-01-02 15:47:14.393434', '32c91d12-dc72-4527-b7bc-d01c09f3d45d', 1, '2021-01-17 15:47:14');
INSERT INTO `refresh_token` VALUES (2, '2021-01-02 17:24:45.005437', '2021-01-02 17:24:45.005437', 'e7b075d8-9801-4d10-affe-206ba71f9713', 1, '2021-01-17 17:24:45');
INSERT INTO `refresh_token` VALUES (3, '2021-01-02 17:27:01.908874', '2021-01-02 17:27:01.908874', 'df4496e0-4192-42a3-9a2b-c1d59978de99', 1, '2021-01-17 17:27:02');
INSERT INTO `refresh_token` VALUES (4, '2021-01-02 19:30:49.310129', '2021-01-02 19:30:49.310129', '5af3e0a4-269f-4ee0-98d6-14650158511c', 1, '2021-01-17 19:30:49');
INSERT INTO `refresh_token` VALUES (5, '2021-01-02 19:31:05.387227', '2021-01-02 19:31:05.387227', 'ad14bdba-dfe6-47de-ae6d-67759e66ae7e', 1, '2021-01-17 19:31:05');
INSERT INTO `refresh_token` VALUES (6, '2021-01-02 19:31:08.900229', '2021-01-02 19:31:08.900229', 'b0ea6c18-a89d-406e-8807-9171986538c8', 1, '2021-01-17 19:31:09');
INSERT INTO `refresh_token` VALUES (7, '2021-01-02 19:31:40.124979', '2021-01-02 19:31:40.124979', 'bba4c603-9af5-4dbc-9005-de06df30542a', 1, '2021-01-17 19:31:40');
INSERT INTO `refresh_token` VALUES (8, '2021-01-02 21:12:33.627005', '2021-01-02 21:12:33.627005', '0296f326-d662-475a-9dfc-c070842373ae', 1, '2021-01-17 21:12:34');
INSERT INTO `refresh_token` VALUES (9, '2021-01-02 21:17:07.841499', '2021-01-02 21:17:07.841499', '1a3e0f80-8612-4f11-92fa-3f67f23a6850', 1, '2021-01-17 21:17:08');
INSERT INTO `refresh_token` VALUES (10, '2021-01-02 21:17:14.473752', '2021-01-02 21:17:14.473752', '45e529b5-0530-4627-ab42-6c8204e51958', 1, '2021-01-17 21:17:14');
INSERT INTO `refresh_token` VALUES (11, '2021-01-02 22:21:21.653155', '2021-01-02 22:21:21.653155', 'ef2ad352-6230-4fd6-ae89-4294902378be', 1, '2021-01-17 22:21:22');
INSERT INTO `refresh_token` VALUES (12, '2021-01-02 22:22:12.119866', '2021-01-02 22:22:12.119866', '97e1dcf5-e57d-4b40-a306-7b3d06d9e156', 1, '2021-01-17 22:22:12');
INSERT INTO `refresh_token` VALUES (13, '2021-01-03 14:55:33.329511', '2021-01-03 14:55:33.329511', '204809d4-269a-4673-ae03-eae54001f1f2', 1, '2021-01-18 14:55:33');

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gmt_create` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `gmt_modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user_id` int NOT NULL,
  `gymbo_mate_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gymbo_mate_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `auto_sync` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of settings
-- ----------------------------
INSERT INTO `settings` VALUES (1, '2021-01-03 16:52:47.102288', '2021-01-03 21:58:36.000000', 1, 'amy.zhao08', '415AMYzhao**', 1);

-- ----------------------------
-- Table structure for settings_entity
-- ----------------------------
DROP TABLE IF EXISTS `settings_entity`;
CREATE TABLE `settings_entity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gmt_create` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `gmt_modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `auto_sync` tinyint NOT NULL,
  `user_id` int NOT NULL,
  `gymbo_mate_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gymbo_mate_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of settings_entity
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gmt_create` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `gmt_modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_verify` tinyint NOT NULL DEFAULT 0,
  `is_block` tinyint NOT NULL DEFAULT 0,
  `is_admin` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '2021-01-02 15:42:37.709986', '2021-01-02 15:42:37.709986', NULL, 'amy', '18674006090', 0, 0, 1);

-- ----------------------------
-- Table structure for user_auth
-- ----------------------------
DROP TABLE IF EXISTS `user_auth`;
CREATE TABLE `user_auth`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `gmt_create` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `gmt_modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `userId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_1a4cb75c8034d8eb53faf1bdcb`(`username`) USING BTREE,
  INDEX `FK_52403f2133a7b1851d8ab4dc9db`(`userId`) USING BTREE,
  CONSTRAINT `FK_52403f2133a7b1851d8ab4dc9db` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_auth
-- ----------------------------
INSERT INTO `user_auth` VALUES (1, '2021-01-02 15:43:04.592923', '2021-01-02 15:43:04.592923', 'amy', '$2a$10$HyAsU5BuaSB30gW3.HAKyuxnD0okfxeMdoi0htlUMSVAtG24O4bIW', 1);

SET FOREIGN_KEY_CHECKS = 1;
