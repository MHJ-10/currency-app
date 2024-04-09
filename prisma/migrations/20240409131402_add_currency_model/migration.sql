-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `change` VARCHAR(191) NOT NULL,
    `lowest` VARCHAR(191) NOT NULL,
    `highest` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `status` ENUM('high', 'low', 'fixed') NOT NULL,
    `updateTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
