'use server'

const handlerViewClick = async (
	apiUrl?: string,
	id?: string 
) => {
	try {
		const res = await fetch(`${apiUrl}/${id}`);
		const result = await res.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
export default handlerViewClick