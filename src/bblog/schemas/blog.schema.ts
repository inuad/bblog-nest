import { Schema } from 'mongoose';

export type T_BlogSchema = {
	slug: string,
	title: string,
    detail: string,
    image: string,
	created_at?: Date
    created_by?: string,
}

export const CollectionName = 'blogs';
export const BlogSchema = new Schema<T_BlogSchema>({
	slug: { type: String, required: true },
	title: { type: String, required: true },
	detail: { type: String, required: true },
	image: { type: String, required: false },
	created_at: { type: Date, required: true, default: new Date() },
	created_by: { type: String, required: false, default: "iNuad"},
}, {
	versionKey: false
})