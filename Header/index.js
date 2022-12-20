import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import flag_arm from "../../assets/flag.png";
import vector from "../../assets/vec.png";
import phone from "../../assets/Phone.png";
import flag_rus from "../../assets/rus.png";
import flag_eng from "../../assets/eng.png";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {setLanguage} from "../../redux/reducer";
import s from "./index.module.css";

function Header() {
    const dispatch = useDispatch();
    const [mode, setMode] = useState(false)
    const [userLanguage, setUserLanguage] = useState(
        localStorage.getItem("userLanguage") || 'am'
    );
    const ref_select = useRef();
    const ref = useRef();
    const ref_vector = useRef();
    const {i18n} = useTranslation();

    useEffect(() => {
        localStorage.setItem("userLanguage", userLanguage);
        dispatch(setLanguage(userLanguage));
        if (userLanguage === "am") {
            ref.current.src = `${flag_arm}`;
        }
        if (userLanguage === "ru") {
            ref.current.src = `${flag_rus}`;
        }
        if (userLanguage === "en") {
            ref.current.src = `${flag_eng}`;
        }
    }, [userLanguage]);


    const handleClickLanguage = (lang) => {
        ref_select.current.style.display = "none";
        ref_vector.current.style.transform = "rotate(360deg)";
        dispatch(setLanguage(lang));
        setMode(false) 
        setUserLanguage(lang);
        i18n.changeLanguage(lang);
    };

         useEffect(()=>{
                if(mode){
            ref_vector.current.style.transform = "rotate(180deg)"
            ref_select.current.style.display = "block"

                }               
                if(!mode){
            ref_vector.current.style.transform = "rotate(360deg)"
            ref_select.current.style.display = "none"

                }         
        },[mode])

    const handleClick = (e) => {
        setMode(!mode) 
        e.stopPropagation()  
    };

    function close() {
        if(!mode){
           ref_vector.current.style.transform = "rotate(360deg)"
            ref_select.current.style.display = "none"
        }  
        setMode(false)
    }

    useEffect(() => {
        window.addEventListener('click', close)
        return () => {
            window.removeEventListener("click", close);
        };
    }, [])



    return (
        <div className={s.header}>
            <div>
                <img src={phone} className={s.phone}/>
            </div>
            <div className={s.box} onClick={handleClick}>
                <img ref={ref} src={flag_arm} className={s.flag1}/>
                <img ref={ref_vector} src={vector} className={s.vector}/>
            </div>
            <div ref={ref_select} className={s.box_select}>
                <div className={s.select} onClick={() => handleClickLanguage("am")}>
                    <div className={s.flag}>
                        <img src={flag_arm} className={s.flag1}/>
                    </div>
                    <div className={s.text}>Հայերեն</div>
                </div>

                <div className={s.select} onClick={() => handleClickLanguage("ru")}>
                    <div className={s.flag}>
                        <img src={flag_rus} className={s.flag1}/>
                    </div>
                    <div className={s.text}>Русский</div>
                </div>

                <div className={s.select} onClick={() => handleClickLanguage("en")}>
                    <div className={s.flag}>
                        <img src={flag_eng} className={s.flag1}/>
                    </div>
                    <div className={s.text}>English</div>
                </div>
            </div>

        </div>
    );
}

export default Header;
