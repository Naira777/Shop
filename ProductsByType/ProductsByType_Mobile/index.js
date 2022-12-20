import React, {useEffect} from "react";
import s from "./index.module.css";
import {useDispatch, useSelector} from "react-redux";
import Item from "../../ProductsByCategory/Item/index";
import vector from "../../../assets/vector.png";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import {
    getDiscountedProducts,
    getProductsByType, getNextPageData
} from "../../../redux/reducer";
import filter from "../../../assets/filter.png";
import CategoryMenu from "./CategoryMenu/index";
import Select_Mobile from "./../../Select_Mobile/index";
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import {useTranslation} from 'react-i18next';
import {setClickSelect} from './../../../redux/reducer';


function ProductsByType_Mobile() {

    const navigate = useNavigate();
    const {t} = useTranslation();
    const {products, lang, next_page_url, loading, click_select} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const {filterproducttype, filtertype, filtertype1} = useParams();
    const token = localStorage.getItem('user')

    useEffect(() => {

        if (filterproducttype === 'discountproducts') {
            dispatch(getDiscountedProducts(filtertype, filtertype1))
        }
        if (filterproducttype === 'exclusiveproducts') {
            dispatch(getProductsByType(filtertype, filtertype1, 'exclusive'))
        }
        if (filterproducttype === 'newproducts') {
            dispatch(getProductsByType(filtertype, filtertype1, 'new'))
        }
        if (filterproducttype === 'bestsellerproducts') {
            dispatch(getProductsByType(filtertype, filtertype1, 'bestseller'))
        }

    }, [filtertype, filtertype1, filterproducttype, lang, token])

    function close() {
        dispatch(setClickSelect(false))
    }

    useEffect(() => {
        window.addEventListener('click', close)

        return ()=>{
        window.removeEventListener('click', close)            
        }

    }, [])

    const handleClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(setClickSelect(false))
    }, [filtertype1]);


    const handleLoadMore = () => {
        if (next_page_url) {
            if (filterproducttype === 'exclusiveproducts') {
                dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=all&filter_by_product_type=exclusive&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
            }
            if (filterproducttype === 'newproducts') {
                dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=all&filter_by_product_type=new&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
            }
            if (filterproducttype === 'discountproducts') {
                dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=all&filter_by_product_type=all&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
            }
           if (filterproducttype === 'bestsellerproducts') {
                dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=all&filter_by_product_type=all&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
            }

            
        }
    }

    return (
        <div className={s.category}>
            <img src={vector} className={s.vector} onClick={handleClick}/>
            <div className={s.box}>
                <p className={s.text}>
                    {filterproducttype === "bestsellerproducts" && `${t("bestseller")}`}
                </p>
                <p className={s.text}>
                    {filterproducttype === "newproducts" && `${t("new_arrivals")}`}</p>
                <p className={s.text}>
                    {filterproducttype === "exclusiveproducts" && `${t("exclusive")}`}
                </p>
                <p className={s.text}>
                    {filterproducttype === "discountproducts" && `${t("sale")}`}
                </p>
            </div>
            <div className={s.menu}>
                <CategoryMenu url={`/products/${filterproducttype}`}/>
            </div>

            <div
                className={s.filter}
                onClick={(e) => {
                    dispatch(setClickSelect(!click_select))
                    e.stopPropagation()
                }}
            >
                <img src={filter} className={s.filterpic} alt={filter}/>
            </div>

            <Select_Mobile
                url={`/products/${filterproducttype}/${filtertype || `all`}`}
                isclick={click_select}
            />
            <WithPreloaderHOC loading={loading} mobile>
                <div className={s.boxContent}>
                    {products?.map((item, id) => {
                        return (
                            <div key={item.id}>
                                <NavLink className={s.link} to={`/product/${item.id}`}>
                                    <Item
                                        name={item.name}
                                        url={item.image}
                                        rate={item.rate}
                                        percent={item.percent}
                                        isnew={item.isnew}
                                        isdiscount={item.isdiscount}
                                        ishit={item.ishit}
                                        price={item.price}
                                        prevPrice={item.prevPrice}
                                        meas={item.meas}
                                        id={item.id}

                                    />
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </WithPreloaderHOC>
            <div className={s.pagination}>
            {next_page_url  &&   <button className={s.buttonMore_mobile} onClick={handleLoadMore}>
                    {t("seeMore")}
                </button>}
            </div>
        </div>
    );
}

export default ProductsByType_Mobile;
