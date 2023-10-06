import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1696539182245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();

    user.username = "admin";
    user.nickName = "GOD";
    user.firstName = "Tester";
    user.email = "tester@test.job";
    user.role = "ADMIN";

    user.savePassword("localPass23%");

    await queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
