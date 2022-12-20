import React, {useEffect, useState} from 'react'
import s from './index.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {
    getProductsByPar_Id,
    getNextPageData,
} from '../../redux/reducer'
import {useParams, NavLink, useNavigate} from 'react-router-dom'
import CategoryMenu from './CategoryMenu'
import Item_Product from '../ProductsByType/ProductsByType_Desktop/Item_Product'
import Select from '../Select'
import PageTitle from '../PageTitle/index'
import {useWindowSize} from '../../CustomHooks/getWindowWidth'
import {vector} from '../images'
import Item from './Item/index'
import {WithPreloaderHOC} from '../Hoc/withPreloader'
import Next_Page from './../Next_Page/index';
import {getCategories} from './../../redux/reducer';
import {useTranslation} from 'react-i18next';


function ProductsByCategory() {

        const {
        products, categoriesById, categories, category_title, loading,
        lang, next_page_url, delivery_type
    } = useSelector((state) => state.CategoryPage)

    const [height, width] = useWindowSize()
    const [title, setTitle] = useState('')
    const [iscategory, setIsCategory] = useState(true)
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categoryId, filterId, filter1Id} = useParams()


    useEffect(() => {
        dispatch(getCategories())
    }, [lang])

    useEffect(() => {
        if (categoriesById.length === 0) {
            setIsCategory(false)
        } else {
            setIsCategory(true)
        }
    }, [categoriesById, lang])


    useEffect(() => {
        if (!filterId) {
            dispatch(getProductsByPar_Id(categoryId, filter1Id))
        } else {
            dispatch(getProductsByPar_Id(filterId, filter1Id))
        }
    }, [filterId, lang, categoryId, filter1Id])

    const handleClick = () => {
        navigate(-1)
    }
    const handleLoadMore = () => {
        next_page_url && dispatch(getNextPageData(`${next_page_url}&filter_by_is_express=${delivery_type}&filter_by_main_filter=${filter1Id ? filter1Id : 'all'}&filter_by_product_type=all&category=${filterId ? filterId : categoryId}`))
    }

    if (width > 500) {
        return (
            <div className={s.Content}>
                <PageTitle title1={`${t("sections")}`} title2={category_title}
                           title3={(categoryId != filterId && +filterId) ? title : ''}/>


                {((title == '') || categoryId == filterId || !filterId) &&
                    <p className={s.text}> {category_title} </p>}

                {(filterId == undefined || categoryId == filterId) && 
                    <p className={s.text}>            
                 
                     {categories.find(item => item.id == categoryId)?.title}
                          
                    </p>}


                {categoriesById?.map((item, id) => {
                    return (
                        <div key={id}>
                            {item.cat_id == filterId && (
                                <p className={s.text}> {item.title} </p>
                            )}
                        </div>
                    )
                })}

                <CategoryMenu desktop iscategory={iscategory}/>

                <Select url={`/categories/${categoryId}/${filterId || categoryId}`}/>

                <WithPreloaderHOC loading={loading}>
                    <div className={s.box}>
                        {products?.length > 0 &&
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

                  {next_page_url &&  <Next_Page desktop handleLoadMore={handleLoadMore}/>}
                </div>
            </div>
        )
    } else {
        return (
            <div className={s.Content_mobile}>
                <img src={vector} className={s.vector} onClick={handleClick}/>

                {categoriesById?.map((item, id) => {
                    return (
                        <div key={id}>
                            {item.cat_id == filterId && (
                                <p className={s.text_mobile}> {item.title} </p>
                            )}
                        </div>
                    )
                })}
                {((title == '') || categoryId == filterId || !filterId) &&
                    <p className={s.text_mobile}> {category_title} </p>}

                {(filterId == undefined || categoryId == filterId) &&
                    <p className={s.text_mobile}>
                        {categories.find(item => item.id == categoryId)?.title}
                    </p>}

                <CategoryMenu mobile iscategory/>
                <WithPreloaderHOC loading={loading} mobile>
                    <div className={s.boxContent_mobile}>
                        {products?.length > 0 &&
                            products?.map((item, id) => {
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
                                )
                            })}


                    </div>
                    <div className={s.pagination}>
                    {next_page_url  &&   <button className={s.buttonMore_mobile} onClick={handleLoadMore}>
                            {t("seeMore")}
                        </button>}
                    </div>
                </WithPreloaderHOC>
            </div>
        )
    }
}

export default ProductsByCategory
