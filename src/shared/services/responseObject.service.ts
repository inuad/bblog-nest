import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class ResponseObjClass {
	serviceName: string = "";
	status: boolean = false;
	statusCode: number = 0;
	message: string = "";
	response: any = null;

	setResponse(serviceName:string, statusCode:number, message:(string|null), status:boolean, response?: object | null){
		if(message === null){
			message = "";
		}
		this.serviceName = serviceName;
		this.status = status;
		this.statusCode = statusCode;
		this.message = message;
		this.response = response ?? null;
	}

	setCustomFailureResponse(serviceName:string, statusCode:number, message?:string){
		if(message === undefined){
			switch(statusCode){
				case 500:
					message = "Internal Server Error";
				case 404:
					message = "Not Found";
				case 400:
					message = "Internal Server Error";
				default:
					message = ""
			}
		}

		this.serviceName = serviceName;
		this.status = false;
		this.statusCode = statusCode;
		this.message = message;
		this.response = null
	}

}