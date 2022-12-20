import React, {useEffect} from "react";
import s from "./index.module.css";
import {useParams} from "react-router-dom";
import Nav_Item from "./Nav_Item";
import {useSelector, useDispatch} from "react-redux";
import { getCategoriesById } from "../../../redux/reducer";
import { useTranslation } from 'react-i18next';



function CategoryMenu({desktop, iscategory}) {
    const categoriesbyid = useSelector(
        (state) => state.CategoryPage.categoriesById
    );
    const {lang} = useSelector(
        (state) => state.CategoryPage
    );
    const dispatch = useDispatch()
    const {categoryId} = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getCategoriesById());
      }, [lang]); 

    return (
        <div
            className={s.Box}
            style={
                desktop
                    ? {
                        flexDirection: "row",
                        flexWrap: "null",
                        width: "85vw",
                        marginLeft: "80px",
                        marginBottom: '55px',

                    } :
                    null
            }
        >
           {iscategory &&  <Nav_Item name={`${t("all")}`} id={categoryId} desktop={desktop} all />}
            {categoriesbyid.map((item, id) => {
                return (
                    <Nav_Item
                        key={id}
                        name={item.title}
                        id={item.cat_id}
                        desktop={desktop}
                    />
                );
            })}
        </div>
    );
}
export default CategoryMenu;
