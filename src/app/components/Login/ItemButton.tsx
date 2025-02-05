import { ButtonProps } from '@/props/buttonProps';
import React from 'react'

const Button = ({type, disableOptions,handler, buttonName}:ButtonProps) => {
  return (
        <div>
            <button  type={type} disabled={disableOptions} onClick={handler}>
                {buttonName}
            </button>
        </div>
    );
}

export default Button
