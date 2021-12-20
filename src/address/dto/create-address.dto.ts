import * as Validator from 'class-validator';
export class CreateAddressDto {
  @Validator.IsISO31661Alpha2()
  @Validator.IsNotEmpty()
  @Validator.IsString()
  country: string;
  @Validator.IsNotEmpty()
  @Validator.IsString()
  city: string;
  @Validator.IsNotEmpty()
  @Validator.IsString()
  street: string;
  @Validator.IsNotEmpty()
  @Validator.Length(5)
  @Validator.IsNumberString()
  postalcode: string;
  @Validator.IsNumber()
  @Validator.Min(0)
  number: number;
  @Validator.IsString()
  numberAddition: string;
}