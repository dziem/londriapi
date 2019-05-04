-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2019 at 11:35 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `londri`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_laundry`
--

CREATE TABLE `detail_laundry` (
  `id_laundry` int(11) NOT NULL,
  `id_tipe` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_laundry`
--

INSERT INTO `detail_laundry` (`id_laundry`, `id_tipe`, `quantity`) VALUES
(45565416, 1, 2),
(45565416, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `laundry`
--

CREATE TABLE `laundry` (
  `id_laundry` int(11) NOT NULL,
  `no_tel` varchar(20) NOT NULL,
  `tanggal_terima` varchar(20) NOT NULL,
  `waktu_terima` varchar(20) NOT NULL,
  `tanggal_ambil` varchar(20) NOT NULL,
  `waktu_ambil` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `total_harga` varchar(20) NOT NULL,
  `nomor_rak` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `laundry`
--

INSERT INTO `laundry` (`id_laundry`, `no_tel`, `tanggal_terima`, `waktu_terima`, `tanggal_ambil`, `waktu_ambil`, `status`, `total_harga`, `nomor_rak`) VALUES
(45565416, '123', '04-05-2019', '16:18:24', '', '', 'Pesanan diterima', '20000', '');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id_member` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(300) NOT NULL,
  `no_tel` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id_member`, `nama`, `alamat`, `no_tel`) VALUES
(2, 'theo', 'grimsby', '123');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `id_pegawai` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `last_login` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`id_pegawai`, `username`, `password`, `nama`, `last_login`) VALUES
(1, 'pleb', 'pleb', 'Mr Pleb', '2019-5-3 16:09:28');

-- --------------------------------------------------------

--
-- Table structure for table `tipe`
--

CREATE TABLE `tipe` (
  `id_tipe` int(11) NOT NULL,
  `nama_tipe` varchar(25) NOT NULL,
  `harga_per_qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tipe`
--

INSERT INTO `tipe` (`id_tipe`, `nama_tipe`, `harga_per_qty`) VALUES
(1, 'Kiloan', 5000),
(2, 'Selimut', 10000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_laundry`
--
ALTER TABLE `detail_laundry`
  ADD KEY `fk_tipe` (`id_tipe`),
  ADD KEY `fk_order` (`id_laundry`);

--
-- Indexes for table `laundry`
--
ALTER TABLE `laundry`
  ADD PRIMARY KEY (`id_laundry`),
  ADD KEY `fk_member` (`no_tel`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id_member`),
  ADD UNIQUE KEY `no_tel` (`no_tel`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id_pegawai`);

--
-- Indexes for table `tipe`
--
ALTER TABLE `tipe`
  ADD PRIMARY KEY (`id_tipe`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pegawai`
--
ALTER TABLE `pegawai`
  MODIFY `id_pegawai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tipe`
--
ALTER TABLE `tipe`
  MODIFY `id_tipe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_laundry`
--
ALTER TABLE `detail_laundry`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`id_laundry`) REFERENCES `laundry` (`id_laundry`),
  ADD CONSTRAINT `fk_tipe` FOREIGN KEY (`id_tipe`) REFERENCES `tipe` (`id_tipe`);

--
-- Constraints for table `laundry`
--
ALTER TABLE `laundry`
  ADD CONSTRAINT `fk_member` FOREIGN KEY (`no_tel`) REFERENCES `member` (`no_tel`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
