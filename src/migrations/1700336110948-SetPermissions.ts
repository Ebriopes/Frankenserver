import { MigrationInterface, QueryRunner } from "typeorm";
import { Permissions } from "../entity/Permissions";

export class SetPermissions1700336110948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const accessPermission = new Permissions();
    accessPermission.bit = 1;
    accessPermission.name = "access";

    const editPermission = new Permissions();
    editPermission.bit = 2;
    editPermission.name = "edit";

    const deletePermission = new Permissions();
    deletePermission.bit = 4;
    deletePermission.name = "delete";

    const adminPermission = new Permissions();
    adminPermission.bit = 8;
    adminPermission.name = "admin";

    await Promise.all([
      accessPermission.save(),
      editPermission.save(),
      deletePermission.save(),
      adminPermission.save(),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Permissions.delete([1, 2, 4, 8]);
  }
}
