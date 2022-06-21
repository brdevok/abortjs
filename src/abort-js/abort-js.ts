import { errors } from '../errors/errors';
import { isFn, isString } from '../utils/validate-types';
import { Controllers, AbortCallback } from './abort-js.types';

export class AbortJS {
	private static controllers: Controllers = {};

	public static async watch<T = unknown>(
		name: string, 
		callback: AbortCallback,
	): Promise<T> {
		if (!isString(name)) {
			throw new Error(errors.NOT_STRING(name));
		}
		if (!isFn(callback)) {
			throw new Error(errors.NOT_FN(callback));
		}

		this.abort(name);
		this.create(name);
		return await callback(this.get(name).signal) as T;
	}

	public static abort(name: string): void {
		if (this.controllers[name]) {
			this.controllers[name].abort();
		}
	}

	public static get(name: string): AbortController {
		return this.controllers[name];
	}

	public static create(name: string): void {
		this.controllers[name] = new AbortController();
	}
}
