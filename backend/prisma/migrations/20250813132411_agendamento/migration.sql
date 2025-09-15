-- CreateTable
CREATE TABLE `OpeningRule` (
    `id` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,
    `weekday` INTEGER NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `breakStart` VARCHAR(191) NULL,
    `breakEnd` VARCHAR(191) NULL,
    `slotSizeMin` INTEGER NOT NULL DEFAULT 30,

    INDEX `OpeningRule_oficinaId_weekday_idx`(`oficinaId`, `weekday`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exception` (
    `id` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NULL,
    `endTime` VARCHAR(191) NULL,
    `reason` VARCHAR(191) NULL,

    INDEX `Exception_oficinaId_date_idx`(`oficinaId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OccupiedBlock` (
    `id` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,
    `start` DATETIME(3) NOT NULL,

    INDEX `OccupiedBlock_oficinaId_start_idx`(`oficinaId`, `start`),
    UNIQUE INDEX `OccupiedBlock_oficinaId_start_key`(`oficinaId`, `start`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `oficinaId` VARCHAR(191) NOT NULL,
    `motoristaId` VARCHAR(191) NULL,
    `veiculoId` VARCHAR(191) NULL,
    `servicoId` INTEGER NULL,
    `customer` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'CONFIRMED',

    INDEX `Booking_oficinaId_start_idx`(`oficinaId`, `start`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OpeningRule` ADD CONSTRAINT `OpeningRule_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exception` ADD CONSTRAINT `Exception_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OccupiedBlock` ADD CONSTRAINT `OccupiedBlock_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_oficinaId_fkey` FOREIGN KEY (`oficinaId`) REFERENCES `Oficina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_motoristaId_fkey` FOREIGN KEY (`motoristaId`) REFERENCES `Motorista`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `Veiculo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_servicoId_fkey` FOREIGN KEY (`servicoId`) REFERENCES `ServicoOferecido`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
