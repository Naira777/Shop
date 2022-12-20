import React, {useState} from 'react';
import clsx from 'clsx';
import {useController} from 'react-hook-form';
import {ReactComponent as EyeSvg} from '../../assets/svg/eye.svg';
import {ReactComponent as ClosedEye} from '../../assets/svg/closeEye.svg';

import styles from './textInput.module.css';

const TextInput = ({className, type, placeholder, name, control}) => {
    const {
        field, fieldState: {error},
    } = useController({control, name});

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (<div className={styles.text_input}>
            <input
                className={clsx(className, styles.input)}
                placeholder={placeholder}
                type={type === 'password' && showPassword ? 'text' : type}
                {...field}
            />
            {type === 'password' && (<span className={styles.eyeIcon} onClick={handleShowPassword}>
          {showPassword ? <EyeSvg/> : <ClosedEye className={styles.closed_eye}/>}
        </span>)}
            {error?.message && <div>{error.message}</div>}
        </div>);
};

export default TextInput;
