import { Data } from "@/props/tableProps";
import { flattenObject } from "./flattensObjects";

export const generateTableColumns = (data: Data, sortable: string[]) => {
	if (!data.length) return [];
	const keys = Object.keys(data[0]);
	return keys.map((key) => ({
		name: key.toUpperCase(),
		uid: key,
		sortable: sortable.includes(key),
	}));
};

export const generateColumns = (data: Data) => {
	 const objectToMap = Array.isArray(data)
			? data.length
				? data[0]
				: {}
			: data;

		// Aplana el objeto
		const flattened = flattenObject(objectToMap);

		// Obtiene las claves del objeto aplanado
		const keys = Object.keys(flattened);

		// Mapea las claves a columnas
		return keys.map((key) => ({
			name: key.toUpperCase(),
			uid: key,
		}));
};
