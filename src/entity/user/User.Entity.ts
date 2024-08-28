import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity("adm_user")
export class AdmUser {
  @PrimaryGeneratedColumn()
  @Generated()
  user_id: number;
  @Column()
  user_email: string;
  @Column()
  user_password: string;
  @Column()
  active_status: string;
  @Column({ nullable: true })
  created_by?: string | null;
  @Column({ nullable: true })
  updated_by?: string | null;
  @Column({ nullable: true })
  created_date?: Date | null;
  @Column({ nullable: true })
  updated_date?: Date | null;
}
