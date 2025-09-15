/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Oficina` ADD COLUMN `horarioDomingo` VARCHAR(191) NULL,
    ADD COLUMN `horarioSabadoFim` VARCHAR(191) NULL,
    ADD COLUMN `horarioSabadoInicio` VARCHAR(191) NULL,
    ADD COLUMN `horarioSegSexFim` VARCHAR(191) NULL,
    ADD COLUMN `horarioSegSexInicio` VARCHAR(191) NULL,
    ADD COLUMN `whatsapp` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `ServicoOferecido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Especialidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServicoOferecido` ADD CONSTRAINT `ServicoOferecido_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Especialidade` ADD CONSTRAINT `Especialidade_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificacao` ADD CONSTRAINT `Certificacao_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
