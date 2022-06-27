import { TypeCheckObjectShape, types } from '../utils/types';

export const eventDataShape: TypeCheckObjectShape = {
	controller: types.string(),
} as const;
