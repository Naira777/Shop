import React, {useState, useEffect, useRef} from "react";
import s from "./index.module.css";
import {useNavigate} from "react-router-dom";
import vec from "../../assets/vec.png";
import V1 from "../../assets/V_green1.png";
import V2 from '../../assets/V_green2.png';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const Select = ({url}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [value, setValue] = useState(`${t("all")}`)
    const [mode, setMode] = useState(false)
    const {lang} = useSelector((state) => state.CategoryPage)
    useEffect(() => {
        setValue(`${t("all")}`)
    }, [url])
    useEffect(() => {
        setValue(`${t("all")}`)
    }, [lang])

    const handleClick1 = (e) => {
        setValue(e.target.textContent)
        document.getElementById('selectbox').style.display = 'none'
        document.getElementById('vec').style.transform = 'rotate(0deg)'
        navigate(`${url}/all`)
        setMode(false)
    };
    const handleClick2 = (e) => {
        setValue(e.target.textContent)
        document.getElementById('selectbox').style.display = 'none'
        document.getElementById('vec').style.transform = 'rotate(0deg)'
        navigate(`${url}/bestseller`)
        setMode(false)
    };
    const handleClick3 = (e) => {

        setValue(e.target.textContent)
        document.getElementById('selectbox').style.display = 'none'
        document.getElementById('vec').style.transform = 'rotate(0deg)'
        navigate(`${url}/from_high_to_low`)
        setMode(false)
    };
    const handleClick4 = (e) => {
        setValue(e.target.textContent)
        document.getElementById('selectbox').style.display = 'none'
        document.getElementById('vec').style.transform = 'rotate(0deg)'
        navigate(`${url}/from_low_to_high`)
        setMode(false)
    };
    const handleClick = (e) => {
        setMode(!mode)
        e.stopPropagation()

    };

    useEffect(() => {
        if (mode) {
            document.getElementById('selectbox').style.display = 'block'
            document.getElementById('vec').style.transform = 'rotate(180deg)'
        }
        if (!mode) {
            document.getElementById('selectbox').style.display = 'none'
            document.getElementById('vec').style.transform = 'rotate(0deg)'
        }
    }, [mode])


    function changeStyle() {

        if (document.getElementById("selectbox")) {
            document.getElementById("selectbox").style.display = "none"
            document.getElementById('vec').style.transform = 'rotate(0deg)'
            setMode(false)
        }
    }

    useEffect(() => {

        window.addEventListener('click', changeStyle)

        return () => {

            window.removeEventListener("click", changeStyle);

        };
    }, [])

    return (
        <div className={s.selectAll}>
            <div className={s.select} id="select" onClick={handleClick}>
                <p className={s.textselect} style={{width: '100%'}}>{value}</p>
                <img src={vec} className={s.vec} id='vec'/>
            </div>
            <div className={s.selectbox} id="selectbox">
                <div className={s.selectoption} onClick={handleClick1}>
                    <p className={s.textselect} style={{width: '100%'}}>{t("all")}</p>
                </div>

                <div className={s.selectoption} onClick={handleClick2}>
                    <p className={s.textselect} style={{width: '100%'}}>{t("bestseller")} </p>
                </div>
                <div className={s.selectoption} onClick={handleClick3}>
                    <p className={s.textselect}> {t("high")} </p>
                    <div className={s.vecBox}>
                        <img src={V1} className={s.vector}/>
                    </div>
                </div>
                <div className={s.selectoption} onClick={handleClick4}>
                    <p className={s.textselect}> {t("low")}</p>
                    <div className={s.vecBox}>
                        <img src={V2} className={s.vector}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Select;
