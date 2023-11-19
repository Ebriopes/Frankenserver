import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entity/User";

export class CreateUsers1696539182245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = new User();
    admin.username = "admin";
    admin.nickName = "GOD";
    admin.firstName = "Tester";
    admin.email = "tester@test.job";
    admin.permission = 15;
    admin.savePassword("localPass23%");
    await admin.save();

    const user = new User();
    user.username = "user";
    user.nickName = "user";
    user.firstName = "Normal";
    user.email = "normal@test.job";
    user.permission = 1;
    user.savePassword("Normal1234");
    await user.save();

    const manager = new User();
    manager.username = "manager";
    manager.nickName = "The manager";
    manager.firstName = "Mana";
    manager.lastName = "Ger";
    manager.email = "managerr@test.job";
    manager.permission = 3;
    manager.savePassword("localPass23%");
    await manager.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const admin = await User.findOneBy({ username: "admin" });

    await admin?.remove();
    // await queryRunner.manager.remove(admin);
    // queryRunner.clearTable('user')
    // queryRunner.dropTable("user");
  }
}
