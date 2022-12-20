import React, {useState} from "react";
import clsx from "clsx";
import Details from "./details";
import {ReactComponent as Down} from "../../assets/svg/drop-down.svg";
import {ReactComponent as Up} from "../../assets/svg/drop-up.svg";


import styles from "./dropdown.module.css";

const Dropdown = ({className, children, info, standard, withIcon}) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <div onClick={handleClick} className={clsx(className)}>
                {open && standard ? (
                    <div className={styles.dropdown_standard}> {children} </div>
                ) : (
                    children
                )}
                {open ? <Up/> : <Down/>}
            </div>
            {open ? (
                <Details standard={standard} info={info} withIcon={withIcon}/>
            ) : null}
        </div>
    );
};
export default Dropdown;
