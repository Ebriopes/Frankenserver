import { MigrationInterface, QueryRunner } from "typeorm";
import { Roles, User, UserRoles } from "../entity";

export class CreateRoles1700349987985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = (await User.findOneBy({ username: "admin" }))!;
    const user = (await User.findOneBy({ username: "user" }))!;
    const manager = (await User.findOneBy({ username: "manager" }))!;

    const roleUser = new Roles();
    roleUser.name = "USER";
    roleUser.permission = 1;

    const roleManager = new Roles();
    roleManager.name = "MANAGER";
    roleManager.permission = 3;

    const roleAdmin = new Roles();
    roleAdmin.name = "ADMIN";
    roleAdmin.permission = 15;

    await Promise.all([roleUser.save(), roleManager.save(), roleAdmin.save()]);

    const adminWithRoles = new UserRoles();
    adminWithRoles.user = admin;
    adminWithRoles.role = roleAdmin;

    const managerWithRoles = new UserRoles();
    managerWithRoles.user = manager;
    managerWithRoles.role = roleManager;

    await Promise.all([adminWithRoles.save(), managerWithRoles.save()]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roles = await Roles.find();
    const userRoles = await UserRoles.find();

    await Promise.all(userRoles.map((userRole) => userRole.remove()));
    await Promise.all(roles.map((role) => role.remove()));
  }
}
