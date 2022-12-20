import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useWindowSize} from "./../../CustomHooks/getWindowWidth";
import {getNextPageData, getProductsByPar_Id, getSearchResults} from "../../redux/reducer";
import {WithPreloaderHOC} from "./../Hoc/withPreloader";
import Item_Product from "./../ProductsByType/ProductsByType_Desktop/Item_Product/index";
import Item from './../ProductsByCategory/Item/index';
import Next_Page from './../Next_Page/index';
import {useTranslation} from 'react-i18next';


const Search = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {filtertype} = useParams();
    const {lang, search_results, search_text, loading, products, next_page_url, delivery_type} = useSelector(
        (state) => state.CategoryPage
    );
    const [height, width] = useWindowSize();
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (search_text != "") {
            dispatch(getSearchResults(search_text));
        }
    }, [lang, search_text]);

    useEffect(() => {
        if (filtertype) {
            setMessage("");
            dispatch(getProductsByPar_Id(filtertype));
        } else {
            setMessage(`${t("enter_data")}`);
        }
    }, [lang, filtertype]);

    const handleLoadMore = () => {
        next_page_url && dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=${delivery_type}&filter_by_main_filter=all&filter_by_product_type=all&category=${filtertype}`))

    }

    if (width > 500) {

        return (
            <WithPreloaderHOC loading={loading}>
                <div className={s.All}>
                    {!filtertype && search_text != "" && (
                        <div className={s.content}>
                            {search_results?.map((item, id) => {
                                return (
                                    <NavLink
                                        to={`${item.product_category_id}`}
                                        style={{textDecoration: "none"}}
                                        key={id}
                                    >
                                        <p className={s.item}> {item.title} </p>
                                    </NavLink>
                                );
                            })}
                        </div>
                    )}

                    {search_results?.length == 0 && !filtertype && search_text != "" && (
                        <p className={s.item1}> {`${t("enter_data1")}`} </p>
                    )}

                    {search_text == "" && !filtertype && (
                        <p className={s.item1}> {message} </p>
                    )}

                    <div className={s.content1}>
                        {filtertype &&
                            products?.map((item, id) => {                               
                                return (
                                    <NavLink
                                        key={id}
                                        style={{textDecoration: "none"}}
                                        to={`/product/${item.id}`}
                                    >
                                        <Item_Product
                                            name={item.name}
                                            url={item.image}
                                            rate={item.rate}
                                            percent={item.percent}
                                            isnew={item.isnew}
                                            isdiscount={item.isdiscount}
                                            price={item.price}
                                            prevPrice={item.prevPrice}
                                            meas={item.meas}
                                            ishit={item.ishit}
                                            id={item.id}
                                        />
                                    </NavLink>
                                );
                                 })}
                        {products?.length > 0 && filtertype && <div className={s.pagination}>

                        {next_page_url && <Next_Page desktop handleLoadMore={handleLoadMore}/>}


                        </div>}
                        {products?.length == 0 && filtertype && (
                            <p className={s.item}> {`${t("enter_data1")}`} </p>
                        )}
                    </div>
                </div>
            </WithPreloaderHOC>
        );
    } else {
        return (
            <WithPreloaderHOC loading={loading} mobile>

                <div className={s.All_M}>
                    {!filtertype && search_text != "" && (
                        <div className={s.content}>
                            {search_results?.map((item, id) => {
                                return (
                                    <NavLink
                                        to={`${item.product_category_id}`}
                                        style={{textDecoration: "none"}}
                                        key={id}
                                    >
                                        <p className={s.item}> {item.title} </p>
                                    </NavLink>
                                );
                            })}
                        </div>
                    )}

                    {search_results?.length == 0 && !filtertype && search_text != "" && (
                        <p className={s.item1}> {`${t("enter_data1")}`} </p>
                    )}

                    {search_text == "" && !filtertype && (
                        <p className={s.item1}> {message} </p>
                    )}

                    <div className={s.content1}>
                        {filtertype &&
                            products?.map((item, id) => {
                                return (
                                    <NavLink
                                        key={id}
                                        style={{textDecoration: "none"}}
                                        to={`/product/${item.id}`}
                                    >
                                        <Item
                                            name={item.name}
                                            url={item.image}
                                            rate={item.rate}
                                            percent={item.percent}
                                            isnew={item.isnew}
                                            isdiscount={item.isdiscount}
                                            price={item.price}
                                            prevPrice={item.prevPrice}
                                            meas={item.meas}
                                            ishit={item.ishit}
                                            id={item.id}
                                        />
                                    </NavLink>
                                );

                            })}
                                {products?.length > 0 && filtertype && <div className={s.pagination}>

              {next_page_url && <Next_Page mobile handleLoadMore={handleLoadMore}/>}


                    </div>}

                        {products?.length == 0 && filtertype && (
                            <p className={s.item}> {`${t("enter_data1")}`} </p>
                        )}
                    </div>
                </div>
            </WithPreloaderHOC>
        )

    }
};
export default Search;
