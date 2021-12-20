import * as Validator from 'class-validator';
export class UpdateAddressDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  status: 'not at home' | 'not interested' | 'interested';
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsOptional()
  name?: string;
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsEmail()
  @Validator.IsOptional()
  email?: string;
}
