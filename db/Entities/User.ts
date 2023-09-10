import { Entity, PrimaryGeneratedColumn,CreateDateColumn, Column, OneToOne, ManyToMany, BaseEntity, JoinColumn, JoinTable } from "typeorm";
import { Profile } from './Profile.js';
import { Role } from './Role.js';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  @ManyToMany(() => Role, { cascade: true, eager: true })
  @JoinTable()
  roles: Role[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(0)"
  })
  createdAt: Date;

  async assignRole(role: Role) {
    this.roles = [...this.roles, role];
    await this.save();
  }

  static async findByIdWithRolesAndPermissions(userId: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.id = :userId', { userId })
      .getOne();
  }
}