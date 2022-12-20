import React, {useEffect} from 'react'
import s from './index.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import Item_Category from './Item_Category/index'
import Item_Product from './Item_Product'
import {
    getCategories,
    getDiscountedProducts,
    getNextPageData,
    getProductsByType,
} from './../../../redux/reducer'
import {Swiper, SwiperSlide} from 'swiper/react'
import Select from '../../Select'
import {useWindowSize} from '../../../CustomHooks/getWindowWidth'
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import {useTranslation} from 'react-i18next';
import Next_Page from './../../Next_Page/index';


function ProductsByType_Desktop() {

    const {
        products,
        categories,
        lang,
        next_page_url,
        delivery_type,
        loading
    } = useSelector((state) => state.CategoryPage)
    const dispatch = useDispatch()
    const {t} = useTranslation();


    const [height, width] = useWindowSize();
    const token = localStorage.getItem('user')

    const {filterproducttype, filtertype, filtertype1} = useParams()


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

    useEffect(() => {
        dispatch(getCategories())
    }, [filtertype, lang])


    const handleLoadMore = () => {


        if (filterproducttype === 'exclusiveproducts') {

            next_page_url && dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=${delivery_type}&filter_by_product_type=exclusive&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
        }
        if (filterproducttype === 'newproducts') {
            next_page_url && dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=${delivery_type}&filter_by_product_type=new&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
        }
        if (filterproducttype === 'discountproducts') {
            next_page_url && dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=${delivery_type}&filter_by_product_type=all&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
        }
       if (filterproducttype === 'bestsellerproducts') {
            next_page_url && dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=${delivery_type}&filter_by_product_type=all&filter_by_main_filter=${filtertype1 ? filtertype1 : 'all'}&category=${filtertype ? filtertype : 'all'}`))
        }

    }


    return (

        <div className={s.boxAll}>

            <p className={s.textpoqr}>{filterproducttype === 'bestsellerproducts' && `${t("bestseller")}`}</p>
            <p className={s.textpoqr}>{filterproducttype === 'newproducts' && `${t("new_arrivals")}`}</p>
            <p className={s.textpoqr}>{filterproducttype === 'exclusiveproducts' && `${t("exclusive")}`}</p>
            <p className={s.textpoqr}>{filterproducttype == 'discountproducts' && `${t("sale")}`}</p>


            <p className={s.text}>{filterproducttype === 'bestsellerproducts' && `${t("bestseller")}`}</p>
            <p className={s.text}>{filterproducttype === 'newproducts' && `${t("new_arrivals")}`}</p>
            <p className={s.text}>{filterproducttype === 'exclusiveproducts' && `${t("exclusive")}`}</p>
            <p className={s.text}>{filterproducttype === 'discountproducts' && `${t("sale")}`}</p>


            <div className={s.category_items}>


                <Swiper spaceBetween={0} slidesPerView={width / 230}>
                    <SwiperSlide>
                        <NavLink
                            className={s.link}
                            to={`/products/${filterproducttype}/${`all`}`}
                        >
                            <Item_Category all
                                           title={`${t("all")}`}
                                           url={`https://www.gofrugal.com/blog/wp-content/uploads/supermarket-small.jpg`}
                            />
                        </NavLink>
                    </SwiperSlide>
                    {categories.map((item, id) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <NavLink
                                    className={s.link}
                                    to={`/products/${filterproducttype}/${item.id}`}
                                >
                                    <Item_Category title={item.title} url={item.url}/>
                                </NavLink>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <Select url={`/products/${filterproducttype}/${filtertype || 'all'}`}/>

            <WithPreloaderHOC loading={loading}>
                <div className={s.boxContent}>
                    {products.length > 0 &&
                        products.map((item, id) => {
                            return (
                                <NavLink className={s.link} to={`/product/${item.id}`} key={id}>
                                    <Item_Product
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
                            )
                        })}
                </div>
            </WithPreloaderHOC>
            <div className={s.pagination}>
            {next_page_url  &&   <Next_Page desktop handleLoadMore={handleLoadMore}/>}
            </div>
        </div>
    )
}

export default ProductsByType_Desktop
