import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { UserRoles } from "./UserRoles";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ nullable: true })
  platform: string;

  @Column()
  permission: number;

  @OneToMany(() => UserRoles, (userRoles) => userRoles.role, { cascade: true })
  userRoles: Relation<UserRoles[]>;
}
