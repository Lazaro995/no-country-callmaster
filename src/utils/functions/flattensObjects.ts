export const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
	return Object.keys(obj).reduce((acc, key) => {
		const value = obj[key];
		// Si existe un prefijo, se concatena con un punto
		const prefixedKey = prefix ? `${prefix}.${key}` : key;

		// Si el valor es un objeto y no es un array (o null), lo aplana
		if (value !== null && typeof value === "object" && !Array.isArray(value)) {
			Object.assign(acc, flattenObject(value, prefixedKey));
		} else {
			acc[prefixedKey] = value;
		}
		return acc;
	}, {} as Record<string, any>);
};
