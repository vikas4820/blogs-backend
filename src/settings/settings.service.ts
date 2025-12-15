import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/components/user/roles.entity";
import { Users } from "src/components/user/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async onModuleInit() {
    return await this.seedRolesAndAdmin();
  }

  async seedRolesAndAdmin(): Promise<any> {
    let adminRole = await this.rolesRepository.findOne({
      where: { name: 'admin' },
    });
    let userRole = await this.rolesRepository.findOne({
      where: { name: 'user' },
    });

    // Check if adminRole is not found, create if necessary
    if (!adminRole) {
      adminRole = this.rolesRepository.create({ name: 'admin' });
      await this.rolesRepository.save(adminRole);
      console.log('Admin Role seeded');
    }

    // Check if userRole is not found, create if necessary
    if (!userRole) {
      userRole = this.rolesRepository.create({ name: 'user' });
      await this.rolesRepository.save(userRole);
      console.log('User Role seeded');
    }

    // Seed default admin user
    const defaultAdmin = await this.usersRepository.findOne({
      where: { username: 'admin' },
    });
    let adminUser = defaultAdmin;
    if (!defaultAdmin) {
      const user = new Users();
      user.username = 'admin';
      user.email = 'admin@example.com';
      user.role = adminRole;
      user.password = 'admin@example.com';
      adminUser = await this.usersRepository.save(user);
      console.log('Admin User seeded');
    }

    // Get all roles
    const allRoles = await this.rolesRepository.find();

    // Return roles and created user
    return {
      roles: allRoles,  // Return all roles
      user: adminUser,  // Return the created or existing admin user
    };
  }
}