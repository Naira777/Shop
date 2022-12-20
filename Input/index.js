import React from "react";
import s from "./index.module.css";
import {editpic} from '../images/edit.png'

const Input = ({type, defaultValue, handleChange, label, edit, ...otherProps}) => {

    return (

        <div>
            {label && (
                <label className={s.label}>
                    {label}
                </label>
            )}
            <input className={s.input} value={defaultValue} onChange={handleChange} onClick={handleClick} type={type}/>
            <div className={s.boxedit}>
                {edit && <img src={editpic} className={s.edit}/>}
            </div>
        </div>
    )

}
export default Input;