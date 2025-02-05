"use server";

const handlerDeleteClick = async (


	apiUrl?: string,
	id?: string
) => {
	try {
		await fetch(`${apiUrl}/${id}`, {
			method: "DELETE",
		});
	} catch (error) {
		console.error(error);
	}
};
export default handlerDeleteClick;
