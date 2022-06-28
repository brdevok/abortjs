import Abort from 'abortjs';
import axios from 'axios';
import { bulbasaur } from '../api';

type Bulbasaur = {
	id: number;
	name: string;
	weight: number;
};

const getBulbasaur = async (signal: AbortSignal) =>
	(await axios.get<Bulbasaur>(bulbasaur, { signal })).data;

describe('Tests for AbortJS.watch() method', () => {
	it('Calling this method with a pokemon api call must return pokemon data', async () => {
		const result = await Abort.watch<Bulbasaur>('get-bulbasaur', (signal) =>
			getBulbasaur(signal),
		);

		expect(result).toEqual(
			expect.objectContaining({
				id: 1,
				name: 'bulbasaur',
				weight: 69,
			} as Bulbasaur),
		);
	});
});
