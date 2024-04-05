import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose ,{ HydratedDocument, Types } from "mongoose";
import { Translate } from "../../translate";

export type ServiceDocument = HydratedDocument<Service>

@Schema({versionKey :false})
export class Service {
    @Prop({type:Types.UUID, ref: "Translate", required: true })
    name: Translate[]

    @Prop({type:Types.UUID, ref: "Translate", required: true })
    description: Translate[]
}

export const ServiceSchema = SchemaFactory.createForClass(Service);