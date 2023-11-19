import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Roles } from "./Roles";

@Entity()
export class UserRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.roles)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  role: Roles;
}
