import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationDatabase1605753526255 implements MigrationInterface {
    name = 'migrationDatabase1605753526255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `folder-set` (`id` varchar(36) NOT NULL, `folderId` varchar(255) NOT NULL, `setId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `birthday` date NOT NULL, `updatedAt` datetime NOT NULL, `createdAt` datetime NOT NULL, `role` varchar(255) NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `folders` (`id` varchar(36) NOT NULL, `description` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `totalSets` int NOT NULL, `creatorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sets` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `totalCards` int NOT NULL, `editable` varchar(255) NOT NULL, `visible` varchar(255) NOT NULL, `definitionLanguage` varchar(255) NOT NULL, `termLanguage` varchar(255) NOT NULL, `creatorId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cards` (`id` int NOT NULL AUTO_INCREMENT, `orderNumber` int NOT NULL, `term` varchar(255) NOT NULL, `definition` varchar(255) NOT NULL, `setId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `folders` ADD CONSTRAINT `FK_39bfe525acd0ab0ba97282b35e0` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `sets` ADD CONSTRAINT `FK_8bc9d86ce37b8c38a67d96ce35a` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cards` ADD CONSTRAINT `FK_11a155fd4cac8a6ac94fb1d6a2c` FOREIGN KEY (`setId`) REFERENCES `sets`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cards` DROP FOREIGN KEY `FK_11a155fd4cac8a6ac94fb1d6a2c`");
        await queryRunner.query("ALTER TABLE `sets` DROP FOREIGN KEY `FK_8bc9d86ce37b8c38a67d96ce35a`");
        await queryRunner.query("ALTER TABLE `folders` DROP FOREIGN KEY `FK_39bfe525acd0ab0ba97282b35e0`");
        await queryRunner.query("DROP TABLE `cards`");
        await queryRunner.query("DROP TABLE `sets`");
        await queryRunner.query("DROP TABLE `folders`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `folder-set`");
    }

}