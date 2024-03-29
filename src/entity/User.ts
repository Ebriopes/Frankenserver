import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  Relation,
} from "typeorm";
import { compareSync, hashSync } from "bcrypt";
import { Length } from "class-validator";
import { HASH_SALT } from "../config";
import { Permissions } from "./Permissions";
import { UserRoles } from "./UserRoles";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(6, 128)
  password: string;

  @Column()
  nickName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @OneToOne(() => UserRoles, (userRoles) => userRoles.user, { nullable: true })
  roles: Relation<UserRoles>;

  @Column({ nullable: true })
  permission: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return compareSync(unencryptedPassword, this.password);
  }

  async getPermissions(): Promise<{ name: string }[]> {
    const permission = this.roles?.role?.permission;

    return await Permissions.query(
      "SELECT name FROM permissions WHERE permissions.bit & ?",
      [permission]
    );
  }

  savePassword(password: string) {
    this.password = hashSync(password, HASH_SALT);
  }
}
