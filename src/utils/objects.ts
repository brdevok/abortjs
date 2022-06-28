import { errors } from '../errors/errors';
import { TypeCheckObjectShape } from './types';

export const compareObject = (
	test: object,
	shape: TypeCheckObjectShape,
): boolean => {
	const testKeys = Object.keys(test);
	const shapeKeys = Object.keys(shape);

	testKeys.forEach((key) => {
		if (shape[key] === undefined) {
			throw new Error(errors.WRONG_OBJ_KEY(key, shape));
		}
	});

	shapeKeys.forEach((key) => {
		if (test[key as keyof typeof test] === undefined) {
			throw new Error(errors.NOT_OBJ_KEY(key, shape));
		}
	});

	shapeKeys.forEach((key) => {
		if (!shape[key].val(test[key as keyof typeof test])) {
			throw new Error(
				errors.WRONG_OBJ_VAL(
					test[key as keyof typeof test],
					key,
					shape[key].expected,
				),
			);
		}
	});

	return true;
};
