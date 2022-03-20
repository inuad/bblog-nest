import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollectionName, T_BlogSchema } from './schemas/blog.schema';

export interface I_BBlogService {
	getBlogList: (title: string | null, lastId: string, limit: number) => Promise<T_ServiceResponseResult>;
	getBlog: (slug: string) => Promise<T_ServiceResponseResult>;
}

type T_ResultSuccess = object | object[] | null
type T_ResultError = Error | unknown
type T_ServiceResponseResult = [T_ResultSuccess, T_ResultError]

@Injectable()
export class BblogService implements I_BBlogService {
	constructor(@InjectModel(CollectionName) private bblogModel: Model<T_BlogSchema>){}

    async getBlogList(title: string|null, lastId: string, limit: number = 10): Promise<T_ServiceResponseResult> {
		try{
			let query = {}
			if(title !== undefined && title !== null){
				query = {
					...query,
					title: new RegExp(title, "g")
				}
			}

			if(lastId !== null){
				query = {
					...query,
					_id: { $lte : lastId }
				}
			}

			const result = await this.bblogModel.find(query, {}, {sort: { "created_at" : -1 }}).limit(limit)
			return [result, null];
		}catch(err){
			return [null, err as Error];
		}
    }

    async getBlog(slug: string): Promise<T_ServiceResponseResult> {
		try{
			let query = {
				slug: slug
			}
			
			const result = await this.bblogModel.findOne(query, {}, {sort: { "created_at" : -1 }})
			return [result, null];
		}catch(err){
			return [null, err];
		}
	}
}
