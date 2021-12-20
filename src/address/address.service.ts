import { HttpException, Injectable } from '@nestjs/common';

import { Address } from './schemas/address.schema';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import * as Validator from 'class-validator';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Response, response } from 'express';
import { ApiResponse } from 'src/misc/api.response';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async getAddressById(_id: string, res: Response) {
    return new Promise((resolve) => {
      this.addressRepository
        .findOne({ _id })
        .then((data) => res.send(data))
        .catch((error) => {
          return res
            .status(404)
            .send(new ApiResponse('error', 404, 'Address not found'));
        });
    });
  }

  async getAddresses(): Promise<Address[]> {
    return this.addressRepository.find({});
  }

  async createAddress(newAddress: CreateAddressDto) {
    return this.addressRepository.create({
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
  }

  async updateAddress(
    _id: string,
    addressUpdates: UpdateAddressDto,
    res: Response,
  ) {
    this.addressRepository
      .findOne({ _id })
      .then((data) => {
        if (data.status === 'not interested' || data.status === 'interested') {
          return res
            .status(403)
            .send(
              new ApiResponse(
                'error',
                403,
                'Status is either not interested or interested',
              ),
            );
        }
      })
      .catch(() => {
        return res
          .status(404)
          .send(new ApiResponse('error', 404, 'Address not found'));
      });

    return new Promise((resolve) => {
      return this.addressRepository
        .findOneAndUpdate({ _id }, { ...addressUpdates, updatedAt: new Date() })
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res
            .status(404)
            .send(new ApiResponse('error', 404, 'Address not found'));
        });
    });
  }

  async deleteAddress(_id: string, res: Response) {
    this.addressRepository
      .findOne({ _id })
      .then()
      .catch(() => {
        return res
          .status(404)
          .send(new ApiResponse('error', 404, 'Address not found'));
      });
    return new Promise((resolve) => {
      this.addressRepository
        .findOneAndDelete({ _id })
        .then(() => res.status(204).send())
        .catch((error) => {
          return res
            .status(409)
            .send(new ApiResponse('error', 409, 'Address not deleted'));
        });
    });
  }
}
