-- DropIndex
DROP INDEX `Task_user_id_fkey` ON `task`;

-- AddForeignKey
ALTER TABLE `task`
ADD CONSTRAINT `Task_user_id_fkey`
FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;