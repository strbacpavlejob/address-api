import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Address } from './schemas/address.schema';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async findOne(addressFilterQuery: FilterQuery<Address>): Promise<Address> {
    return this.addressModel.findOne(addressFilterQuery);
  }

  async find(addresssFilterQuery: FilterQuery<Address>): Promise<Address[]> {
    return this.addressModel.find(addresssFilterQuery);
  }

  async create(address: Address): Promise<Address> {
    const newAddress = new this.addressModel(address);
    return newAddress.save();
  }

  async findOneAndUpdate(
    addressFilterQuery: FilterQuery<Address>,
    address: Partial<Address>,
  ): Promise<Address> {
    return this.addressModel.findOneAndUpdate(addressFilterQuery, address, {
      new: true,
    });
  }

  async findOneAndDelete(
    addressFilterQuery: FilterQuery<Address>,
  ): Promise<Address> {
    return this.addressModel.remove(addressFilterQuery);
  }
}
