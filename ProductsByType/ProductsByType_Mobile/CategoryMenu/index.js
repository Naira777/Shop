import React, { useEffect} from "react";
import s from "./index.module.css";
import Nav_Item from "./Nav_Item";
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "./../../../../redux/reducer";
import { useTranslation } from 'react-i18next';


function CategoryMenu({ url }) {
  const {categories, lang}= useSelector((state) => state.CategoryPage);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCategories());
  }, [lang]);

  return (
    <div className={s.Box}>
      <Nav_Item name={`${t("all")}`} id={'all'} url={url}  all  />

       {categories?.map((item, id) => {
        return <Nav_Item name={item.title} id={item.id} key={item.id} url={url} className={s.link}/>;
      })}
    </div>
  );
}

export default CategoryMenu;
