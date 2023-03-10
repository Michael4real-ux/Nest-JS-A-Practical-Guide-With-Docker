import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Get()
  @HasPermission('users') //just a sample, change to your permission
  async all(@Query('page') page = 1) {
    return this.userService.paginate(page, ['role']);
  }

  @Post()
  @HasPermission('users')
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12);

    const { role_id, ...data } = body;

    return this.userService.create({
      ...data,
      password,
      role: { id: role_id },
    });
  }

  @Get(':id')
  @HasPermission('users')
  async get(@Param('id') id: number) {
    return this.userService.findOne({
      where: { id },
      relations: ['role'],
    });
  }
  @Put('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return this.userService.findOne({ where: { id } });
  }

  @Put('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('confirm_password') confirm_password: string,
  ) {
    if (password !== confirm_password) {
      throw new BadRequestException('Password do not match');
    }
    const id = await this.authService.userId(request);
    const hashed = await bcrypt.hash(password, 12);
    await this.userService.update(id, { password: hashed });
    return this.userService.findOne({ where: { id } });
  }

  @Put(':id')
  @HasPermission('users')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ): Promise<User> {
    const { role_id, ...data } = body;
    await this.userService.update(id, {
      ...data,
      role: { id: role_id },
    });
    return this.userService.findOne({ where: { id } });
  }

  @Delete(':id')
  @HasPermission('users')
  async delete(@Param('id') id: number) {
    this.userService.delete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
