export const failFn = async (fn: () => unknown, err: string) => {
	try {
		await fn();
	} catch (error) {
		expect(error).toEqual(new Error(err));
	}
};
