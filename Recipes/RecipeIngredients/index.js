import React from "react";
import s from "./index.module.css";
import {vector, filter} from "../../images";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRecipeProductsByCategory} from "../../../redux/recipesReducer";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import Select_Mobile from "./../../Select_Mobile/index";
import PageTitle from "./../../PageTitle/index";
import {useWindowSize} from "./../../../CustomHooks/getWindowWidth";
import Select from "../../Select";
import Item_Product from "../../ProductsByType/ProductsByType_Desktop/Item_Product";
import Item_Category from "./../../ProductsByType/ProductsByType_Desktop/Item_Category/index";
import {Swiper, SwiperSlide} from "swiper/react";
import CategoryMenu from "./../../ProductsByType/ProductsByType_Mobile/CategoryMenu/index";
import {getCategories, setClickSelect} from "../../../redux/reducer";
import {
    getRecipeDesc,

} from "./../../../redux/recipesReducer";
import {WithPreloaderHOC} from "./../../Hoc/withPreloader";
import Item from "../../ProductsByCategory/Item";
import {useTranslation} from 'react-i18next';

function RecipeIngredients() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {recipe_products, loading, recipe} = useSelector(
        (state) => state.RecipesPage
    );
    const {categories, lang, click_select} = useSelector((state) => state.CategoryPage);
    const [height, width] = useWindowSize();
    const {filtertype, filtertype1, filtertype2} = useParams();


    useEffect(() => {   
               dispatch(
                getRecipeProductsByCategory(filtertype, filtertype1, filtertype2)
            );
        
    }, [filtertype, filtertype1, filtertype2, lang]);

    useEffect(() => {
        dispatch(getRecipeDesc(filtertype));
    }, [filtertype]);

    const handleClick = () => {
        navigate(-1);
    };
    useEffect(() => {
        dispatch(getCategories());
    }, [lang]);

    useEffect(() => {
        dispatch(setClickSelect(false))
    }, [filtertype2]);

    // const handleLoadMore = () => {
    //   next_page_url &&
    //     dispatch(
    //       getNextPageData(
    //         `${next_page_url}?category=${filtertype1}&filter_by_main_filter=${filtertype2}`
    //       )
    //     );
    // };

    if (width < 500) {
        return (
            <div className={s.Content_mobile}>
                <img src={vector} className={s.vector} onClick={handleClick}/>
                <p className={s.header}> {t("ingredients")} </p>

                <CategoryMenu mobile url={`/recipe/ingredients/${filtertype}`}/>
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
                    url={`/recipe/ingredients/${filtertype}/${
                        filtertype1 ? filtertype1 : "all"
                    }`}
                    isclick={click_select}
                />

                <div className={s.boxContent_mobile}>
                    <WithPreloaderHOC loading={loading} mobile>
                        {recipe_products?.map((item, id) => {
                            return (
                                <div key={item.id}>
                                    <NavLink className={s.link} to={`/product/${id}`}>
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
                    </WithPreloaderHOC>


                    {/* <Next_Page mobile handleLoadMore={handleLoadMore} /> */}
                </div>
            </div>
        );
    } else {
        return (
            <div className={s.Content}>
                <PageTitle
                    title1={`${t("recipes")}`}
                    title2={recipe.title}
                    title3={`${t("ingredients")}`}
                />

                <p className={s.title_D}> {t("ingredients")} </p>

                <div className={s.category_items}>
                    <Swiper spaceBetween={0} slidesPerView={width / 220}>
                        <SwiperSlide>
                            <NavLink
                                className={s.link}
                                to={`/recipe/ingredients/${filtertype}/${`all`}`}
                            >
                                <Item_Category
                                    all
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
                                        to={`/recipe/ingredients/${filtertype}/${item.id}`}
                                    >
                                        <Item_Category title={item.title} url={item.url}/>
                                    </NavLink>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                <Select
                    url={`/recipe/ingredients/${filtertype}/${
                        filtertype1 ? filtertype1 : "all"
                    }`}
                />

                <WithPreloaderHOC loading={loading}>
                    <div className={s.box_D}>
                        {recipe_products?.map((item, id) => {
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
                            );
                        })}
                    </div>
                </WithPreloaderHOC>

                {/* <Next_Page desktop handleLoadMore={handleLoadMore} /> */}
            </div>
        );
    }
}

export default RecipeIngredients;
