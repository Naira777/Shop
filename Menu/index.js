import React, {useEffect, useState, useRef} from "react";
import s from "./index.module.css";
import {
    menu,
    search,
    user,
    cart,
    user_white,
    cart_white,
    footervector,
    zambi,
    zambi_white,
} from "./../images";
import {useNavigate} from "react-router-dom";
import Menu_Dropdown from "./Menu_Dropdown/index";
import Popup_Menu from "./../Popup_Menu/index";
import Menu_Mobile from "./Menu_Mobile";
import {setSignup, setSignuporSignin} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import { getCategories, getCategoriesById, setCatName, setClickMenuDesktop, setClickSerach, setSearchText} from "../../redux/reducer";
import {ReactComponent as User} from "../../assets/user_in.svg";
import {ReactComponent as User1} from "../../assets/user_in1.svg";
import {NavLink, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Popup from "./../Popup/index";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";
import {setClickMenu} from "./../../redux/reducer";
import {setSignin} from './../../redux/usersReducer';




function Menu() {

    const {t} = useTranslation();
    const {search_text, clickMenuDesktop, clickMenu, click_search, lang, all_categories} = useSelector(
        (state) => state.CategoryPage
    );

    const data = [
        {
            to: "/products/newproducts",
            text: t("new_arrivals"),
            image: false,
            mode: ``,
        },

        {
            to: "/products/exclusiveproducts",
            text: t("exclusive"),
            image: false,
            mode: ``,
        },
        {
            to: "/products/discountproducts",
            text: t("sale"),
            image: false,
            mode: ``,
        },
        {
            to: "",
            onClick: handleClick1,
            id: "1",
            text: t("food"),
            image: true,
            mode: "mode1",
            vector: `1`,
        },

        {
            to: "",
            onClick: handleClick2,
            id: "451",
            text: t("for_home"),
            image: true,
            mode: "mode2",
            vector: `2`,
        },
        {
            to: "",
            onClick: handleClick3,
            id: "448",
            text: t("beauty_care"),
            image: true,
            mode: "mode3",
            vector: `3`,
        },
    ];


    
    const {filterId, categoryId, filterproducttype} = useParams();
    const dispatch = useDispatch();
    const [mode1, setMode1] = useState(false);
    const [mode2, setMode2] = useState(false);
    const [mode3, setMode3] = useState(false);
    const [search_t, setSearchT] = useState(search_text);
    const [id, setId] = useState("");
    const ref_vec1 = useRef(null);
    const ref_vec2 = useRef(null);
    const ref_vec3 = useRef(null);
    const [height, width] = useWindowSize();

    
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategoriesById())
    }, [lang])


    useEffect(() => {
        dispatch(getCategories())
    }, [lang])


    useEffect(() => {
        dispatch(setClickMenu(false));
    }, [window.location.href]);


    
    useEffect(() => {
        if(ref_vec1.current  ){
        ref_vec1.current.style.transform = "rotate(360deg)";
        }
        if(ref_vec2.current){
        ref_vec2.current.style.transform = "rotate(360deg)"
        }
        if(ref_vec3.current){
        ref_vec3.current.style.transform = "rotate(360deg)";
        }
        
        setMode1(false);
        setMode2(false);
        setMode3(false);

    }, [filterId, categoryId]);

    useEffect(() => {
        if (clickMenuDesktop && mode1) {
            ref_vec1.current.style.transform = "rotate(360deg)";
            setMode1(false);
            dispatch(setClickMenuDesktop(false));
        }

        if (clickMenuDesktop && mode2) {
            ref_vec2.current.style.transform = "rotate(360deg)";
            setMode2(false);
            dispatch(setClickMenuDesktop(false));
        }

        if (clickMenuDesktop && mode3) {
            ref_vec3.current.style.transform = "rotate(360deg)";
            setMode3(false);
            dispatch(setClickMenuDesktop(false));
        }
    }, [mode1, mode2, mode3, clickMenuDesktop]);

    const handleClickSign = () => {
        const token = localStorage.getItem("user");
        if (!token) {
            dispatch(setSignuporSignin(true));
        } else {
            navigate("/profile");
        }
    };



    function handleClick1(e) {

           
        if (mode1) {
            document.body.style.overflow = "visible";
        }
        setId(e.target.id);
        setMode1(!mode1);
        setMode2(false);
        setMode3(false);
        if (!mode1) {
            ref_vec1.current.style.transform = "rotate(180deg)";
            ref_vec2.current.style.transform = "rotate(360deg)";
            ref_vec3.current.style.transform = "rotate(360deg)";
        }
        if (mode1) {
            ref_vec1.current.style.transform = "rotate(360deg)";
        }
    }

    function handleClick2(e) {

        if (mode2) {
            document.body.style.overflow = "visible";
        }
        setId(e.target.id);
        setMode2(!mode2);
        setMode1(false);
        setMode3(false);
        if (!mode2) {
            ref_vec2.current.style.transform = "rotate(180deg)";
            ref_vec1.current.style.transform = "rotate(360deg)";
            ref_vec3.current.style.transform = "rotate(360deg)";
        }
        if (mode2) {
            ref_vec2.current.style.transform = "rotate(360deg)";
        }
    }

    function handleClick3(e) {
     

        if (mode3) {
            document.body.style.overflow = "visible";
        }
        setId(e.target.id);
        setMode3(!mode3);
        setMode1(false);
        setMode2(false);

        if (!mode3) {
            ref_vec3.current.style.transform = "rotate(180deg)";
            ref_vec2.current.style.transform = "rotate(360deg)";
            ref_vec1.current.style.transform = "rotate(360deg)";
        }
        if (mode3) {
            ref_vec3.current.style.transform = "rotate(360deg)";
        }
    }

    useEffect(() => {
        setMode3(false);
        setMode1(false);
        setMode2(false);
    }, [filterproducttype]);

    const handleClickMobile = () => {
        dispatch(setClickMenu(!clickMenu));
        if (clickMenu) {
            document.body.style.overflow = "visible";
        }
    };

    const handleClickCart = () => {
        navigate("/mycart");
        dispatch(setSignuporSignin(false))
        dispatch(setSignin(false))
        dispatch(setSignup(false))
    };

    const handleSearch = (e) => {
        setSearchT(e.target.value);
    };

    const handleSearchClick = (e) => {
        dispatch(setSearchText(search_t));
        navigate(`/search`);
    };

    const handleSearchClick_Menu = (e) => {
        dispatch(setClickSerach(!click_search))

    };

    const handleSearchClick_M = (e) => {

        dispatch(setSearchText(search_t));
        dispatch(setClickSerach(!click_search))
        navigate(`/search`);
        setSearchT('')

    };

    useEffect(() => {
        if (window.location.pathname.slice(0, 7) == '/search') {
        }
        if (window.location.pathname.slice(0, 7) !== '/search') {
            dispatch(setSearchText(''))
            setSearchT('')
        }
    }, [window.location.pathname]);

    useEffect(() => {
        click_search && document.getElementById("input1").focus()
    }, [click_search])

    const navigateHome = () => {
        dispatch(setSignuporSignin(false))
        dispatch(setSignin(false))
        dispatch(setSignup(false))
        navigate('/home')

    }
 
    return (
        <>
            <div className={s.menu}>
                <img src={menu} className={s.menu_M} onClick={handleClickMobile}/>
                {width < 700 && <img src={zambi} className={s.zambi} onClick={navigateHome}/>}
                {width > 700 && <img src={zambi_white} className={s.zambi_white} onClick={() => navigate('/home')}/>}
                {clickMenu && <Menu_Mobile  />}
                {click_search && (
                    <Popup mode1={true} mobile>
                        <img
                            src={search}
                            className={s.search_input}
                            onClick={handleSearchClick_M}
                        />
                        <input
                            type='text'
                            id='input1'
                            value={search_t}
                            className={s.input_M}
                            onChange={handleSearch}
                        />
                    </Popup>
                )}

                <div className={s.search_main_box}>
                    <div className={s.search_box} onClick={handleSearchClick}><img className={s.search} src={search}/>
                    </div>
                    <input
                        className={s.input}
                        placeholder={t("search")}
                        value={search_t}
                        onChange={handleSearch}
                    />
                </div>

                <div className={s.box}>
                    <div className={s.icon_box} onClick={handleClickSign}>
                        <img src={user_white} className={s.icons_white}/>
                        {localStorage.getItem("user") && (
                            <p className={s.icon_text}>
                                {localStorage.getItem("user") && `${t("profile")}`}
                            </p>
                        )}
                        {!localStorage.getItem("user") && (
                            <p className={s.icon_text}>
                                {!localStorage.getItem("user") && `${t("signIn")}`}
                            </p>
                        )}
                        <div className={s.icon_user}>
                            {localStorage.getItem("user") && <User/>}
                        </div>
                    </div>

                    <div className={s.icon_box} onClick={handleClickCart}>
                        <img src={cart_white} className={s.icons_white}/>
                        <p className={s.icon_text}>{t("cart")}</p>
                    </div>
                    <div className={s.icons_M}>
                        <img
                            src={search}
                            className={s.icons}
                            onClick={handleSearchClick_Menu}
                        />
                        <img src={user} className={s.icons} onClick={handleClickSign}/>

                        <div className={s.icon_user_M}>
                            {localStorage.getItem("user") && <User1/>}
                        </div>

                        <img src={cart} className={s.icons} onClick={handleClickCart}/>
                    </div>
                </div>
            </div>

            <div className={s.navbar_desktop}>
                <div className={s.links}>
                    {data.map((item, index) => {
                        if (index < 3) {
                            return (
                                <NavLink
                                    key={index}
                                    className={s.navlink}
                                    to={item.to}
                                    style={({isActive}) => ({
                                        background: isActive ? "#F6F6F6" : "#ffffff",
                                    })}
                                >
                                    {item.text}
                                </NavLink>
                            );
                                }})}
                        {all_categories?.map((item,index) => {
                           
                          if(index === 0){
                            return(
                           <div className={s.boxLink} key={index}>
                        
                                    <NavLink
                                        className={s.navlink}
                                        to=''
                                        onClick={handleClick1}
                                        id={item.translation?.product_category_id}

                                    >
                                       {item.translation?.title}                                       
                                            <img
                                                src={footervector}
                                                className={s.vector}
                                                ref={ref_vec1}                                               
                                                
                                            />                                        
                                    </NavLink>

                                    {mode1 && (
                                        <Popup_Menu mode={true}>
                                            <Menu_Dropdown cat_id={id} mode1/>
                                        </Popup_Menu>
                                    )}

                                    
                                </div>

                            )}

                            if(index === 1){
                                return(
                               <div className={s.boxLink} key={index}>
                            
                                        <NavLink
                                            className={s.navlink}
                                            to=''
                                            onClick={(e)=>handleClick2(e)}
                                            id={item.translation?.product_category_id}
                                        >
                                          {item.translation?.title}                                       
                                                <img
                                                    src={footervector}
                                                    className={s.vector}
                                                    ref={ref_vec2}                                                                                                               

                                                />
                                            
                                        </NavLink>
    
                                        {mode2 && (
                                            <Popup_Menu mode={true}>
                                                <Menu_Dropdown cat_id={id} mode2/>
                                            </Popup_Menu>
                                        )}    
                                  
                                    </div>
    
                                )}
                                if(index === 2){
                                    return(
                                   <div className={s.boxLink} key={index}>
                                
                                            <NavLink
                                                className={s.navlink}
                                                to=''
                                                onClick={(e)=>handleClick3(e)}
                                                id={item.translation?.product_category_id}
                                            >
                                                {item.translation?.title}                                       
                                                    <img
                                                        src={footervector}
                                                        className={s.vector}
                                                        ref={ref_vec3}
                                                            
                                                    />                                                
                                            </NavLink>
        
                                            
                                            {mode3 && (
                                                <Popup_Menu mode={true}>
                                                    <Menu_Dropdown cat_id={id} mode3/>
                                                </Popup_Menu>
                                            )}
        
                                         
                                        </div>
        
                                    )}



                        })}            
                                             
                                            
                  
                </div>
            </div>
        </>
    );
}

export default Menu;


   