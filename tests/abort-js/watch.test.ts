import AbortJS, { AbortCallback } from '../../src/index';
import { bulbasaur, pokemon } from '../api';
import axios, { AxiosResponse } from 'axios';
import { errors } from '../../src/errors/errors';
import { failFn } from '../utils/fail';

type Bulbasaur = {
	id: number;
	name: string;
	weight: number;
}

const getBulbasaur = async (signal: AbortSignal) => (await axios.get<Bulbasaur>(bulbasaur, { signal })).data;
const getPokemons = async (signal: AbortSignal) => {
	try {
		return await axios.get(`${pokemon}?limit=10000`, { signal });
	} catch(err) {
		return err;
	}
};

describe('Tests for AbortJS.watch() method', () => {

	it('Calling this method with a pokemon api call must return pokemon data', async () => {
		const result = await AbortJS.watch<Bulbasaur>('get-bulbasaur', (signal) => getBulbasaur(signal));

		expect(result).toEqual(expect.objectContaining({
			id: 1,
			name: 'bulbasaur',
			weight: 69,
		} as Bulbasaur));
	});

	it('Remove, create and get methods must be called once on every watch call', async () => {
		const removeSpy = jest.spyOn(AbortJS, 'remove');
		const createSpy = jest.spyOn(AbortJS, 'create' as never);
		const getSpy = jest.spyOn(AbortJS, 'get');

		await AbortJS.watch('x', () => true);

		expect(removeSpy).toBeCalledTimes(1);
		expect(createSpy).toBeCalledTimes(1);
		expect(getSpy).toBeCalledTimes(1);
	});

	it('Fetch must be aborted on re-call before completion.', async () => {
		const result1 = AbortJS.watch<AxiosResponse>('A', (signal) => getPokemons(signal));
		AbortJS.watch<AxiosResponse>('A', (signal) => getPokemons(signal));

		const result2 = AbortJS.watch<AxiosResponse>('A', (signal) => getPokemons(signal));
		AbortJS.watch<AxiosResponse>('A', (signal) => getPokemons(signal));

		const result3 = AbortJS.watch<AxiosResponse>('A', (signal) => getPokemons(signal));
		AbortJS.watch<AxiosResponse>('A', (signal) => getPokemons(signal));

		const result4 = AbortJS.watch<AxiosResponse>('A', (signal) => getPokemons(signal));

		expect(await result1).toEqual(expect.objectContaining({ message: 'canceled' }));
		expect(await result2).toEqual(expect.objectContaining({ message: 'canceled' }));
		expect(await result3).toEqual(expect.objectContaining({ message: 'canceled' }));
		expect(await result4).toEqual(expect.objectContaining({ status: 200 }));
	});

	it('Calling with wrong argument types must throw errors', () => {
		expect.assertions(7);

		const number: unknown = 1;
		const fn: unknown = () => true;
		const boolean: unknown = true;
		const array: unknown = [];
		const object: unknown = {};
	
		// Passing wrong argument types to 1st arg.
		failFn(() => AbortJS.watch(number as string, async () => true), errors.NOT_STRING(number));
		failFn(() => AbortJS.watch(boolean as string, async () => true), errors.NOT_STRING(boolean));
		failFn(() => AbortJS.watch(array as string, async () => true), errors.NOT_STRING(array));
		failFn(() => AbortJS.watch(fn as string, async () => true), errors.NOT_STRING(fn));
		// Testing 2nd arg.
		failFn(() => AbortJS.watch('x', number as AbortCallback), errors.NOT_FN(number));
		failFn(() => AbortJS.watch('x', boolean as AbortCallback), errors.NOT_FN(boolean));
		failFn(() => AbortJS.watch('x', object as AbortCallback), errors.NOT_FN(object));
	});

});
