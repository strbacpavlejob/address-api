import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { Address } from './schemas/address.schema';
import { AddressService } from './address.service';
import { ApiResponse } from 'src/misc/api.response';
import { Response } from 'express';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get(':id')
  async getAddress(@Param('id') id: string, @Res() res: Response) {
    return this.addressService.getAddressById(id, res);
  }
  @Get()
  async getAddresses(): Promise<Address[]> {
    return this.addressService.getAddresses();
  }

  @Post()
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }
  @Patch(':id')
  async updateAddress(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Res() res: Response,
  ) {
    return this.addressService.updateAddress(id, updateAddressDto, res);
  }
  @Delete(':id')
  async deleteAddress(@Param('id') id: string, @Res() res: Response) {
    return this.addressService.deleteAddress(id, res);
  }
}
