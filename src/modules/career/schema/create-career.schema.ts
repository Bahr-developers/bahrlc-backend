import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose ,{ HydratedDocument, Types } from "mongoose";
import { Translate } from "../../translate";

export type CareerDocument = HydratedDocument<Career>

@Schema({versionKey :false})
export class Career {
    @Prop({type:Types.UUID, ref: "Translate", required: true })
    name: Translate[]

    @Prop({type:Types.UUID, ref: "Translate", required: true })
    description: Translate[]
}

export const CareerSchema = SchemaFactory.createForClass(Career);