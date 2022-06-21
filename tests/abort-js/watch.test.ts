import AbortJS, { AbortCallback } from '../../src/index';
import { bulbasaur } from '../api';
import axios from 'axios';
import { errors } from '../../src/errors/errors';
import { failFn } from '../utils/fail';

type Bulbasaur = {
	id: number;
	name: string;
	weight: number;
}

const getBulbasaur = async (signal: AbortSignal) => (await axios.get<Bulbasaur>(bulbasaur, { signal })).data;

describe('Tests for AbortJS.watch() method', () => {

	it('Calling this method with a pokemon api call must return pokemon data', async () => {
		const result = await AbortJS.watch<Bulbasaur>('get-bulbasaur', async (signal) => getBulbasaur(signal));
		expect(result).toEqual(expect.objectContaining({
			id: 1,
			name: 'bulbasaur',
			weight: 69,
		} as Bulbasaur));
	});

	it('Abort, create and get methods must be called once on every watch call', async () => {
		const abortSpy = jest.spyOn(AbortJS, 'abort');
		const createSpy = jest.spyOn(AbortJS, 'create' as never);
		const getSpy = jest.spyOn(AbortJS, 'get');

		await AbortJS.watch('x', async () => true);

		expect(abortSpy).toBeCalledTimes(1);
		expect(createSpy).toBeCalledTimes(1);
		expect(getSpy).toBeCalledTimes(1);
	});

	it('Calling with wrong argument types must throw errors', async () => {
		expect.assertions(7);

		const number: unknown = 1;
		const fn: unknown = () => true;
		const boolean: unknown = true;
		const array: unknown = [];
		const object: unknown = {};
	
		await Promise.all([
			// Passing wrong argument types to 1st arg.
			failFn(() => AbortJS.watch(number as string, async () => true), errors.NOT_STRING(number)),
			failFn(() => AbortJS.watch(boolean as string, async () => true), errors.NOT_STRING(boolean)),
			failFn(() => AbortJS.watch(array as string, async () => true), errors.NOT_STRING(array)),
			failFn(() => AbortJS.watch(fn as string, async () => true), errors.NOT_STRING(fn)),
			// Testing 2nd arg.
			failFn(() => AbortJS.watch('x', number as AbortCallback), errors.NOT_FN(number)),
			failFn(() => AbortJS.watch('x', boolean as AbortCallback), errors.NOT_FN(boolean)),
			failFn(() => AbortJS.watch('x', object as AbortCallback), errors.NOT_FN(object)),
		]);
	});

});
