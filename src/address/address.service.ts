import { HttpException, Injectable } from '@nestjs/common';

import { Address } from './schemas/address.schema';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import * as Validator from 'class-validator';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Response, response } from 'express';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAddressById(_id: string, res: Response) {
    return new Promise((resolve) => {
      this.addressRepository
        .findOne({ _id })
        .then((data) => resolve(data))
        .catch((error) => {
          return res.status(404).send();
        });
    });
  }

  async getAddresses(): Promise<Address[]> {
    return this.addressRepository.find({});
  }

  async createAddress(newAddress: CreateAddressDto, res: Response) {
    return Validator.validate(newAddress)
      .then(async () => {
        const addres: Address = await this.addressRepository.create({
          country: newAddress.country,
          city: newAddress.city,
          street: newAddress.street,
          postalcode: newAddress.postalcode,
          number: newAddress.number,
          numberAddition: newAddress.numberAddition,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: null,
          name: null,
          email: null,
        });
        res.send(addres);
      })
      .catch(() => {
        return res.status(422).send();
      });
  }

  async updateAddress(
    _id: string,
    addressUpdates: UpdateAddressDto,
    res: Response,
  ) {
    return new Promise((resolve) => {
      this.addressRepository
        .findOneAndUpdate({ _id }, addressUpdates)
        .then((data) => resolve(data))
        .catch((error) => {
          return res.status(404).send();
        });
    });
  }

  async deleteAddress(_id: string) {
    return this.addressRepository.findOneAndDelete({ _id });
  }
}
