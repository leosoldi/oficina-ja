-- CreateTable
CREATE TABLE `Veiculo` (
    `id` VARCHAR(191) NOT NULL,
    `motoristaId` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `quilometragem` INTEGER NOT NULL,
    `ultimoServico` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_motoristaId_fkey` FOREIGN KEY (`motoristaId`) REFERENCES `Motorista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
