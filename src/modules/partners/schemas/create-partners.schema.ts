import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose ,{ HydratedDocument, Types } from "mongoose";

export type PartnersDocument = HydratedDocument<Partners>

@Schema({versionKey :false})
export class Partners {
    @Prop({ type: String, required: true })
    image_url: string;
}
export const PartnerSchema = SchemaFactory.createForClass(Partners);
