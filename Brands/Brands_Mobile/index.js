import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands,
    getBrandsByCategory,
} from "../../../redux/reducer";
import s from "./index.module.css";
import Item from ".././Brands_Mobile/Item";
import vector from "../../../assets/vector.png";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import CategoryMenu from "../../ProductsByType/ProductsByType_Mobile/CategoryMenu";
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import {useTranslation} from 'react-i18next';


function Brands() {
    const {t} = useTranslation();
    const {brands, loading} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {filtertype} = useParams();


    useEffect(() => {
        if (filtertype) {
            dispatch(getBrandsByCategory(filtertype));
        }
        if (filtertype == 'all') {
            dispatch(getBrands());
        }
        if (!filtertype) {
            dispatch(getBrands());
        }
    }, [filtertype]);

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <WithPreloaderHOC mobile loading={loading}>
            <div className={s.main} >
                <div className={s.box}>
                    <img src={vector} className={s.vector} onClick={handleClick}/>
                    <p className={s.text}> {t("brands")} </p>
                    <div className={s.menu}>
                        <CategoryMenu url={`/brands`}/>
                    </div>
                </div>

                <div className={s.content}>
                    {brands?.map((item, id) => {
                        return (
                            <div key={item.id}>
                                <Item
                                    url={item.url}
                                    id={item.id}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </WithPreloaderHOC>
    );
}

export default Brands;
