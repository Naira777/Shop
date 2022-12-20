import React from 'react'
import s from './index.module.css'
import {vector} from '../images'
import Menu from './Menu/index'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {
    getRecipesByCategory,
    getRecipesCategories,
    getRecipes,
} from '../../redux/recipesReducer'
import ItemRecipe from './Item/index'
import {useNavigate, NavLink, useParams} from 'react-router-dom'
import {useWindowSize} from './../../CustomHooks/getWindowWidth'
import Item_Desktop from './Item_Desktop/index'
import {WithPreloaderHOC} from './../Hoc/withPreloader'
import {useTranslation} from 'react-i18next';

function Recipes() {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const {lang} = useSelector((state) => state.CategoryPage)
    const {loading, recipes, recipesCategories} = useSelector((state) => state.RecipesPage)
    const [height, width] = useWindowSize()
    const {filtertype} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (filtertype != 'all' && filtertype != undefined) {
            dispatch(getRecipesByCategory(filtertype))
        } else if (filtertype === 'all' && filtertype != undefined) {
            dispatch(getRecipes())
        }
    }, [filtertype, lang])

    useEffect(() => {
        dispatch(getRecipesCategories())
        dispatch(getRecipes())
    }, [lang])

    const handleClick = () => {
        navigate(-1)
    }

    if (width < 500) {
        return (
            <div className={s.main}>
                <img src={vector} className={s.vector} onClick={handleClick}/>
                <p className={s.header}> {t("recipes")} </p>
                <div className={s.menu}>
                    <Menu cat_id={'all'} title={`${t("all")}`} all/>

                    {recipesCategories.map((item, id) => {
                        return <Menu cat_id={item.cat_id} title={item.title} key={id}/>
                    })}
                </div>

                <WithPreloaderHOC loading={loading} mobile>
                    {recipes?.map((item, id) => {
                        return (
                            <div key={id}>
                                <NavLink to={`/recipe/${item.id}`} className={s.link}>
                                    <ItemRecipe
                                        title={item.title}
                                        url={item.url}
                                        rate={item.rate}
                                        time={item.time}
                                        recipe_type={item.recipe_type}
                                        id={item.id}
                                    />
                                </NavLink>
                            </div>
                        )
                    })}
                </WithPreloaderHOC>


            </div>
        )
    } else {
        return (
            <div className={s.main_M}>
                <p className={s.header_small}>{t("recipes")}</p>
                <p className={s.header_M}>{t("recipes")}</p>

                <div className={s.menu_M}>

                    <Menu desktop cat_id={'all'} title={`${t("all")}`} all/>

                    {recipesCategories?.map((item, id) => {
                        return (
                            <Menu desktop cat_id={item.cat_id} title={item.title} key={id}/>
                        )
                    })}
                </div>

                <WithPreloaderHOC loading={loading}>
                    <div className={s.content_Desktop}>
                        {recipes?.map((item, id) => {
                            return (
                                <div key={id}>
                                    <NavLink to={`/recipe/${item.id}`} className={s.link}>
                                        <Item_Desktop
                                            title={item.title}
                                            url={item.url}
                                            rate={item.rate}
                                            time={item.time}
                                            recipe_type={item.recipe_type}
                                            id={item.id}
                                        />
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
                </WithPreloaderHOC>
            </div>
        )
    }
}

export default Recipes
