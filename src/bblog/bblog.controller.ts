import { Controller, Get, Logger, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { BblogService } from './bblog.service';
import { ResponseObjClass } from '../shared/services/responseObject.service';

@Controller('')
export class BblogController {
	private readonly logger = new Logger(BblogController.name)

	constructor(
		private readonly bblogService: BblogService,
		private responseObj: ResponseObjClass,

	) {}

	@Get('/content/:slug')
	async getBlog(@Param('slug') slugParam:string, @Req() req:Request, @Res() res:Response): Promise<any> {
		const serviceName = "Get Blog";
		let slug = slugParam ?? null;

		if(slug === null){
			this.responseObj.setCustomFailureResponse(serviceName, 400);
        	return res.status(this.responseObj.statusCode).send(this.responseObj);
		}

		let [result, error] = await this.bblogService.getBlog(slug);
		if(error !== null) {
			this.logger.error(`${serviceName}-${error}`)
			this.responseObj.setCustomFailureResponse(serviceName, 404);
        	return res.status(this.responseObj.statusCode).send(this.responseObj);
		}

		let responseData = {
			data: result
		}

		this.responseObj.setResponse(serviceName, 200, "Success", true, responseData);
        return res.status(this.responseObj.statusCode).send(this.responseObj);
    }
}

