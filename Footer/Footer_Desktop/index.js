import React from "react";
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
import footervector from "../../../assets/footervector.png";
import {NavLink} from "react-router-dom";
import {zambi} from "../../images";
import {useTranslation} from 'react-i18next';

function Footer_Desktop() {
    const {t} = useTranslation();

    return (
        <div className={s.footerAll}>
            <img src={zambi} className={s.logo}/>

            <div className={s.Line}></div>

            <div className={s.box}>
                <div className={s.box1} style={{width: "23%"}}>
                    <p className={s.text2}>  {t("supermarket")}</p>
                    <div className={s.menu}>
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
                            <p className={s.menutext}>{t("bestseller")}</p>
                        </NavLink>
                         <NavLink className={s.link} to="/brands">
                            <p className={s.menutext}>{t("brands")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/specialoffers">
                            <p className={s.menutext}>{t("promotion")}</p>
                        </NavLink>
                    </div>
                </div>
                <div className={s.box1} style={{width: "30%"}}>
                    <p className={s.text2}> {t("links")}</p>
                    <div className={s.menu}>
                        <NavLink className={s.link} to="/aboutus">
                            <p className={s.menutext}>{t("about")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/careers ">
                            <p className={s.menutext}>{t("jobs_openings")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/supplier">
                            <p className={s.menutext}>{t("suppliers")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/frequentlyQuestions">
                            <p className={s.menutext}>{t("FAQ")} </p>
                        </NavLink>
                        <NavLink className={s.link} to="/rules">
                            <p className={s.menutext}>{t("terms")}</p>
                        </NavLink>
                        <NavLink className={s.link} to="/privacy">
                            <p className={s.menutext}>{t("privacy")}</p>
                        </NavLink>
                    </div>
                </div>
                <div className={s.box1} style={{width: "20%"}}>
                    <p className={s.text2}> {t("contact")}</p>

                    <div className={s.menu} id="menu3">
                        <div className={s.mobile_menu1}>
                            <p className={s.menutext}>{t("chat")}</p>
                            <p className={s.menutext}>+374(XX)XX-XX-XX</p>
                        </div>
                    </div>
                </div>
                <div className={s.box2}>
                    <div className={s.text2}> {t("follow")}</div>

                    <div className={s.socialicons}>
                        <a href="https://www.facebook.com/">
                            <img className={s.img} src={f}/>
                        </a>
                        <a href="https://www.instagram.com/">
                            <img className={s.img} src={I}/>
                        </a>
                        <a href="https://www.youtube.com/">
                            <img className={s.img} src={Y}/>
                        </a>
                        <a href="https://ok.ru/">
                            <img className={s.img} src={OK}/>
                        </a>
                        <a href="https://vk.com/">
                            <img className={s.img} src={VK}/>
                        </a>
                    </div>

                    <div className={s.text2}> {t("payment")}</div>

                    <div className={s.paymenticons}>
                        <img className={s.img} src={V}/>
                        <img className={s.img} src={M}/>
                        <img className={s.img} src={T}/>
                        <img className={s.fimg} src={Idram}/>
                    </div>
                </div>
            </div>
            <div className={s.footer}>
                <div className={s.textBox} >
                <img className={s.footerimg} src={footervector}/>
                <p className={s.footertext}>
                    Copyright <a style={{textDecoration: 'none', color: '#F1F1F9'}} href='https://cybertech.am'>Cyber Tech LLC</a> 2022- All rights reserved
                </p>
                </div>
                <div>
                    <p className={s.footertext}>
                    Designed and developed by <a style={{textDecoration: 'none', color: '#F1F1F9'}} href='https://cybertech.am'>Cyber Tech LLC</a>
                </p>
                </div>
            </div>
        </div>
    );
}
export default Footer_Desktop;
