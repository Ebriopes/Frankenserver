import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { compareSync, hashSync } from "bcryptjs";
import { Length } from "class-validator";
import { HASH_SALT } from "../config";

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

  @Column({ nullable: true })
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return compareSync(unencryptedPassword, this.password);
  }

  hashPassword() {
    this.password = hashSync(this.password, HASH_SALT);
  }

  savePassword(password: string) {
    this.password = hashSync(password, HASH_SALT);
  }
}
