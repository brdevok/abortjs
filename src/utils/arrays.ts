export const lengthOf = (array: Array<unknown>, amount: number): boolean => {
	if (array.length === amount) {
		return true;
	}
	return false;
};
