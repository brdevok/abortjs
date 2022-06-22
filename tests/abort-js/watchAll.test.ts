import AbortJS, { AbortCollection } from '../../src/index';
import { pikachu, caterpie } from '../api';
import axios from 'axios';
import { errors } from '../../src/errors/errors';
import { failFn } from '../utils/fail';
import { Pokemon } from '../types';

const getPikachu = async (signal: AbortSignal) => (await axios.get<Pokemon>(pikachu, { signal })).data;
const getCaterpie = async (signal: AbortSignal) => (await axios.get<Pokemon>(caterpie, { signal })).data;

const _pikachu: Pokemon = { 
	id: 25, 
	name: 'pikachu', 
	weight: 60,
};

const _caterpie: Pokemon = { 
	id: 10, 
	name: 'caterpie', 
	weight: 29,
};

describe('Tests for AbortJS.watchAll() method', () => {

	it('Calling with promises must return an object of promises key-named by collection names.', async () => {
		const names = [ 'pikachu1', 'pikachu2', 'pikachu3', 'pikachu4' ];

		const results = AbortJS.watchAll(names.map(name => [ name, (signal) => getPikachu(signal) ]));

		names.forEach(async (name) => {
			expect(results).toHaveProperty(name);
			expect(await results[name]).toEqual(expect.objectContaining(_pikachu));
		});
	});

	it('Duplicate controller name will override last callback.', async () => {
		const names = [ 'A', 'B', 'C', 'A' ];

		const results = AbortJS.watchAll([
			[ names[0], (signal) => getPikachu(signal) ], // Initialize fetching for pikachu
			[ names[1], (signal) => getPikachu(signal) ],
			[ names[2], (signal) => getPikachu(signal) ],
			[ names[3], (signal) => getCaterpie(signal) ], // Override first with caterpie fetch
		]);

		expect(Object.values(results).length).toBe(3);
		expect(await results[names[0]]).toEqual(expect.objectContaining(_caterpie));
		expect(await results[names[1]]).toEqual(expect.objectContaining(_pikachu));
		expect(await results[names[2]]).toEqual(expect.objectContaining(_pikachu));
	});

	it('Call method with wrong argument types must throw errors.', () => {
		const string: unknown = 'x';
		const number: unknown = 1;
		const boolean: unknown = true;
		const object: unknown = {};
		const fn: unknown = () => true;

		const array1: Array<unknown> = [ [] ];
		const array2: Array<unknown> = [ [ string ] ];
		const array3: Array<unknown> = [ [ string, fn, boolean ] ];

		const array4: Array<unknown> = [ [ boolean, fn ] ];
		const array5: Array<unknown> = [ [ number, fn ] ];
		const array6: Array<unknown> = [ [ string, boolean ] ];
		const array7: Array<unknown> = [ [ string, object ] ];

		expect.assertions(11);

		failFn(() => AbortJS.watchAll(string as AbortCollection), errors.NOT_ARRAY(string));
		failFn(() => AbortJS.watchAll(number as AbortCollection), errors.NOT_ARRAY(number));
		failFn(() => AbortJS.watchAll(boolean as AbortCollection), errors.NOT_ARRAY(boolean));
		failFn(() => AbortJS.watchAll(object as AbortCollection), errors.NOT_ARRAY(object));

		failFn(() => AbortJS.watchAll(array1 as AbortCollection), errors.WRONG_LENGTH(array1, 2));
		failFn(() => AbortJS.watchAll(array2 as AbortCollection), errors.WRONG_LENGTH(array2, 2));
		failFn(() => AbortJS.watchAll(array3 as AbortCollection), errors.WRONG_LENGTH(array3, 2));

		failFn(() => AbortJS.watchAll(array4 as AbortCollection), errors.NOT_STRING(boolean));
		failFn(() => AbortJS.watchAll(array5 as AbortCollection), errors.NOT_STRING(number));
		failFn(() => AbortJS.watchAll(array6 as AbortCollection), errors.NOT_FN(boolean));
		failFn(() => AbortJS.watchAll(array7 as AbortCollection), errors.NOT_FN(object));
	});

});
