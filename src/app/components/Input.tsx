"use client";
import React from "react";
import { InputProps } from "@/props/InputProps";

const Input = ({
	nombre,
	error,
	cambio,
	value,
	item,
	inputType,
}: InputProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		cambio(newValue);
	};

	return (
		<div className='flex flex-col gap-2  '>
		
			<div className='relative flex items-center '>
				<input
					className="w-full h-10 border border-secondary1 bg-background2 p-2 rounded font-montserrat text-primary3 text-sm"
					type={inputType}
					id={inputType}
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
			<div>
			{error && <span className="text-error font-montserrat text-xs">{error}</span>}
			</div>
		</div>
	);
};

export default Input;
