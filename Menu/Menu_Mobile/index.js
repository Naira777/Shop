import React, {useEffect, useState, useRef} from "react";
import s from "./index.module.css";
import {slaq} from "./../../images";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {
    getCategories,
    getCategoriesById,
    changeCategoryIdes,
} from "../../../redux/reducer";
import {useSelector, useDispatch} from "react-redux";
import {getCategoriesByid} from "../../../utils";
import Popup_Menu from "./../../Popup_Menu/index";
import {useTranslation} from "react-i18next";
import {setClickMenu} from './../../../redux/reducer';

function Menu_Mobile() {
 
        const {categoryList, categoriesById, categories, lang} = useSelector(
        (state) => state.CategoryPage
    );

    const [mode, setMode] = useState(false);
    const {t} = useTranslation();
    const [modeInner, setModeInner] = useState(false);
    const [title, setTitle] = useState("");
    const [catId, setCatId] = useState("");
    const dispatch = useDispatch();
    const menu_ref = useRef(null);
    const navigate = useNavigate();
    const [id1, setId1] = useState();
    const [index, setIndex] = useState();


    const data = [
        {
            id: "9",
            to: "/products/newproducts",
            text: t("new_arrivals"),
        },
        {
            id: "6",
            to: "/products/exclusiveproducts",
            text: t("exclusive"),
        },
        {
            id: "7",
            to: "/products/discountproducts",
            text: t("sale"),
        },
        
    ];

    useEffect(() => {
        setMode(false);
    }, [window.location.href]);

    useEffect(() => {
        dispatch(getCategoriesById());
        dispatch(getCategories());
    }, [lang]);

    useEffect(() => {
        dispatch(changeCategoryIdes(getCategoriesByid(categoryList, catId)));
    }, [catId, categoryList, modeInner, lang]);

    const handleClick = (e, id, index) => {
        setId1(id)
        setIndex(index)
        setMode(!mode);
        {
            index === 0 && setCatId(e.target.id);
        }
        menu_ref.current.style.display = "none";        
        setTitle(categoryList.find((item) => item.id === id)?.translation?.title);
        {
            (index !== 0  && setModeInner(true));
        }
        {
            (index !== 0 && setCatId(id));
        }

    };

    const handleClickFilter = (e) => {
        setCatId(e.currentTarget.id);
        setModeInner(true);
        setTitle(e.currentTarget.title);
    };

    const handleClickVector = () => {
        if (!modeInner) {
            setMode(false);
            setModeInner(false);
        } else if (modeInner && index !=0 ) {
            setMode(false);
            setModeInner(false); 
            menu_ref.current.style.display = "inline";          
        } else if (modeInner) {
            setTitle(categoryList.find((item) => item.id == id1)?.translation?.title);
            setMode(true);
            setModeInner(false);            
        }
        menu_ref.current.style.display = "inline";

    };

    const handleClickFilterInner = (e) => {
        navigate(`/categories/${catId}/${e.currentTarget.id}`);
        setMode(false);
        menu_ref.current.style.display = "none";
        setTitle(e.currenttarget?.value);
        dispatch(setClickMenu(false));
    };
    
    return (
        <>
            <Popup_Menu mode={true} mobile>
                <div className={s.menu} ref={menu_ref}>
                    <div className={s.links_M}>
                        {data?.map((item, index) => {
                            if (index < 3) {
                                return (
                                    <NavLink
                                        key={item.id}
                                        className={s.navlink}
                                        to={item.to}
                                    >
                                        {item.text}
                                    </NavLink>
                                );
                            }
                             })}
                             {categoryList?.filter((item)=> item.parent_id === null)?.map((item, index)=>{
                          
                                 return (
                                    <NavLink
                                        key={item.id}
                                        className={s.navlink}
                                        to=""
                                        id={item.product_category_id}
                                        onClick={(e) => handleClick(e, item.id, index)}
                                    > 
                                        {item.translation?.title}
                                    </NavLink>
                                );                            
                             })}                           
                      </div>
                </div>

                {mode && (
                    <div className={s.content}>
                        <div className={s.row}>
                            <img className={s.slaq} src={slaq} onClick={handleClickVector}/>
                            {mode && <p className={s.title1}> {title}</p>}
                            {!mode && !modeInner && <p className={s.title1}> {title}</p>}
                        </div>
                    
                        {modeInner && index !=0 &&
                            categoriesById?.map((item, id) => {
                               
                                return (
                                    <div
                                        className={s.row}
                                        key={item.cat_id}
                                        onClick={handleClickFilterInner}
                                        id={item.cat_id}
                                    >                                     
                                        <p className={s.title}>{item.title}</p>
                                    </div>
                                );
                            })}

                       {modeInner && index ==0 &&
                            categoriesById?.map((item, id) => {
                               
                                return (
                                    <div
                                        className={s.row}
                                        key={item.cat_id}
                                        onClick={handleClickFilterInner}
                                        id={item.cat_id}
                                    >                                     
                                        <p className={s.title}>{item.title}</p>
                                    </div>
                                );
                            })}
                            
                           
                        {!modeInner &&  index === 0 &&
                            categories?.map((item, id) => {
                                if (item.par_id == id1) {
                                    return (
                                        <div
                                            className={s.row}
                                            key={item.id}
                                            onClick={handleClickFilter}
                                            id={item.id}
                                            parid={item.par_id}
                                            title={item.title}
                                        >
                                            <img src={item.url}
                                                 className={s.pic}/>
                                            <p className={s.title}>{item.title}</p>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                )}
            </Popup_Menu>
        </>
    );
}

export default Menu_Mobile;
