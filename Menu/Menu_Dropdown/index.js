import React, {useEffect, useState, useRef} from 'react'
import s from './index.module.css'
import {slaq1} from '../../images'
import {useNavigate} from 'react-router-dom'
import {
    getCategories,
    getCategoriesById,
    changeCategoryIdes,
} from '../../../redux/reducer'
import {useSelector, useDispatch} from 'react-redux'
import {getCategoriesByid} from '../../../utils'




function Menu_Dropdown({cat_id, mode1, mode2, mode3}) {

    const [catId, setCatId] = useState('')
    const ref_menu1 = useRef(null)
    const ref_menu2 = useRef(null)
    const {categories, lang, categoryList, categoriesById, all_categories} = useSelector((state) => state.CategoryPage)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getCategoriesById())
    }, [lang])

    useEffect(() => {
        dispatch(getCategories())
    }, [lang])

    useEffect(() => {
        dispatch(changeCategoryIdes(getCategoriesByid(categoryList, catId)))
    }, [catId, categoryList])

    const handleHover = (e) => {
        setCatId(e.target.id)

    }
    const handleClickCategory = (e) => {
        setCatId(e.target.id)
        navigate(`/categories/${e.target.id}`)
        if (ref_menu2.current && ref_menu1.current) {
            ref_menu1.current.style.display = 'none'
            ref_menu2.current.style.display = 'none'
        }

    }
    const handleClickCategory1 = (e) => {
        document.body.style.overflow = 'visible'
        navigate(`/categories/${cat_id}/${e.target.id}`)
        if (ref_menu2.current && ref_menu1.current ) {
            ref_menu2.current.style.display = 'none'
            ref_menu1.current.style.display = 'none'
        }
    }
    const handleClickCategoryFilter = (e) => {
        navigate(`/categories/${catId}/${e.target.id}`)
        document.body.style.overflow = 'visible'
        if (ref_menu2.current && ref_menu1.current) {
            ref_menu1.current.style.display = 'none'
            ref_menu2.current.style.display = 'none'
        }
    }

    if (mode1) {
        return (
            <div className={s.main} ref={ref_menu1}>
                <div className={s.box1}>
                    {categories?.map((item, id) => {

                        if (item.par_id == cat_id) {

                            return (
                                <div
                                    className={s.row}
                                    key={item.id}
                                    onMouseOver={handleHover}
                                    onClick={handleClickCategory}
                                    id={item.id}
                                >
                                    <div
                                        className={s.row_inner}
                                        onMouseOver={handleHover}
                                        id={item.id}
                                    >
                                        <div onMouseOver={handleHover} id={item.id}>
                                            <img
                                                src={item.url}
                                                className={s.pic}
                                                onMouseOver={handleHover}
                                                id={item.id}
                                            />
                                        </div>

                                        <p
                                            className={s.title}
                                            onMouseOver={handleHover}
                                            id={item.id}
                                        >

                                            {item.title}
                                        </p>
                                    </div>

                                    <img
                                        src={slaq1}
                                        className={s.slaq}
                                        onMouseOver={handleHover}
                                        id={item.id}
                                    />
                                </div>
                            )
                        }
                    })}
                </div>

                <div className={s.box2}>
                      {categoriesById?.map((item, id) => {
                        return (
                            <p
                                className={s.title_cat}
                                key={id}
                                onClick={handleClickCategoryFilter}
                                id={item.cat_id}
                            >
                                {item.title}
                            </p>
                        )
                    })}
                </div>
            </div>
        )
    } else if (mode2 || mode3) {
        return (
            <div

                className={s.main}
                ref={ref_menu2}

            >
                <div className={s.box5}>
               
                    {all_categories?.find(item=> item.id == cat_id).children.map((item1, index) => {
                            
                            return (
                                <p
                                    className={s.title_cat}
                                    key={index}
                                    onClick={handleClickCategory1}
                                    id={item1.id}
                                >
                                    {item1.translation?.title}
                                </p>
                            )



                         
                            
                         
                        
                    })}
                </div>
            </div>
        )
    }
}

export default Menu_Dropdown
