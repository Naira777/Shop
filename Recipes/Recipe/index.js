import React, {useState} from "react";
import s from "./index.module.css";
import vector from "../../../assets/vector.png";
import star1 from "../../../assets/star1.png";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRecipeDesc} from "../../../redux/recipesReducer";
import {clock, fire} from '../../images'
import {useNavigate, useParams, NavLink} from "react-router-dom";
import {useWindowSize} from "./../../../CustomHooks/getWindowWidth";
import PageTitle from "./../../PageTitle/index";
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import {useTranslation} from 'react-i18next';

function Recipe() {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {recipe, loading} = useSelector((state) => state.RecipesPage);
    const {lang} = useSelector((state) => state.CategoryPage);
    const [mode, setMode] = useState(true);
    const {filtertype} = useParams();
    const navigate = useNavigate();
    const [height, width] = useWindowSize();


    useEffect(() => {
        dispatch(getRecipeDesc(filtertype));
    }, [filtertype, lang]);

    const handleClick = (text) => {
        if(text === 'ing'){

            setMode(true);
        }
      if(text === 'process'){
        setMode(false);
      }
    };

    if (width < 500) {
        return (
            <WithPreloaderHOC loading={loading} mobile>
                <div className={s.main}>
                    <img src={vector} className={s.vector} onClick={() => navigate(-1)}/>
                    <img src={recipe.url} className={s.pic}/>
                    <p className={s.header}> {recipe.title}</p>
                    <p className={s.text}>{recipe.desc}</p>

                    <div className={s.box}>
                        <img src={star1} className={s.star}/>
                        <p className={s.rate}>{recipe.rate}</p>
                        <div className={s.row}>
                            <img src={clock} className={s.clock}/>
                            <p className={s.time}>{recipe.time} {t("minute")}</p>
                        </div>
                        <div className={s.row}>
                            <img src={fire} className={s.fire}/>
                            <p className={s.time}> {recipe.recipe_type} </p>
                        </div>
                    </div>
                    <div className={s.Box}>
                        <button
                            className={s.button1}
                            style={mode ? {background: "#3D9A85", color: "#FEFFFE"} : null}
                            onClick={()=>handleClick('ing')}
                        >
                            {t("ingredients")}
                        </button>
                        <button
                            className={s.button1}
                            style={!mode ? {background: "#3D9A85", color: "#FEFFFE"} : null}
                            onClick={()=>handleClick('process')}
                        >

                            {t("recipe")}
                        </button>
                    </div>
                    {mode && (
                        <ul>
                            {recipe.ingredients?.map((item, id) => {
                                return <li key={id}>{item}</li>;
                            })}
                        </ul>
                    )}
                    {!mode && <p className={s.text_process}> {recipe.process} </p>}

                    <NavLink to={`/recipe/ingredients/${recipe.id}`} className={s.link}>
                        {t("buy_ing")}
                    </NavLink>
                </div>
            </WithPreloaderHOC>
        );
    } else {
        return (
            <WithPreloaderHOC loading={loading}>
                <div className={s.main_D}>
                    <PageTitle title1={`${t("recipes")}`} title2={recipe.title}/>

                    <div className={s.boxAll}>
                        <div className={s.boxLeft}>
                            <div className={s.boxPic}>
                                <img src={recipe.url} className={s.pic_D}/>

                            </div>

                        </div>
                        <div className={s.boxRight}>
                            <p className={s.header_D}>{recipe.title} </p>

                            <p className={s.desc_D}>{recipe.desc} </p>

                            <div className={s.box_D}>
                                <div className={s.row}>
                                    <img src={star1} className={s.star}/>
                                    <p className={s.rate}>{recipe.rate}</p>
                                </div>

                                <div className={s.row}>
                                    <img src={clock} className={s.clock}/>
                                    <p className={s.time}>{recipe.time} {t("minute")}</p>
                                </div>

                                <div className={s.row}>
                                    <img src={fire} className={s.fire}/>
                                    <p className={s.time}> {recipe.recipe_type} </p>
                                </div>
                            </div>

                            <div className={s.Box}>
                                <button
                                    className={s.button1_D}
                                    style={
                                        mode ? {background: "#3D9A85", color: "#FEFFFE"} : null
                                    }
                                    onClick={()=>handleClick('ing')}
                                >
                                    {t("ingredients")}
                                </button>
                                <button
                                    className={s.button1_D}
                                    style={
                                        !mode ? {background: "#3D9A85", color: "#FEFFFE"} : null
                                    }
                                    onClick={()=>handleClick('process')}
                                >

                                    {t("recipe")}
                                </button>
                            </div>

                            {mode && (
                                <ul>
                                    {recipe.ingredients?.map((item, id) => {
                                        return <li key={id}>{item}</li>;
                                    })}
                                </ul>
                            )}

                            {!mode && <p className={s.text_process}> {recipe.process} </p>}

                            <NavLink
                                to={`/recipe/ingredients/${recipe.id}`}
                                className={s.link_D}
                            >
                                {t("buy_ing")}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </WithPreloaderHOC>
        );
    }
}

export default Recipe;
