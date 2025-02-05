"use client";
import React from "react";
import { TextareaProps } from "@/props/TextareaProps";

const Textarea = ({
	nombre,
	error,
	cambio,
	value,
	item
}: TextareaProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = event.target.value;
		cambio(newValue);
	};

	return (
		<div className='flex flex-col gap-2  '>
			<div className='relative flex items-center '>
				<textarea
					className="w-full h-24 border border-secondary1 bg-background2 p-2 rounded font-montserrat text-primary3 text-sm resize-none"
					id={nombre}
					name={nombre}
					value={value}
					onChange={handleChange}
					placeholder={nombre}
				/>
				{item && (
					<div className="hover:cursor-pointer hover:scale-110 absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
						{item}
					</div>
				)}
			</div>
			{error && <span className="text-error font-montserrat text-xs">{error}</span>}
		</div>
	);
};

export default Textarea;
