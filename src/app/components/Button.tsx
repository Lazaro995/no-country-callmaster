import { ButtonProps } from '@/props/buttonProps';
import React from 'react'

const Button = ({type, disableOptions,handler, buttonName}:ButtonProps) => {
  return (
		<div>
			<button
				className='border-[2px] border-[#003366] rounded-[8px] py-5 px-3 gap-3 hover:cursor-pointer  font-roboto font-bold  text-center'
				type={type}
				disabled={disableOptions}
				onClick={handler}>
				{buttonName}
			</button>
		</div>
	);
}

export default Button
