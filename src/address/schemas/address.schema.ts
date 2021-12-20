import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ versionKey: false })
export class Address {
  @Prop({ required: true })
  country: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  street: string;
  @Prop({ required: true })
  postalcode: string;
  @Prop({ required: true })
  number: number;
  @Prop({ required: false, default: '' })
  numberAddition: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  updatedAt: Date;
  @Prop({ required: false, default: null })
  status?: string;
  @Prop({ required: false, default: null })
  name?: string;
  @Prop({ required: false, default: null })
  email?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
