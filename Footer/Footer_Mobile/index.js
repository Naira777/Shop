import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import f from "../../../assets/f.png";
import I from "../../../assets/Instagram.png";
import Y from "../../../assets/Youtube.png";
import OK from "../../../assets/OK.png";
import VK from "../../../assets/VK.png";
import V from "../../../assets/Visa.png";
import T from "../../../assets/Telcell.png";
import Idram from "../../../assets/Idram.png";
import M from "../../../assets/MasterCard.png";
import {zambi} from "../../images";
import footervector from "../../../assets/footervector.png";
import vector from "../../../assets/V.png";
import {NavLink, useParams} from "react-router-dom";
import {useTranslation} from 'react-i18next';


function Footer_Mobile() {
    const [mode1, setMode1] = useState(true);
    const [mode2, setMode2] = useState(true);
    const [mode3, setMode3] = useState(true);

    const {filtertype} = useParams();
    const {t} = useTranslation();

    const Open = (menu, vector) => {
        document.getElementById(menu).style.display = "block";
        document.getElementById(vector).style.transform = "rotate(180deg)";

    };

    const Close = (menu, vector) => {
        document.getElementById(menu).style.display = "none";
        document.getElementById(vector).style.transform = "none";

    };

    const handleClick1 = () => {
        if (mode1) {
            Open("menu1", "v1");
            setMode1(false);
            Close("menu2", "v2");
            Close("menu3", "v3");
            setMode3(true);
            setMode2(true);
        }
        if (!mode1) {
            Close("menu1", "v1");
            setMode1(true);
        }
    };

    const handleClick2 = () => {
        if (mode2) {
            Open("menu2", "v2");
            setMode2(false);
            Close("menu1", "v1");
            Close("menu3", "v3");
            setMode3(true);
            setMode1(true);
        }
        if (!mode2) {
            Close("menu2", "v2");
            setMode2(true);
        }
    };

    const handleClick3 = () => {
        if (mode3) {
            Open("menu3", "v3");
            setMode3(false);
            Close("menu2", "v2");
            Close("menu1", "v1");
            setMode1(true);
            setMode2(true);
        }
        if (!mode3) {
            Close("menu3", "v3");
            setMode3(true);
        }
    };

    useEffect(() => {
        Close("menu1", "v1");
        Close("menu2", "v2");
        Close("menu3", "v3");
        setMode1(true);
        setMode2(true);
        setMode3(true);
    }, [filtertype]);

    return (
        <div className={s.footerAll}>
            <div className={s.boxContent}>
                <div className={s.box}>
                    <img src={zambi} className={s.zambi}/>
                    <div className={s.Line}></div>
                    <div className={s.boxV} onClick={handleClick1}>
                        <p className={s.text2}> {t("supermarket")}</p>
                        <img className={s.vector1} src={vector} id="v1"/>
                    </div>
                    {mode1 && <div className={s.Line} id="1"></div>}

                    <div className={s.menu} id="menu1">

                        <NavLink className={s.link} to="/categories">

                            <p className={s.menutext}>{t("catalog")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/products/discountproducts">

                            <p className={s.menutext}>{t("sale")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/products/newproducts">
                            <p className={s.menutext}>{t("new_arrivals")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/recipes">

                            <p className={s.menutext}>{t("recipes")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/products/bestsellerproducts">

                            <p className={s.menutext}>{t("choice")}</p>
                        </NavLink>
                         <NavLink className={s.link} to="/brands">

                            <p className={s.menutext}>{t("brands")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/specialoffers">
                            <p className={s.menutext}>{t("promotion")}</p>
                        </NavLink>
                    </div>
                    <div id={s.line2} className={s.Line}></div>

                    <div className={s.boxV} onClick={handleClick2}>
                        <p className={s.text2}>{t("links")}</p>
                        <img className={s.vector2} src={vector} id="v2"/>
                    </div>

                    {mode2 && <div className={s.Line} id="1"></div>}
                    < div className={s.menu} id="menu2">

                        <NavLink className={s.link} to="/aboutus"><p className={s.menutext}>{t("about")}</p></NavLink>
                        <NavLink className={s.link} to="/careers "><p className={s.menutext}>{t("jobs_openings")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/supplier"><p className={s.menutext}>{t("suppliers")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/frequentlyQuestions"><p className={s.menutext}>{t("FAQ")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/rules"><p className={s.menutext}>{t("terms")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/privacy"><p className={s.menutext}>{t("privacy")}</p></NavLink>
                    </div>
                    <div id={s.line1} className={s.Line}></div>

                    <div className={s.boxV} onClick={handleClick3}>
                        <p className={s.text2}>{t("contact")}</p>
                        <img className={s.vector3} src={vector} id="v3"/>
                    </div>

                    {mode3 && <div className={s.Line} id="3"></div>}
                    <div className={s.menu} id="menu3">
                        <div className={s.mobile_menu}>
                            <p className={s.menutext}>{t("chat")}</p>
                            <p className={s.menutext}>+374(XX)XX-XX-XX</p>
                        </div>
                    </div>
                    <div id={s.line3} className={s.Line}></div>


                    <div>
                        <div className={s.text3}> {t("follow")}</div>

                        <div className={s.socialicons}>
                            <a href="https://www.facebook.com/"> <img className={s.img} src={f}/></a>
                            <a href="https://www.instagram.com/"> <img className={s.img} src={I}/> </a>
                            < a href="https://www.youtube.com/"> <img className={s.img} src={Y}/> </a>
                            < a href="https://ok.ru/"> <img className={s.img} src={OK}/> </a>
                            <a href="https://vk.com/"> <img className={s.img} src={VK}/> </a>
                        </div>

                        <div className={s.text3}>{t("payment")}</div>
                        <div className={s.paymenticons}>
                            <img className={s.img} src={V}/>
                            <img className={s.img} src={M}/>
                            <img className={s.img} src={T}/>
                            <img className={s.fimg} src={Idram}/>
                        </div>
                    </div>
                </div>

            </div>
            <div className={s.footer}>
              
                <div style={{marginBottom: '-15px',
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <img className={s.footerimg} src={footervector}/>
                <p className={s.footertext}>
                    Copyright <a href='https://cybertech.am' style={{textDecoration: 'none', color: '#F1F1F9'}}>Cyber Tech LLC</a> 2022- All rights reserved
                </p>
                </div>
                <div>
                    <p className={s.footertext}>
                    Designed and developed by <a href='https://cybertech.am' style={{textDecoration: 'none', color: '#F1F1F9'}}>Cyber Tech LLC</a>
                </p>
                </div>
            </div>
        </div>
    );
}

export default Footer_Mobile;
