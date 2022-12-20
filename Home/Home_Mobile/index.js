import s from './index.module.css'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import delivery from '../../../assets/delivery.png'
import {NavLink} from 'react-router-dom'
import Item from './ItemProduct/index'
import {
    getBrands,
    getDiscountedProducts,
    getPictures,
    getProductsByPar_Id,
    getProductsByType
} from '../../../redux/reducer'
import ItemBrand from './ItemBrand'
import ItemCategory from './ItemCategory/index'
import {getCategories} from '../../../redux/reducer'
import ItemBaghadratoms from './ItemBaghadratoms'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {useNavigate} from 'react-router-dom'
import Discounted_Products from './DiscountedProducts'
import {getRecipes} from '../../../redux/recipesReducer'
import {setDeliveryType} from './../../../redux/reducer';
import {useWindowSize} from './../../../CustomHooks/getWindowWidth';
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import {useTranslation} from 'react-i18next';
import {ReactComponent as Delivery} from "../../../assets/delivery.svg";
import {ReactComponent as Delivery_all} from "../../../assets/delivery_all.svg";




function Home_Mobile() {
    const {t} = useTranslation();
    const [height, width] = useWindowSize();
    const {categories, brands, lang, new_products, hit_products, delivery_type, loading, token, pictures} = useSelector(
        (state) => state.CategoryPage,
    )
    const {recipes} = useSelector((state) => state.RecipesPage)
    const [market_type, setMarket_Type] =
        useState(localStorage.getItem("delivery_type") ? localStorage.getItem("delivery_type") : 'all');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.UsersPage)
    const [idDot, setIdDot]= useState()


    useEffect(() => {

        localStorage.setItem('delivery_type', market_type ? market_type : 'all')
        dispatch(setDeliveryType(market_type ? market_type : 'all'));

    }, [market_type]);


    useEffect(() => {
        dispatch(getProductsByType(undefined, undefined, 'bestseller'))
        dispatch(getProductsByType(undefined, undefined, 'new'))

    }, [lang, token, delivery_type])

    useEffect(() => {
        dispatch(getPictures())
    }, []);

    useEffect(() => {
        if (userInfo.token) {
            localStorage.setItem("user", userInfo.token)
            localStorage.setItem("user_name", userInfo.name)
            localStorage.setItem("user_surname", userInfo.surname)
            localStorage.setItem("user_email", userInfo.email)
        }
    }, [userInfo])


    useEffect(() => {
        dispatch(getCategories())
        dispatch(getBrands())
        dispatch(getRecipes())
    }, [lang])

    const handleClick1 = () => {
        setMarket_Type('all')
        document.getElementById('express').style.background = '#F6F6F6'
        document.getElementById('super').style.background = 'white'
    }

    const handleClick2 = () => {
        setMarket_Type('express')
        document.getElementById('express').style.background = 'white'
        document.getElementById('super').style.background = '#F6F6F6'
    }


    return (
        <div className={s.content}>
            <div className={s.araqum}>
                <div className={s.araqum_item}
                     style={market_type === 'all' ? {background: '#fff', border: '1px solid #3D9A85'} : null}
                     onClick={handleClick1} id="super"> 
                    {market_type === "all" ? <Delivery_all fill='#3D9A85' with='25' height='25'/> :
                        <Delivery_all with='25' height='25' fill='rgba(33, 33, 33, 0.3)'/>}

                    <div className={s.araqum_text1}> {t("supermarket")} </div>

                    <div className={s.araqum_text2}>
                        {t("still")} <span style={{color: '#3D9A85'}}> 3 </span> {t("hour")}
                    </div>
                </div>

                <div
                    className={s.araqum_item}
                    onClick={handleClick2}
                    id="express"
                    style={market_type === 'express' ? {background: '#fff', border: '1px solid #3D9A85'} : null}
                >
                    {market_type === "express" ? <Delivery with='25' height='25' fill='#3D9A85'/> :
                        <Delivery with='25' height='25' fill='rgba(33, 33, 33, 0.3)'/>}
                    <div className={s.araqum_text1}> {t("express")} </div>

                    <div className={s.araqum_text2}>
                        <span style={{color: '#3D9A85'}}> 25 </span> {t("minute")}
                    </div>
                </div>
            </div>

            <div className={s.slider}>
                <div className={s.slide_pics}>
                    <Swiper spaceBetween={0} slidesPerView={width / 360}>
                        {pictures?.map((item, id) => {  
                                                   
                            return (
                                <SwiperSlide key={item.id}>
                                    <div key={item.id} >

                                        <img src={item?.media?.big_image}
                                             className={s.slide_pic}/>
                                    </div>
                                </SwiperSlide>

                            )
                        })}
                    </Swiper>

                    <div className={s.dots}>
                                            {pictures.map((item, id1) => {
                                                if (0 == id1) {
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            className={s.dot}
                                                            style={{background: '#3D9A85'}}
                                                        ></div>
                                                    )
                                                } else {
                                                    return <div key={item.id} className={s.dot}></div>
                                                }
                                            })}
                            </div>
                   

                </div>
            </div>
            <Discounted_Products/>

            <div className={s.content} style={{background: '#F6F6F6'}}>
                <p className={s.header}> {t("new_arrivals")} </p>
                <p
                    className={s.textpoqr}
                    onClick={() => {
                        navigate(`/products/newproducts`)
                    }}
                >
                    {t("seeAll")}
                </p>
                <WithPreloaderHOC loading={loading} mobile>
                    <div className={s.contentbytype}>
                        <Swiper spaceBetween={0} slidesPerView={width / 190}>
                            {new_products?.map((item, id) => {
                                if (item.isnew) {
                                    return (
                                        <div key={item.id}>
                                            <SwiperSlide key={item.id}>
                                                <NavLink className={s.link} to={`/product/${item.id}`}>
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
                                            </SwiperSlide>
                                        </div>
                                    )
                                }
                            })}
                        </Swiper>
                    </div>
                </WithPreloaderHOC>
            </div>

            <div className={s.content}>
                <p className={s.header}> {t("brands")} </p>
                <p
                    className={s.textpoqr}
                    onClick={() => {
                        navigate(`/brands`)
                    }}
                >
                    {t("seeAll")}
                </p>
                <WithPreloaderHOC loading={loading} mobile>
                    <div className={s.contentbytype}>
                        <Swiper spaceBetween={0} slidesPerView={width / 140}>
                            {brands?.map((item, id) => {
                                return (
                                    <div key={item.id}>
                                        <SwiperSlide key={item.id}>
                                            <ItemBrand
                                                url={item.url}
                                                id={item.id}
                                                title={item.title}
                                            />
                                        </SwiperSlide>
                                    </div>
                                )
                            })}
                        </Swiper>
                    </div>
                </WithPreloaderHOC>
            </div>

            <div className={s.content}>
                <p className={s.header}> {t("recipes")} </p>
                <p
                    className={s.textpoqr}
                    onClick={() => {
                        navigate(`/recipes`)
                    }}
                >
                    {t("seeAll")}
                </p>
                <WithPreloaderHOC loading={loading} mobile>
                    <div className={s.contentbytype}>
                        <Swiper spaceBetween={0} slidesPerView={width / 260}>
                            {recipes?.map((item, id) => {
                                return (
                                    <div className={s.bslider} key={item.id}>
                                        <SwiperSlide key={item.id}>
                                            <NavLink className={s.link} to={`/recipe/${item.id}`}>
                                                <ItemBaghadratoms
                                                    url={item.url}
                                                    id={item.id}
                                                    title={item.title}
                                                    time={item.time}
                                                    rate={item.rate}
                                                    recipe_type={item.recipe_type}
                                                />
                                            </NavLink>
                                        </SwiperSlide>
                                    </div>
                                )
                            })}
                        </Swiper>
                    </div>
                </WithPreloaderHOC>
            </div>

            <div className={s.content}>
                <p className={s.header}> {t("sections")} </p>
                <p
                    className={s.textpoqr}
                    onClick={() => {
                        navigate(`/categories`)
                    }}
                >
                    {t("seeAll")}
                </p>
                <WithPreloaderHOC loading={loading} mobile>
                    <div className={s.contentbytype}>
                        <Swiper spaceBetween={0} slidesPerView={width / 160}>
                            {categories?.map((item, id) => {
                                return (
                                    <div key={item.id}>
                                        <SwiperSlide key={item.id}>
                                            <NavLink className={s.link} to={`/categories/${item.id}`}>
                                                <ItemCategory
                                                    title={item.title}
                                                    url={item.url}
                                                />
                                            </NavLink>
                                        </SwiperSlide>

                                    </div>
                                )
                            })}
                        </Swiper>
                    </div>
                </WithPreloaderHOC>
            </div>

            <div className={s.content}>
                <p className={s.header}> {t("bestseller")} </p>
                <p
                    className={s.textpoqr}
                    onClick={() => {
                        navigate(`/products/bestsellerproducts`)
                    }}
                >
                    {t("seeAll")}
                </p>
                <WithPreloaderHOC loading={loading} mobile>
                    <div className={s.contentbytype}>

                        <Swiper spaceBetween={0} slidesPerView={width / 190}>
                            {hit_products?.map((item, id) => {
                                if (item.ishit) {
                                    return (
                                        <div key={item.id}>
                                            <SwiperSlide key={item.id}>
                                                <NavLink className={s.link} to={`/product/${item.id}`}>
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
                                            </SwiperSlide>
                                        </div>
                                    )
                                }
                            })}
                        </Swiper>
                    </div>
                </WithPreloaderHOC>
            </div>
        </div>
    )
}

export default Home_Mobile
