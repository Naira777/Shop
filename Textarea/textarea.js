import React from 'react';
import { useController } from 'react-hook-form';
import clsx from 'clsx';

const Textarea = ({ className, placeholder, control, name }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <textarea
        className={clsx(className)}
      placeholder={placeholder} 
      error = {error} 
      {...field} 
    />
  );

};

export default Textarea;