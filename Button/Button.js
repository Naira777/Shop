import React from 'react';
import clsx from 'clsx';

const Button = ({className, disabled, onClick, children, type = 'submit'}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={clsx(className)}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
export default Button;