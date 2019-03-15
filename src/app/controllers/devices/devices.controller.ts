import { Controller, Get, Param, Post, Req } from '@nestjs/common';

import { DevicesService } from 'app/services/devices/devices.service';

@Controller('devices')
export class DevicesController {

  constructor(
    private readonly devices: DevicesService,
  ) { }

  @Get(':user_id')
  findByUser(@Param('user_id') user_id): Promise<any[]> {
    return this.devices.findByUser(user_id);
  }

  @Post(':user_id')
  create(@Param('user_id') user_id, @Req() req) {
    return this.devices.create(user_id, req.body);
  }
}
