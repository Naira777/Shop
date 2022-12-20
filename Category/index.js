import React, {useEffect} from "react";
import s from "./index.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../redux/reducer";
import Item from "./Item/Item";
import vector from "../../assets/vector.png";
import {NavLink, useNavigate} from "react-router-dom";
import {useWindowSize} from "./../../CustomHooks/getWindowWidth";
import Item_Mobile from "./Item_Mobile/Item";
import {useTranslation} from 'react-i18next';

function Category() {
    const {categories, lang} = useSelector((state) => state.CategoryPage);
    const [height, width] = useWindowSize();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getCategories());
    }, [lang]);


    const handleNavigate = () => {
        navigate(-1)

    }

    if (width > 500) {
        return (
            <div className={s.category}>
                <p className={s.text_small}>{t("sections")}</p>

                <div className={s.box}>
                    <p className={s.text}>{t("sections")}</p>
                    <p className={s.text1}>22 {t("section")}</p>
                </div>

                <div className={s.boxContent}>
                    {categories.length > 0 &&
                        categories.map((item, id) => (
                            <NavLink key={id} className={s.link} to={`${item.id}`}>
                                <Item title={item.title} url={item.url} id={item.id}/>
                            </NavLink>
                        ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className={s.category_mobile}>
                <img src={vector} className={s.vector_mobile} onClick={handleNavigate}/>
                <div className={s.box_mobile}>
                    <p className={s.text_mobile}>{t("sections")}</p>
                    <p className={s.text1_mobile}>22 {t("section")}</p>
                </div>

                <div className={s.boxContent_mobile}>
                    {categories.length > 0 &&
                        categories.map((item, id) => {
                            return (
                                <div key={id}>
                                    <NavLink to={`${item.id}`} className={s.link}>
                                        <Item_Mobile
                                            title={item.title}
                                            url={item.url}
                                            id={item.id}
                                        />
                                    </NavLink>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

export default Category;
