import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUsers, GetUsers, UpdateUsers } from './dto/users.dto';
import { CreateRoles, GetRoles, UpdateRoles } from './dto/roles.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ) {}

  @Get('getUsers')
  getUsers(@Query() params: GetUsers) {
    return this.adminService.getUsers(params);
  }

  @Post('createUsers')
  createUsers(@Body() params: CreateUsers) {
    return this.adminService.createUsers(params);
  }

  @Patch(':id/updateUsers')
  updateUsers(@Param() user, @Body() params: UpdateUsers) {
    return this.adminService.updateUsers(user.id, params);
  }



  @Get('getRoles')
  getRoles(@Query() params: GetRoles) {
    return this.adminService.getRoles(params);
  }

  @Post('createRoles')
  createRoles(@Body() params: CreateRoles) {
    return this.adminService.createRoles(params);
  }

  @Patch(':id/updateRoles')
  updateRoles(@Param() role, @Body() params: UpdateRoles) {
    return this.adminService.updateRoles(role.id, params);
  }

}
