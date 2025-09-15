-- AlterTable
ALTER TABLE `ServicoOferecido` ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `categoria` VARCHAR(191) NULL,
    ADD COLUMN `descricao` VARCHAR(191) NULL,
    ADD COLUMN `duracao` VARCHAR(191) NULL,
    ADD COLUMN `preco` DOUBLE NULL;
