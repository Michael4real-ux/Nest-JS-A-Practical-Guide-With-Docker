import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth/auth.guard';
// import { HasPermission } from './has-permission.decorator';
import { PermissionService } from './permission.service';

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @Get()
  async all() {
    return this.permissionService.all();
  }
}
