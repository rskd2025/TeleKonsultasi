-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.42 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mental_health_app
CREATE DATABASE IF NOT EXISTS `mental_health_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mental_health_app`;

-- Dumping structure for table mental_health_app.faskes
CREATE TABLE IF NOT EXISTS `faskes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `kode` varchar(50) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `kabupaten` varchar(100) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kode` (`kode`)
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mental_health_app.faskes: ~0 rows (approximately)
REPLACE INTO `faskes` (`id`, `nama`, `kode`, `jenis`, `kabupaten`, `provinsi`) VALUES
	(1, 'Puskesmas Tomalehu Timur', 'P8106030204', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(2, 'Puskesmas Kataloka', 'P8107010103', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(3, 'Puskesmas Upt Trans R Banggoi', 'P8107040102', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(4, 'Puskesmas Werinama', 'P8107030101', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(5, 'Puskesmas Geser', 'P8107020101', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(6, 'Puskesmas Ukarsengan Kab. Seram Bagian Timur', '1080359', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(7, 'Puskesmas Miran', 'P8107010202', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(8, 'Puskesmas Waru', 'P8107042201', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(9, 'Puskesmas Batuasa', 'P8107030202', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(10, 'Puskesmas Kilga', 'P8107020103', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(11, 'Puskesmas Dai', 'P8107010205', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(12, 'Puskesmas Atiahu', 'P8107031201', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(13, 'Puskesmas Air Kasar', 'P8107021201', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(14, 'Puskesmas Tamher Timur', 'P8107011102', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(15, 'Puskesmas Polin', 'P8107031202', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(16, 'Puskesmas Kilmuri', 'P8107022201', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(17, 'Puskesmas Teor', 'P8107012201', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(18, 'Puskesmas Jakarta Baru Kab. Seram Bagian Timur', '1080358', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(19, 'Puskesmas Amarsekaru', 'P8107010101', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(20, 'Puskesmas Bula', 'P8107040101', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(28, 'Puskesmas Afang', 'P8107022202', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(29, 'Puskesmas Pulau Panjang', 'P8107014201', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(30, 'Puskesmas Nama Kab. Seram Bagian Timur', '1080357', 'Puskesmas', 'Kab. Seram Bagian Timur', 'Maluku'),
	(31, 'RS UMUM DAERAH GORAN RIUN', '8107024', 'Rumah Sakit', 'Kab. Seram Bagian Timur', 'Maluku'),
	(32, 'RS Umum Daerah Bula', '8107021', 'Rumah Sakit', 'Kab. Seram Bagian Timur', 'Maluku'),
	(33, 'POLRES SERAM BAGIAN TIMUR', 'KL81050001', 'Klinik', 'Kab. Seram Bagian Timur', 'Maluku'),
	(34, 'Lapas Kelas III Geser', 'L8107020', 'Lapas/Rutan', 'Kab. Seram Bagian Timur', 'Maluku'),
	(35, 'Puskesmas Taniwel', 'P8106040101', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(36, 'Puskesmas Waimital', 'P8106030202', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(37, 'Puskesmas Piru', 'P8106020201', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(38, 'PUSKESMAS KAMARIAN', '1080368', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(39, 'Puskesmas Tahalupu', 'P8106010101', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(40, 'Puskesmas Uwem Pante', 'P8106040202', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(41, 'Puskesmas Luhu', 'P8106020203', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(42, 'Puskesmas Baku Sayang', '1080366', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(43, 'Puskesmas Talaga Kambelo', 'P8106010103', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(44, 'Puskesmas Kairatu Barat', 'P8106030205', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(45, 'Puskesmas Tanah Goyang', 'P8106020204', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(46, 'Puskesmas Buria', '1080367', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(47, 'Puskesmas Waesala', 'P8106010104', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(48, 'Puskesmas Inamosol', 'P8106032201', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(49, 'Puskesmas Kairatu', 'P8106030101', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(50, 'Puskesmas Buano Selatan', 'P8106010202', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(51, 'Puskesmas Latu', '1080369', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(52, 'Puskesmas Elpaputih', 'P8106034201', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(53, 'Puskesmas Tomalehu', 'P8106030103', 'Puskesmas', 'Kab. Seram Bagian Barat', 'Maluku'),
	(55, 'RS Umum Piru', '8106010', 'Rumah Sakit', 'Kab. Seram Bagian Barat', 'Maluku'),
	(56, 'KLINIK POLRES SERAM BAGIAN BARAT', '1280016', 'Klinik', 'Kab. Seram Bagian Barat', 'Maluku'),
	(57, 'LAPAS KELAS II B PIRU', 'L8106020', 'Lapas/Rutan', 'Kab. Seram Bagian Barat', 'Maluku'),
	(73, 'Puskesmas Walang', 'P8103010203', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(74, 'Puskesmas Ameth', 'P8103081101', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(75, 'Puskesmas Perawatan Liang', '1080370', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(76, 'Puskesmas Saparua', 'P8103080201', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(77, 'Puskesmas Pasahari A', 'P8103140102', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(78, 'Puskesmas Letwaru', 'P8103051201', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(79, 'Puskesmas Hitu', 'P8103110101', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(80, 'Puskesmas Tehoru', 'P8103040101', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(81, 'Puskesmas Pelauw', 'P8103090101', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(82, 'Puskesmas Hatu', '1080372', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(83, 'Puskesmas Porto Haria', 'P8103080202', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(84, 'Puskesmas Pasahari B', 'P8103140203', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(85, 'Puskesmas Masohi', 'P8103051202', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(86, 'Puskesmas Hila', 'P8103110103', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(87, 'Puskesmas Tehua', 'P8103040202', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(88, 'Puskesmas Haruku Samet', 'P8103090102', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(89, 'Puskesmas Morokay', 'P8103140204', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(90, 'Puskesmas Sepa', '1080371', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(91, 'Puskesmas Jasirah Tenggara', 'P8103080203', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(92, 'Puskesmas Sahulauw', 'P8103052201', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(93, 'Puskesmas Amahai', 'P8103050101', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(94, 'Puskesmas Suli Maluku Tengah', 'P8103100103', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(95, 'Puskesmas Waer', 'P8103010202', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(96, 'Puskesmas Booi Paperu', 'P8103080205', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(97, 'Puskesmas Pasanea', 'P8103141202', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(98, 'Puskesmas Rumday', 'P8103060202', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(99, 'Puskesmas Wahai', 'P8103140101', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(100, 'Puskesmas Tamilouw', 'P8103050202', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(101, 'Puskesmas Tulehu', 'P8103100201', 'Puskesmas', 'Kab. Maluku Tengah', 'Maluku'),
	(102, 'RS Umum Saparua', '8103016', 'Rumah Sakit', 'Kab. Maluku Tengah', 'Maluku'),
	(103, 'RS Umum Masohi', '8103042', 'Rumah Sakit', 'Kab. Maluku Tengah', 'Maluku'),
	(104, 'RS Umum Tulehu', '8103103', 'Rumah Sakit', 'Kab. Maluku Tengah', 'Maluku'),
	(105, 'RS Umum Daerah Dr. H Ishak Umarela', '8103053', 'Rumah Sakit', 'Kab. Maluku Tengah', 'Maluku'),
	(106, 'KLINIK PPK-1 YONIF 731/KABARESI', '1280002', 'Klinik', 'Kab. Maluku Tengah', 'Maluku'),
	(107, 'FKTP RINDAM XVI/PTM', '1280003', 'Klinik', 'Kab. Maluku Tengah', 'Maluku'),
	(108, 'POLRES MALUKU TENGAH', '1280008', 'Klinik', 'Kab. Maluku Tengah', 'Maluku'),
	(109, 'KLINIK UKHUWAH MASOHI', '1280004', 'Klinik', 'Kab. Maluku Tengah', 'Maluku'),
	(110, 'Rutan Klas IIB Masohi', 'L8103051', 'Lapas/Rutan', 'Kab. Maluku Tengah', 'Maluku'),
	(111, 'Lapas Kelas III Wahai', 'L8103140', 'Lapas/Rutan', 'Kab. Maluku Tengah', 'Maluku'),
	(112, 'LAPAS KELAS III BANDANAIRA', 'L8103010', 'Lapas/Rutan', 'Kab. Maluku Tengah', 'Maluku'),
	(113, 'LAPAS KELAS III SAPARUA', 'L8103080', 'Lapas/Rutan', 'Kab. Maluku Tengah', 'Maluku'),
	(114, 'Puskesmas Sagea', 'P8202032201', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(115, 'PUSKESMAS GEMIA', '82020200012', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(116, 'Puskesmas Damuli', 'P8202043202', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(117, 'Puskesmas Messa', 'P8202032202', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(118, 'Puskesmas Banemo', 'P8202044201', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(119, 'Puskesmas Lelilef', 'P8202033201', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(120, 'Puskesmas Weda', 'P8202030102', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(121, 'Puskesmas Gebe', 'P8202041101', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(122, 'Puskesmas Kobe', 'P8202030201', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(123, 'Puskesmas Patani', 'P8202042101', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(124, 'Puskesmas Wairoro', 'P8202031201', 'Puskesmas', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(125, 'RS Umum Daerah Weda', '8205021', 'Rumah Sakit', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(126, 'KLINIK POLRES HALMAHERA TENGAH', '1280073', 'Klinik', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(127, 'Wedabay Medical Center', '82020300002', 'Klinik', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(128, 'Rutan Kelas IIB Weda', 'L8202030', 'Lapas/Rutan', 'Kab. Halmahera Tengah', 'Maluku Utara'),
	(130, 'Puskesmas Waturu', 'P8101053101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(131, 'Puskesmas Namtabung', 'P8101043102', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(132, 'Puskesmas Tutukembong', 'P8101053202', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(133, 'Puskesmas Linggat', 'P8101043203', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(134, 'Puskesmas Saumlaki', 'P8101040101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(135, 'Puskesmas Alusi Kelaan', 'P8101054201', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(136, 'Puskesmas Larat Kab. Maluku Tenggara Barat', 'P8101050101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(137, 'Puskesmas Lorulun', 'P8101041101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(138, 'Puskesmas Adodo Molu', 'P8101055201', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(139, 'Puskesmas Romean', 'P8101051101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(140, 'Puskesmas Seira', 'P8101042101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(141, 'Puskesmas Wunlah', 'P8101052101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(142, 'Puskesmas Adaut', 'P8101043101', 'Puskesmas', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(143, 'RS Fatima Saumlaki', '8101041', 'Rumah Sakit', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(144, 'RS Bergerak Kab. Maluku Tenggara Barat', '8101052', 'Rumah Sakit', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(145, 'RS Umum Daerah Dr. P. P. Magretti Saumlaki', '8101063', 'Rumah Sakit', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(146, 'RS Umum Daerah dr. D. Anatototi', '8101064', 'Rumah Sakit', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(147, 'RS Hati Kudus Langgur', '8101026', 'Rumah Sakit', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(148, 'BP LANAL SAUMLAKI', 'KL81030002', 'Klinik', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(149, 'TONKES YONIF 734/SNS', 'KL81030003', 'Klinik', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(150, 'SIKES SATRAD 245 SAUMLAKI', 'KL81030004', 'Klinik', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(151, 'Lapas Kelas III Saumlaki', 'L8101040', 'Lapas/Rutan', 'Kab. Maluku Tenggara Barat', 'Maluku'),
	(152, 'Puskesmas Pulau Burung', 'P1403123201', 'Puskesmas', 'Kab. Indragiri Hilir', 'Riau'),
	(153, 'Puskesmas Muara Emburung', 'P1603070202', 'Puskesmas', 'Kab. Muara Enim', 'Sumatera Selatan'),
	(154, 'Puskesmas Buru', 'P2101031201', 'Puskesmas', 'Kab. Karimun', 'Kepulauan Riau'),
	(155, 'KLINIK KAILA MEDIKA CIBURUY', 'KL32070003', 'Klinik', 'Kab. Ciamis', 'Jawa Barat'),
	(156, 'Puskesmas Mamburungan', 'P6571010102', 'Puskesmas', 'Kota Tarakan', 'Kalimantan Utara'),
	(157, 'Puskesmas Waelo', 'P8104021202', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(158, 'Puskesmas Lolongguba', 'P8104030203', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(159, 'Puskesmas Waplau', 'P8104022201', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(160, 'Puskesmas Mako', 'P8104020101', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(161, 'PUSKESMAS BARA', '1080374', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(162, 'Puskesmas Kaiely', 'P8104030001', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(163, 'Puskesmas Ilath', 'P8104023101', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(164, 'Puskesmas Namlea', 'P8104020202', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(165, 'Puskesmas Air Buaya', 'P8104030101', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(166, 'Puskesmas Sawa Namlea', 'P8104020203', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(167, 'PUSKESMAS WAGRAHE', '1080373', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(168, 'Puskesmas Wamlana', 'P8104030202', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(169, 'Puskesmas Savana Jaya', 'P8104021201', 'Puskesmas', 'Kab. Buru', 'Maluku'),
	(170, 'RS Umum Namlea', '8103020', 'Rumah Sakit', 'Kab. Buru', 'Maluku'),
	(171, 'POLIKLINIK POLRES PULAU BURU', '1280056', 'Klinik', 'Kab. Buru', 'Maluku'),
	(172, 'LAPAS KELAS III NAMLEA', 'L8104020', 'Lapas/Rutan', 'Kab. Buru', 'Maluku'),
	(173, 'Puskesmas Waimulang', 'P8109020204', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(174, 'Puskesmas Biloro', 'P8109010101', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(175, 'Puskesmas Walbele', 'P8109050205', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(176, 'Puskesmas Wailua', 'P8109050202', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(177, 'Puskesmas Namrole', 'P8109030101', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(178, 'Puskesmas Waipandan', 'P8109010202', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(179, 'Puskesmas Oki Baru', 'P8109030202', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(180, 'Puskesmas Leksula', 'P8109020101', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(181, 'Puskesmas Wamsisi', 'P8109040101', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(182, 'Puskesmas Waikatin', 'P8109020202', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(183, 'Puskesmas Waitawa', 'P8109040202', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(184, 'Puskesmas Ewiri', 'P8109020203', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(185, 'Puskesmas Ulima', 'P8109050201', 'Puskesmas', 'Kab. Buru Selatan', 'Maluku'),
	(186, 'RS Umum Daerah Namrole', '8109005', 'Rumah Sakit', 'Kab. Buru Selatan', 'Maluku'),
	(187, 'RS Pratama Fogi', '8109006', 'Rumah Sakit', 'Kab. Buru Selatan', 'Maluku'),
	(188, 'PUSKESMAS POTOWAIBURU', 'P9412011201', 'Puskesmas', 'Kab. Mimika', 'Papua Tengah'),
	(190, 'Puskesmas Sinar Baru', 'P1901090203', 'Puskesmas', 'Kab. Bangka', 'Kepulauan Bangka Belitung'),
	(191, 'Puskesmas Pangkalan Baru', 'P1904020201', 'Puskesmas', 'Kab. Bangka Tengah', 'Kepulauan Bangka Belitung'),
	(192, 'KLINIK MITRA SEHAT PANGKALAN BARU', '1210161', 'Klinik', 'Kab. Bangka Tengah', 'Kepulauan Bangka Belitung'),
	(193, 'KLINIK KARUNIA', '1210246', 'Klinik', 'Kab. Belitung', 'Kepulauan Bangka Belitung'),
	(194, 'Puskesmas Tiban Baru', 'P2171060202', 'Puskesmas', 'Kota Batam', 'Kepulauan Riau'),
	(195, 'KLINIK UTAMA KIMIA FARMA SAGULUNG BARU', '1211497', 'Klinik', 'Kota Batam', 'Kepulauan Riau'),
	(196, 'Puskesmas Mekar Baru Tanjung Pinang', 'P2172010202', 'Puskesmas', 'Kota Tanjung Pinang', 'Kepulauan Riau'),
	(197, 'Puskesmas Barugai', 'P7301042101', 'Puskesmas', 'Kab. Kepulauan Selayar', 'Sulawesi Selatan'),
	(198, 'Puskesmas Bontoharu', '1071378', 'Puskesmas', 'Kab. Kepulauan Selayar', 'Sulawesi Selatan'),
	(199, 'Puskesmas Lorang', 'P8105020205', 'Puskesmas', 'Kab. Kepulauan Aru', 'Maluku'),
	(216, 'Puskesmas Sei Tualang Raso', 'P1272040201', 'Puskesmas', 'Kota Tanjung Balai', 'Sumatera Utara'),
	(217, 'Puskesmas Tualang', 'P1405022202', 'Puskesmas', 'Kab. Siak', 'Riau'),
	(218, 'RSUD TIPE D TUALANG', '1405017', 'Rumah Sakit', 'Kab. Siak', 'Riau'),
	(219, 'Puskesmas Tualan Hulu', 'P6202201007', 'Puskesmas', 'Kab. Kotawaringin Timur', 'Kalimantan Tengah'),
	(220, 'TANTYA SUDHIRAJATI POLRES TUAL', 'KL81720001', 'Klinik', 'Kota Ambon', 'Maluku'),
	(221, 'Puskesmas Tubyalkur', 'P8172010101', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(222, 'Puskesmas Ngadi', 'P8172030206', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(223, 'Puskesmas Tayando Ohoiel', 'P8172020203', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(224, 'Puskesmas Mangur', 'P8172010202', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(225, 'Puskesmas Tual', 'P8172040201', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(226, 'Puskesmas Ohoitahit', 'P8172030202', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(227, 'Puskesmas Kaimear', 'P8172010203', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(228, 'Puskesmas Un', 'P8172040202', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(229, 'Puskesmas Fiditan', 'P8172030203', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(230, 'Puskesmas Warkar', 'P8172011201', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(231, 'Puskesmas Taar', 'P8172040203', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(232, 'Puskesmas Dullah Laut', 'P8172030204', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(233, 'Puskesmas Tayando', 'P8172020101', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(234, 'Puskesmas Tamedan', 'P8172030205', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(235, 'Puskesmas Tam Ngurhir', 'P8172020202', 'Puskesmas', 'Kota Tual', 'Maluku'),
	(236, 'RS Umum Daerah Maren Kota Tual', '8172002', 'Rumah Sakit', 'Kota Tual', 'Maluku'),
	(237, 'POLIKLINIK POLRES TUAL', '1280010', 'Klinik', 'Kota Tual', 'Maluku'),
	(238, 'BP LANAL TUAL', '1280009', 'Klinik', 'Kota Tual', 'Maluku'),
	(239, 'UPTD LABKESDA KOTA TUAL', '81720700001', 'Laboratorium', 'Kota Tual', 'Maluku');

-- Dumping structure for table mental_health_app.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pemeriksaan_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `jawaban` text,
  `tanggal` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mental_health_app.feedback: ~0 rows (approximately)

-- Dumping structure for table mental_health_app.pasien
CREATE TABLE IF NOT EXISTS `pasien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_lengkap` varchar(100) NOT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `no_rm` varchar(20) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `alamat` text,
  `no_hp` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `no_hp_pengantar` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nik` (`nik`),
  UNIQUE KEY `no_rm` (`no_rm`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mental_health_app.pasien: ~0 rows (approximately)
REPLACE INTO `pasien` (`id`, `nama_lengkap`, `nik`, `no_rm`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `no_hp`, `created_at`, `updated_at`, `no_hp_pengantar`) VALUES
	(3, 'jefry', '12345678910', 'RM25062242', '2010-06-05', 'L', 'AKUT', NULL, '2025-06-14 04:49:42', '2025-06-14 04:49:42', '123456789012');

-- Dumping structure for table mental_health_app.pemeriksaan
CREATE TABLE IF NOT EXISTS `pemeriksaan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pasien_id` int DEFAULT NULL,
  `diagnosa` text,
  `anamnesis` text,
  `faskes_asal` varchar(100) DEFAULT NULL,
  `tujuan_konsul` varchar(100) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `status` varchar(20) DEFAULT 'menunggu',
  `jawaban_konsul` text,
  PRIMARY KEY (`id`),
  KEY `pasien_id` (`pasien_id`),
  CONSTRAINT `pemeriksaan_ibfk_1` FOREIGN KEY (`pasien_id`) REFERENCES `pasien` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mental_health_app.pemeriksaan: ~1 rows (approximately)
REPLACE INTO `pemeriksaan` (`id`, `pasien_id`, `diagnosa`, `anamnesis`, `faskes_asal`, `tujuan_konsul`, `tanggal`, `status`, `jawaban_konsul`) VALUES
	(3, 3, 'hampir gila', 'sering bicara sendiri', 'Seram Bagian Timur', 'Psikolog', '2025-06-14', 'batal', NULL);

-- Dumping structure for table mental_health_app.pengguna
CREATE TABLE IF NOT EXISTS `pengguna` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nip` varchar(50) DEFAULT NULL,
  `gelar_depan` varchar(50) DEFAULT NULL,
  `nama_depan` varchar(100) DEFAULT NULL,
  `gelar_belakang` varchar(50) DEFAULT NULL,
  `nama_lengkap` varchar(150) DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `alamat_lengkap` text,
  `agama` varchar(50) DEFAULT NULL,
  `jenis_profesi` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `jenis_kelamin` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mental_health_app.pengguna: ~4 rows (approximately)
REPLACE INTO `pengguna` (`id`, `nip`, `gelar_depan`, `nama_depan`, `gelar_belakang`, `nama_lengkap`, `tempat_lahir`, `tanggal_lahir`, `alamat_lengkap`, `agama`, `jenis_profesi`, `status`, `jenis_kelamin`) VALUES
	(1, '197709232010012000', 'dr', 'Sherly Yakobus', 'Sp.KJ', 'dr Sherly Yakobus Sp.KJ', 'Jakarta', '1977-09-22', 'Jl. dr. Wem Tehupeiory Hutumury', 'Kristen', 'Dokter', 'Aktif', 'P'),
	(2, '199506052019032018', '', 'Lenni Marisa Talaohu A.Md', '', 'Lenni Marisa Talaohu A.Md', 'Pelauw', '1995-06-05', 'Tulehu', 'Kristen', 'Rekam Medis', 'Aktif', 'P'),
	(4, '09876543210', '', 'Jefry', '', 'Jefry', 'Ambon', '1995-05-31', '', 'Kristen Protestan', 'IT Support', 'Aktif', 'L'),
	(5, '12345678910', '', 'anas', '', 'anas', '', NULL, 'RSKD', 'Islam', 'Rekam Medis', 'Aktif', 'L');

-- Dumping structure for table mental_health_app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `pengguna_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `groupAkses` text,
  `modulAkses` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `fk_users_pengguna` (`pengguna_id`),
  CONSTRAINT `fk_users_pengguna` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mental_health_app.users: ~5 rows (approximately)
REPLACE INTO `users` (`id`, `username`, `password`, `role`, `is_active`, `pengguna_id`, `created_at`, `groupAkses`, `modulAkses`) VALUES
	(2, 'klot', '$2b$10$xApD2AyNrWz8xtlBflW.3OvlgbUqPJ1jk.c9ozMh.ayXjKMGOMm6S', 'Petugas Input', 1, NULL, '2025-06-13 07:00:12', NULL, NULL),
	(3, 'root', '$2b$10$EbMuv875Py/iRb/eBD753eYagQ06KIUD4XDhNAlGemq0ETcCcj1iK', 'superadmin', 1, 4, '2025-06-13 08:44:34', '["Admin"]', '["Menu","Ubah Password","Input Pasien","Kunjungan Pasien","History Pasien","Feedback Konsul"]'),
	(4, 'lenni', '$2b$10$kOa5rfWK5MGfEY2KMTJV3u5f825AxQhZvSvEMFdJ0lldQG7HrD7S.', 'Perawat', 1, 2, '2025-06-13 09:25:44', '["Petugas Input"]', '["Input Pasien","Ubah Password","History Pasien"]'),
	(6, 'sherly', '$2b$10$tXpcUSc0Bc/BxCXj3ekud.mrDHAwpX9CYs85upEAWVqYYX/Be5eU.', 'Dokter', 1, 1, '2025-06-13 09:26:39', '["Psikolog"]', '["Ubah Password","Kunjungan Pasien","History Pasien","Feedback Konsul"]'),
	(7, 'anas', '$2b$10$G4OZ9fWRsdN/kLeSe9HE7.vAa/A8njkeWZ8H3BG1o8FK.4wle6vGm', 'Petugas Input', 1, 5, '2025-06-13 09:28:24', '["Perawat Jiwa"]', '["Ubah Password","Kunjungan Pasien","History Pasien","Feedback Konsul"]');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
