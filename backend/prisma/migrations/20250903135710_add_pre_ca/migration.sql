/*
  Warnings:

  - You are about to alter the column `status` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.
  - You are about to alter the column `status` on the `Checklist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(6))`.
  - You are about to alter the column `provider` on the `Motorista` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `type` on the `Motorista` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `provider` on the `Oficina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `type` on the `Oficina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - A unique constraint covering the columns `[motoristaId,placa]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_oficinaId_fkey`;

-- DropForeignKey
ALTER TABLE `Certificacao` DROP FOREIGN KEY `Certificacao_oficinaId_fkey`;

-- DropForeignKey
ALTER TABLE `Especialidade` DROP FOREIGN KEY `Especialidade_oficinaId_fkey`;

-- DropForeignKey
ALTER TABLE `Exception` DROP FOREIGN KEY `Exception_oficinaId_fkey`;

-- DropForeignKey
ALTER TABLE `OccupiedBlock` DROP FOREIGN KEY `OccupiedBlock_oficinaId_fkey`;

-- DropForeignKey
ALTER TABLE `OpeningRule` DROP FOREIGN KEY `OpeningRule_oficinaId_fkey`;

-- DropForeignKey
ALTER TABLE `ServicoOferecido` DROP FOREIGN KEY `ServicoOferecido_oficinaId_fkey`;

-- DropForeignKey
ALTER TABLE `Veiculo` DROP FOREIGN KEY `Veiculo_motoristaId_fkey`;

-- DropIndex
DROP INDEX `Certificacao_oficinaId_fkey` ON `Certificacao`;

-- DropIndex
DROP INDEX `Especialidade_oficinaId_fkey` ON `Especialidade`;

-- DropIndex
DROP INDEX `ServicoOferecido_oficinaId_fkey` ON `ServicoOferecido`;

-- DropIndex
DROP INDEX `Veiculo_motoristaId_fkey` ON `Veiculo`;

-- AlterTable
ALTER TABLE `Booking` MODIFY `customer` VARCHAR(191) NULL,
    MODIFY `status` ENUM('CONFIRMED', 'PENDING', 'CANCELED', 'DONE') NOT NULL DEFAULT 'CONFIRMED';

-- AlterTable
ALTER TABLE `Checklist` MODIFY `status` ENUM('OPEN', 'COMPLETED') NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE `Motorista` MODIFY `provider` ENUM('manual', 'google') NOT NULL DEFAULT 'manual',
    MODIFY `type` ENUM('motorista', 'oficina') NOT NULL DEFAULT 'motorista';

-- AlterTable
ALTER TABLE `Oficina` MODIFY `provider` ENUM('manual', 'google') NOT NULL DEFAULT 'manual',
    MODIFY `type` ENUM('motorista', 'oficina') NOT NULL DEFAULT 'oficina',
    MODIFY `latitude` DECIMAL(10, 7) NULL,
    MODIFY `longitude` DECIMAL(10, 7) NULL;

-- CreateTable
CREATE TABLE `PreCadastroMotorista` (
    `id` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `veiculoModelo` VARCHAR(191) NULL,
    `veiculoAno` VARCHAR(191) NULL,
    `veiculoPlaca` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'CANCELED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL DEFAULT (NOW() + INTERVAL 7 DAY),
    `motoristaId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PreCadastroMotorista_token_key`(`token`),
    INDEX `PreCadastroMotorista_oficinaId_status_idx`(`oficinaId`, `status`),
    INDEX `PreCadastroMotorista_email_idx`(`email`),
    INDEX `PreCadastroMotorista_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Veiculo_motoristaId_placa_key` ON `Veiculo`(`motoristaId`, `placa`);

-- AddForeignKey
ALTER TABLE `PreCadastroMotorista` ADD CONSTRAINT `PreCadastroMotorista_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreCadastroMotorista` ADD CONSTRAINT `PreCadastroMotorista_motoristaId_fkey` FOREIGN KEY (`motoristaId`) REFERENCES `Motorista`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServicoOferecido` ADD CONSTRAINT `ServicoOferecido_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Especialidade` ADD CONSTRAINT `Especialidade_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificacao` ADD CONSTRAINT `Certificacao_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_motoristaId_fkey` FOREIGN KEY (`motoristaId`) REFERENCES `Motorista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpeningRule` ADD CONSTRAINT `OpeningRule_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exception` ADD CONSTRAINT `Exception_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OccupiedBlock` ADD CONSTRAINT `OccupiedBlock_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
