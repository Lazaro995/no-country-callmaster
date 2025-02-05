"use server";

const handlerEditClick = async (
	 
	apiUrl?: string,
	id?: string

	)	=> {
	try {
		const res = await fetch(`${apiUrl}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});
		if (!res.ok) {
			throw new Error("Error al editar la incidencia");
		}
		const result = await res.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
export default handlerEditClick;
