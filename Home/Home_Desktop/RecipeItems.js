import React from "react";
import s from "./index.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {getRecipes} from "../../../redux/recipesReducer";
import Item_Desktop from '../../Recipes/Item_Desktop/index';
import { useWindowSize } from "../../../CustomHooks/getWindowWidth";
import { useTranslation } from 'react-i18next';
import { WithPreloaderHOC } from '../../Hoc/withPreloader';


function Recipe_Items() {
    const [height, width] = useWindowSize(); 
    const { t } = useTranslation();
    const {recipes, loading, lang} = useSelector((state) => state.RecipesPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRecipes());
    }, [lang]);

    const settings = {
        navigation: {
            nextEl: `.${s.swiper_button_next4}`,
            prevEl: `.${s.swiper_button_prev4}`,
        },
        modules: [Navigation],
    
    };

    return (
        
        <div className={s.content_outer1}>
            <div className={s.texts}>
                <p className={s.header}>  {t("recipes")} </p>
                <p
                    className={s.text_small}
                    onClick={() => {
                        navigate("/recipes");
                    }}
                >
                    {t("seeAll")} 
                </p>
            </div>
            <WithPreloaderHOC loading={loading}>
            <div className={s.content1_wrapper}>
                <div className={s.swiper_button_prev4}/>

                <div className={s.content1}>

                    <Swiper {...settings} spaceBetween={0} slidesPerView={width/510}  >
                        {recipes.map((item, id) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <NavLink
                                    key={item.id}
                                        className={s.link}
                                        to={`/recipe/${item.id}`}
                                    >
                                        <Item_Desktop 
                                        url={item.url}
                                        id={item.id} 
                                        title={item.title}
                                        time={item.time}
                                        rate={item.rate}
                                        recipe_type={item.recipe_type}/>


                                    </NavLink>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className={s.swiper_button_next4}/>
            </div>
            </WithPreloaderHOC>
        </div>
    );
}

export default Recipe_Items;
