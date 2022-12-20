import React, {useState} from "react";
import {getBrandProductsandDesc} from "../../redux/reducer";
import s from "./index.module.css";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import link from "../../assets/external-link.png";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import Item_Product from "../ProductsByType/ProductsByType_Desktop/Item_Product";
import Select from "../Select/index";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";
import Item from "./../ProductsByCategory/Item/index";
import vector from "../../assets/vector.png";
import filter from "../../assets/filter.png";
import Select_Mobile from "../Select_Mobile/index";
import {WithPreloaderHOC} from "../Hoc/withPreloader";
import {useTranslation} from 'react-i18next';


function Brand_Products({}) {
    const dispatch = useDispatch();
    const {filtertype, filtertype1} = useParams();
    const {t} = useTranslation();
    const [height, width] = useWindowSize();
    const [isclick, setIsclick] = useState(false);
    const navigate = useNavigate();
    const brandAndProducts = useSelector(
        (state) => state.CategoryPage.brand_and_products
    );
    const {loading, lang} = useSelector(
        (state) => state.CategoryPage
    );

    useEffect(() => {
      if(filtertype1){
        dispatch(getBrandProductsandDesc(filtertype, filtertype1));
      }
    }, [filtertype, filtertype1, lang]);


    useEffect(() => {
       
        dispatch(getBrandProductsandDesc(filtertype, undefined));
        
    }, [filtertype, lang]);

    const handleClick = () => {
        navigate(-1);
    };
    useEffect(() => {
        setIsclick(false);
    }, [filtertype1]);

    function close() {
        setIsclick(false)
    }

    useEffect(() => {
        window.addEventListener('click', close)
    }, [])

    if (width > 500) {
        return (
            <WithPreloaderHOC loading={loading}>
                <div className={s.boxAll}>
                    <div className={s.box}>
                        <div className={s.boxLeft}>
                            <div>
                                <img className={s.pic}
                                     src={brandAndProducts?.image}/>
                            </div>
                            <div>
                                <p className={s.title}>{brandAndProducts?.name}</p>
                                <p className={s.desc}>{brandAndProducts?.desc}</p>
                            </div>
                            <div>
                                {brandAndProducts?.network?.website &&
                                    <a href={brandAndProducts?.network?.website} className={s.box1}>
                                        {t("visit_page")} <img src={link} className={s.external_link}/>
                                    </a>}
                                <div className={s.links}>
                                    {brandAndProducts?.network?.instagram && <a
                                        href={brandAndProducts?.network?.instagram}
                                        className={s.link}
                                    >
                                        INSTAGRAM
                                    </a>}
                                    {brandAndProducts?.network?.facebook && <a
                                        href={brandAndProducts?.network?.facebook}
                                        className={s.link}
                                    >
                                        FACEBOOK
                                    </a>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.select}>
                        <Select url={`/brand_products/${filtertype}`}/>
                    </div>

                    <div className={s.content_Products}>
                        {brandAndProducts?.products?.map((item, id) => {
                            return (
                                <div key={item.id}>
                                    <NavLink className={s.link} to={`/product/${item.id}`}>
                                        <Item_Product
                                            name={item.name}
                                            url={item.image}
                                            rate={item.rate}
                                            percent={item.percent}
                                            isnew={item.isnew}
                                            ishit={item.ishit}
                                            isdiscount={item.isdiscount}
                                            price={item.price}
                                            prevPrice={item.prevPrice}
                                            meas={item.measur}
                                            id={item.id}
                                        />
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </WithPreloaderHOC>
        );
    } else {
        return (
            <WithPreloaderHOC loading={loading} mobile>
                <div className={s.boxAll_M}>
                    <img src={vector} className={s.vector_M} onClick={handleClick}/>
                    <p className={s.header_M}> {brandAndProducts?.name} </p>
                    <div className={s.pic_M_Box}>
                        <img className={s.pic_M} src={brandAndProducts?.image}/>
                    </div>
                    <div className={s.desc_M}>{brandAndProducts?.desc}</div>
                    <div className={s.box_M}>
                        <a href={brandAndProducts?.network?.website} className={s.box1_M}>
                            {t("visit_page")} <img src={link} className={s.external_link}/>
                        </a>
                        <div className={s.links_M}>
                            <a href={brandAndProducts?.network?.instagram} className={s.link_M}>
                                INSTAGRAM
                            </a>

                            <a href={brandAndProducts?.network?.facebook} className={s.link_M}>
                                FACEBOOK
                            </a>
                        </div>
                    </div>
                    <div
                        className={s.filter}
                        onClick={(e) => {

                            setIsclick(!isclick);
                            e.stopPropagation()
                        }}
                    >
                        <img src={filter} className={s.filterpic} alt={filter}/>
                    </div>
                    <Select_Mobile
                        url={`/brand_products/${filtertype}`}
                        isclick={isclick}
                    />
                    <div className={s.content_Products_M}>
                        {brandAndProducts?.products?.map((item, id) => {
                            return (
                                <div key={id}>
                                    <NavLink className={s.link} to={`/product/${item.id}`}>
                                        <Item
                                            name={item.name}
                                            url={item.image}
                                            rate={item.rate}
                                            percent={item.percent}
                                            isnew={item.isnew}
                                            ishit={item.ishit}
                                            isdiscount={item.isdiscount}
                                            price={item.price}
                                            prevPrice={item.prevPrice}
                                            meas={item.measur}
                                            id={item.id}
                                        />
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </WithPreloaderHOC>
        );
    }
}

export default Brand_Products;
