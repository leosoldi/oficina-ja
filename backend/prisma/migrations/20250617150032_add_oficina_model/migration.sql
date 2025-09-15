-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `provider` VARCHAR(191) NOT NULL DEFAULT 'manual',
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'oficina',
    MODIFY `googleId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Motorista` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `provider` VARCHAR(191) NOT NULL DEFAULT 'manual',
    `type` VARCHAR(191) NOT NULL DEFAULT 'motorista',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Motorista_email_key`(`email`),
    UNIQUE INDEX `Motorista_googleId_key`(`googleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oficina` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Oficina_email_key`(`email`),
    UNIQUE INDEX `Oficina_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
