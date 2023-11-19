import { Max, validateOrReject } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { BitmaskUniqueValue } from "./helpers/BitmaskValidator";

const EXP_2_TO_31 = Math.pow(2, 31);

@Entity()
export class Permissions extends BaseEntity {
  @PrimaryColumn({ unique: true })
  @Max(EXP_2_TO_31)
  @BitmaskUniqueValue()
  bit: number;

  @Column()
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async validate() {
    await validateOrReject(this);
  }
}
