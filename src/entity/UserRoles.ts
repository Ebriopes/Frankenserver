import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity()
export class UserRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.roles)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Role, (roles) => roles.userRoles)
  role: Role;
}
