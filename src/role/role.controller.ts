import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { RoleCreateDto } from './models/role-create.dto';
import { Role } from './models/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  @HasPermission('roles')
  async all() {
    return this.roleService.all();
  }

  @Post()
  @HasPermission('roles')
  async create(
    @Body() body: RoleCreateDto,
    @Body('permissions') ids: number[],
  ): Promise<Role> {
    return this.roleService.create({
      name: body.name,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @Get(':id')
  @HasPermission('roles')
  async get(@Param('id') id: number) {
    return this.roleService.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') ids: number[],
  ) {
    await this.roleService.update(id, {
      name,
    });
    const role = await this.roleService.findOne({ where: { id } });

    return this.roleService.create({
      ...role,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  @HasPermission('roles')
  async delete(@Param('id') id: number) {
    this.roleService.delete(id);
    return {
      message: 'Role deleted successfully',
    };
  }
}
