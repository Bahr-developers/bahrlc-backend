import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose ,{ HydratedDocument, Types } from "mongoose";
import { Translate } from "../../translate";

const project_type = ['crm', 'website', 'mobile', 'erp'];

export type ProjectDocument = HydratedDocument<Project>

@Schema({versionKey :false})
export class Project {
    @Prop({type:Types.UUID, ref: "Translate", required: true })
    name: Translate[]

    @Prop({required: true })
    url: string

    @Prop({ type: [String], required: true })
    image_urls: string[];

    @Prop({ enum: project_type, required: true })
    type: string;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);