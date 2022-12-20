import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import {useNavigate} from "react-router-dom";
import V1 from "../../assets/V_green1.png";
import V2 from "../../assets/V_green2.png";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {setClickSelect} from "../../redux/reducer";

const Select = ({url, isclick}) => {
    const navigate = useNavigate();
    const {lang} = useSelector((state) => state.CategoryPage);
    const {t} = useTranslation();
    const [value, setValue] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        setValue(`${t("all")}`);
    }, [url]);
    useEffect(() => {
        setValue(`${t("all")}`);
    }, [lang]);
    const handleClick1 = (e) => {
        setValue(e.target.textContent);
        document.getElementById("selectbox").style.display = "none";
        navigate(`${url}/all`);
    };
    const handleClick2 = (e) => {
        setValue(e.target.textContent);
        document.getElementById("selectbox").style.display = "none";
        navigate(`${url}/bestseller`);
    };
    const handleClick3 = (e) => {
        setValue(e.target.textContent);
        document.getElementById("selectbox").style.display = "none";
        navigate(`${url}/from_high_to_low`);
    };
    const handleClick4 = (e) => {
        setValue(e.target.textContent);
        document.getElementById("selectbox").style.display = "none";
        navigate(`${url}/from_low_to_high`);
    };
    useEffect(() => {
        if (isclick) {
            document.getElementById("selectbox").style.display = "block";
        }
    }, [isclick]);

    function changeStyle() {
        dispatch(setClickSelect(false))
        if (document.getElementById("selectbox")) {
            document.getElementById("selectbox").style.display = "none";
        }
    }

    useEffect(() => {
        window.addEventListener("click", changeStyle);

        return () => {
            window.removeEventListener("click", changeStyle);
        };
    }, []);

    return (
        <div className={s.selectAll}>
            <div className={s.selectbox} id="selectbox">
                <div className={s.selectoption} onClick={handleClick1}>
                    <p className={s.textselect} style={{width: "100%"}}>
                        {t("all")}
                    </p>
                </div>

                <div className={s.selectoption} onClick={handleClick2}>
                    <p className={s.textselect} style={{width: "100%"}}>
                        {t("bestseller")}
                    </p>
                </div>
                <div className={s.selectoption} onClick={handleClick3}>
                    <p className={s.textselect}> {t("high")}</p>
                    <div className={s.vecBox}>
                        <img src={V1} className={s.vec}/>
                    </div>
                </div>
                <div className={s.selectoption} onClick={handleClick4}>
                    <p className={s.textselect}> {t("low")}</p>
                    <div className={s.vecBox}>
                        <img src={V2} className={s.vec}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Select;
