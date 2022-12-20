import React, {useEffect} from "react";
import s from "./index.module.css";
import vector from "../../assets/vector.png";
import sign from "../../assets/sign.png";
import imageDelivery from "../../assets/imageDelivery.png";
import {useNavigate, NavLink} from "react-router-dom";
import delivery from "../../assets/delivery.png";
import note from "../../assets/note.png";
import notebook from "../../assets/notebook.png";
import box from "../../assets/box.png";
import avto from "../../assets/avto.png";
import inputbutton from "../../assets/inputbutton.png";
import {useSelector, useDispatch} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Navigation, Pagination, Scrollbar, A11y} from "swiper";
import ItemBrand from "./../Home/Home_Mobile/ItemBrand";
import {getBrands, getReviews} from "../../redux/reducer";
import {useState, useRef} from "react";
import {I, OK, VK, Y, f} from "../images";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";
import PageTitle from "./../PageTitle/index";
import about1 from "../../assets/about1.png";
import about2 from "../../assets/about2.png";
import about3 from "../../assets/about3.png";
import about4 from "../../assets/about4.png";
import Brand_Item from "./../Home/Home_Desktop/Brand_Item/index";
import {sendEmail} from './../../redux/usersReducer'
import {getJobs} from "./../../redux/reducer";
import {useTranslation} from "react-i18next";
import {getFeedback} from "../../redux/careersReducer";


const AboutUs = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {brands, lang, jobs} = useSelector((state) => state.CategoryPage);
    const {errors, isEmail} = useSelector((state) => state.UsersPage);
    const {feedback} = useSelector((state) => state.CareersPage);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [height, width] = useWindowSize();
    const [isSend, setIsSend] = useState(false);
    const brandRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const jobRef = useRef(null);
    const reviewRef = useRef(null);
    const aboutWorkRef = useRef(null);
    const advRef = useRef(null);

    const handleNavigate = (text) => {
        text === "contact" && contactRef.current.scrollIntoView({behavior: "smooth"});
        text === "about" && aboutRef.current?.scrollIntoView({behavior: "smooth"});
        text === "job" && jobRef.current?.scrollIntoView({behavior: "smooth"});
        text === "review" && reviewRef.current?.scrollIntoView({behavior: "smooth"});
        text === "aboutWork" && aboutWorkRef.current?.scrollIntoView({behavior: "smooth"});
        text === "adv" && advRef.current?.scrollIntoView({behavior: "smooth"});
        text === "brand" && brandRef.current?.scrollIntoView({behavior: "smooth"});
        clickColorChange(text);
    };
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const clickColorChange = (id) => {
        if (id) {
            document.getElementById(`${id}`).style.background = "#3D9A85";
            document.getElementById(`${id}`).style.color = "#fff";
        }
        if (id != 'about' && document.getElementById(`about`)) {
            document.getElementById(`about`).style.background = "#f6f6f6";
            document.getElementById(`about`).style.color = "black";
        }
        if (id != 'adv' && document.getElementById(`adv`)) {
            document.getElementById(`adv`).style.background = `#f6f6f6`;
            document.getElementById(`adv`).style.color = "black";
        }
        if (id != 'brand' && document.getElementById(`brand`)) {
            document.getElementById(`brand`).style.background = "#f6f6f6";
            document.getElementById(`brand`).style.color = "black";
        }
        if (id != 'aboutWork' && document.getElementById(`aboutWork`)) {
            document.getElementById(`aboutWork`).style.background = "#f6f6f6";
            document.getElementById(`aboutWork`).style.color = "black";
        }

        if (id != 'review' && document.getElementById(`review`)) {
            document.getElementById(`review`).style.background = "#f6f6f6";
            document.getElementById(`review`).style.color = "black";
        }
        if (id != 'job' && document.getElementById(`job`)) {
            document.getElementById(`job`).style.background = "#f6f6f6";
            document.getElementById(`job`).style.color = "black";
        }
        if (id != 'contact' && document.getElementById(`contact`)) {
            document.getElementById(`contact`).style.background = "#f6f6f6";
            document.getElementById(`contact`).style.color = "black";
        }

    };
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getJobs());
        dispatch(getReviews());
        dispatch(getFeedback());
    }, []);

    const SendEmail = () => {

        dispatch(sendEmail(email))

    }
    useEffect(() => {
        if (isEmail) {
            setEmail('')
        }

    }, [isEmail])


    if (width < 500) {
        return (<div className={s.main}>
                <img
                    src={vector}
                    className={s.vector}
                    alt="pic"
                    onClick={() => {
                        navigate(-1);
                    }}
                />
                <div className={s.delivery1}>
                    <div className={s.delivery_item1}>
                        <img src={delivery} className={s.delivery_pic1}/>
                        <div className={s.delivery_text11}>{t("text8")}</div>
                        <div className={s.delivery_text21}>
                            <span style={{color: "#3D9A85", fontWeight: "600"}}> 25 </span>{" "}
                            {t("mins")}
                        </div>
                    </div>

                    <div className={s.deliveryBox}>
                        <img className={s.cyclePic} src={imageDelivery}/>
                    </div>
                </div>

                <div className={s.menu}>
                    <div className={s.content}>
                        <div
                            id="about"
                            onClick={() => handleNavigate("about")}
                            className={s.link1}
                        >
                            {t("about")}
                        </div>

                        <div
                            id="adv"
                            onClick={() => handleNavigate("adv")}
                            className={s.link}
                        >
                            {t("adv")}
                        </div>

                        <div
                            id="aboutWork"
                            onClick={() => handleNavigate("aboutWork")}
                            className={s.link}
                        >
                            {t("what_do")}
                        </div>

                        <div
                            id="brand"
                            onClick={() => handleNavigate("brand")}
                            className={s.link}
                        >
                            {t("brands")}
                        </div>
                        <NavLink
                            to="/products/discountproducts"
                            className={s.link}
                            style={({isActive}) => ({
                                color: isActive ? "#fff" : "#545e6f", background: isActive ? "#3D9A85" : "#f0f0f0",
                            })}
                        >
                            {t("sale")}
                        </NavLink>

                        <div
                            id="review"
                            onClick={() => handleNavigate("review")}
                            className={s.link}
                        >
                            {t("review")}
                        </div>

                        <div
                            onClick={() => handleNavigate("job")}
                            id="job"
                            className={s.link}
                        >
                            {t("work")}
                        </div>

                    </div>
                </div>
                <div ref={aboutWorkRef}>
                    <p className={s.header}>{t("about")} </p>

                    <p className={s.text_M}>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                        sint. Velit officia consequat duis enim. Amet minim mollit non
                        deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                        consequat duis enim. Amet minim mollit non deserunt ullamco est sit
                        aliqua dolor do amet sint. Velit officia consequat duis enim.
                    </p>

                    <img
                        src={"https://149355055.v2.pressablecdn.com/wp-content/uploads/2014/09/auburncurbmarket-alt2-736x414.jpg"}
                        className={s.picbig}
                    />
                </div>

                <div className={s.boxAdv}>
                    <p ref={advRef} className={s.header}>
                        {t("adv")}
                    </p>
                </div>

                <div className={s.boxAdv}>
                    <div className={s.box}>
                        <img src={note} className={s.note}/>

                        <p className={s.text_note}>{t("del")}</p>
                    </div>
                    <div className={s.box}>
                        <img src={note} className={s.note}/>

                        <p className={s.text_note}>{t("low_price")}</p>
                    </div>

                    <div className={s.box}>
                        <img src={note} className={s.note}/>

                        <p className={s.text_note}>{t("text1")}</p>
                    </div>
                    <div className={s.box}>
                        <img src={note} className={s.note}/>

                        <p className={s.text_note}>{t("text2")}</p>
                    </div>

                    <div className={s.box}>
                        <img src={note} className={s.note}/>

                        <p className={s.text_note}>{t("text3")}</p>
                    </div>

                    <div className={s.box}>
                        <img src={note} className={s.note}/>

                        <p className={s.text_note}>{t("text4")}</p>
                    </div>
                </div>
                <div className={s.boxAdv}>
                    <p ref={aboutWorkRef} className={s.header}>
                        {t("text5")}
                    </p>
                </div>
                <div className={s.box1}>
                    <div className={s.cycle}></div>
                    <img src={notebook} className={s.icon}/>
                </div>
                <div className={s.box1}>
                    <div className={s.cycle}></div>
                    <img src={box} className={s.icon}/>
                </div>
                <div className={s.box1}>
                    <div className={s.cycle}></div>
                    <img src={avto} className={s.icon}/>
                </div>

                <div className={s.box1}>
                    <div className={s.cycle}></div>
                    <img src={note} className={s.icon_note}/>
                </div>

                <div className={s.box1}>
                    <p className={s.text_note}>
                        {t("order2")}
                        <span style={{color: "#3D9A85"}}>{` 25 `} </span>
                        {t("mins")}
                    </p>
                </div>

                <div className={s.box_col} ref={brandRef}>
                    <p className={s.header}>{t("brands")}</p>
                </div>

                <div className={s.content_by_type}>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={0}
                        slidesPerView={width / 150}
                    >
                        {brands?.map((item, id) => {
                            return (<div key={item.id}>
                                    <SwiperSlide key={item.id}>
                                        <ItemBrand
                                            url={item.url}
                                            id={item.id}
                                        />
                                    </SwiperSlide>
                                </div>);
                        })}
                    </Swiper>
                </div>

                <div className={s.box1}>
                    <p className={s.header}>{t("text6")} </p>
                </div>

                <div className={s.box1}>
                    <div className={s.bajan}>{t("text7")}</div>
                </div>
                <div className={s.box_button}>
                    <input
                        type="email"
                        placeholder={`${t("email")}`}
                        value={email}
                        onChange={handleChange}
                    />
                    {!isEmail && (<img
                            src={inputbutton}
                            className={s.input_button}
                            onClick={SendEmail}
                        />

                    )}
                    {!isEmail && errors.message && <p className={s.error1}> {errors?.message} </p>}
                    {isEmail && <img src={about4} className={s.jobPic1}/>}


                </div>
                <div className={s.boxAdv} ref={reviewRef}>
                    <p className={s.header}>{t("review")}</p>
                </div>

                <div className={s.box_karciqner}>
                    <Swiper spaceBetween={0} slidesPerView={width / 200}>
                        {feedback?.map((item, index) => {
                            return (<SwiperSlide key={item.id}>
                                <div className={s.reviews}>
                                    <div className={s.box_row}>
                                        <div>
                                            <img className={s.rev_image}
                                                 src={item.image?.small_image}/>

                                        </div>
                                        <p className={s.rev_name}>{item.translation?.first_name} {" "} {item.translation?.last_name}</p>
                                    </div>

                                    <p className={s.rev_text}>{item.translation?.description} </p>
                                </div>

                            </SwiperSlide>)
                        })}
                    </Swiper>
                </div>


                <p className={s.header}>{t("work")}</p>
                <div className={s.box_3} ref={jobRef}>
                    <Swiper spaceBetween={0} slidesPerView={width / 200}>
                        {jobs?.map((item, index) => {
                            return (<SwiperSlide key={index}>
                                    <NavLink
                                        to={`/vacancies/${item.id}`}
                                        style={{textDecoration: "none"}}
                                    >
                                        <div className={s.box_vac}>
                                            <p className={s.box_name}>
                                                {item.work_category?.translation?.title}
                                            </p>
                                            <p className={s.box_title}>
                                                {item.locality?.translation?.locality_name}
                                            </p>
                                            <p className={s.box_title}></p>
                                            <p className={s.green_text}>{t("apply")}</p>
                                        </div>
                                    </NavLink>
                                </SwiperSlide>);
                        })}
                    </Swiper>
                </div>

                <div className={s.line}></div>
                <div className={s.box1}>
                    <div className={s.bajan}>{t("textEnd")}</div>
                </div>

                <div className={s.socialicons}>
                    <a href="https://www.facebook.com/">
                        <img className={s.img} src={f}/>
                    </a>
                    <a href="https://www.instagram.com/">
                        <img className={s.img} src={I}/>
                    </a>
                    <a href="https://www.youtube.com/">
                        <img className={s.img} src={Y}/>
                    </a>
                    <a href="https://ok.ru/">
                        <img className={s.img} src={OK}/>
                    </a>
                    <a href="https://vk.com/">
                        <img className={s.img} src={VK}/>
                    </a>
                </div>
            </div>);
    } else {
        return (<div className={s.main_D}>
                <PageTitle title1={`${t("about")}`}/>

                <div className={s.picBox}>
                    <div className={s.delivery_item} id="express">
                        <img src={delivery} className={s.delivery_pic}/>
                        <div className={s.delivery_text1}>{t("text8")}</div>
                        {" "}
                        <div className={s.delivery_text2}>
                            {" "} <span
                            style={{color: "#3D9A85", fontWeight: "600", marginLeft: '15px'}}> 25{" "} </span>{" "}
                            {t("mins")}
                        </div>
                    </div>

                    <div className={s.deliveryBox}>
                        <img className={s.cyclePic} src={imageDelivery}/>
                    </div>
                </div>

                <div className={s.menu_D}>
                    <div className={s.content}>
                        <div
                            id="about"
                            onClick={() => handleNavigate("about")}
                            className={s.link1}
                        >
                            {t("about")}
                        </div>

                        <div
                            id="adv"
                            onClick={() => handleNavigate("adv")}
                            className={s.link}
                        >
                            {t("adv")}
                        </div>

                        <div
                            id="aboutWork"
                            onClick={() => handleNavigate("aboutWork")}
                            className={s.link}

                        >
                            {t("what_do")}
                        </div>

                        <div
                            id="brand"
                            onClick={() => handleNavigate("brand")}
                            className={s.link}
                        >
                            {t("brands")}
                        </div>

                        <NavLink to="/products/discountedproducts" className={s.link}>
                            {t("sale")}
                        </NavLink>

                        <div
                            id="review"
                            onClick={() => handleNavigate("review")}
                            className={s.link}
                        >
                            {t("review")}
                        </div>

                        <div onClick={() => handleNavigate("job")} className={s.link} id='job'>
                            {t("work")}
                        </div>
                    </div>
                </div>
                <div className={s.aboutBox} ref={aboutRef}>
                    <div className={s.Box1}>
                        <div>
                            <p className={s.title}> {t("about")} </p>
                        </div>
                        <div>
                            <p className={s.text}>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                                amet sint. Velit officia consequat duis enim. Amet minim mollit
                                non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                                officia consequat duis enim. Amet minim mollit non deserunt
                                ullamco est sit aliqua dolor do amet sint. Velit officia
                                consequat duis enim. Amet minim mollit non deserunt ullamco est
                                sit aliqua dolor do amet sint.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img
                            src={`https://theplanetapp.com/wp-content/uploads/2020/09/sustainable-supermarket-theplanetapp-scaled.jpg`}
                            className={s.picAbout}
                        />
                    </div>
                </div>

                <div className={s.advBox} ref={advRef}>
                    <p className={s.title}>{t("adv")}</p>

                    <div className={s.box3}>
                        <div style={{width: "100%", display: "flex"}}>
                            <div
                                style={{
                                    display: "flex", justifyContent: "end", width: "50%", alignItems: "center",
                                }}
                            >
                                <p className={s.text1}>{t("del")}</p>
                                <img className={s.sign} src={sign}/>
                            </div>

                        </div>

                        <div style={{width: "100%", display: "flex"}}>
                            <div
                                style={{
                                    display: "flex", justifyContent: "end", width: "50%", alignItems: "center",
                                }}
                            >
                                <p className={s.text1}>{t("low_price")}</p>
                                <img className={s.sign} src={sign}/>
                            </div>

                        </div>

                        <div style={{width: "100%", display: "flex"}}>
                            <div
                                style={{
                                    display: "flex", justifyContent: "end", width: "50%", alignItems: "center",
                                }}
                            >
                                <p className={s.text1}>{t("text1")}</p>
                                <img className={s.sign} src={sign}/>
                            </div>
                            <div style={{width: "50%"}}/>
                        </div>

                        <div style={{width: "100%", display: "flex"}}>
                            <div
                                style={{
                                    display: "flex", justifyContent: "end", width: "50%", alignItems: "center",
                                }}
                            >
                                <p className={s.text1}>{t("text2")}</p>
                                <img className={s.sign} src={sign}/>
                            </div>
                            <div style={{width: "50%"}}/>
                        </div>

                        <div style={{width: "100%", display: "flex"}}>
                            <div
                                style={{
                                    display: "flex", justifyContent: "end", width: "50%", alignItems: "center",
                                }}
                            >
                                <p className={s.text1}>{t("text3")}</p>
                                <img className={s.sign} src={sign}/>
                            </div>

                            <div style={{width: "49%"}}/>
                        </div>

                        <div style={{width: "100%", display: "flex"}}>
                            <div
                                style={{
                                    display: "flex", justifyContent: "end", width: "50%", alignItems: "center",
                                }}
                            >
                                <p className={s.text1}>{t("text4")}</p>
                                <img className={s.sign} src={sign}/>
                            </div>

                            <div style={{width: "49%"}}/>
                        </div>
                    </div>
                </div>

                <div className={s.jobBox} ref={aboutWorkRef}>
                    <p className={s.title}>{t("text5")}</p>
                    <div className={s.box4}>
                        <div className={s.box5}>
                            <img src={about1} className={s.jobPic}/>
                            <p className={s.text4}>{t("order")}</p>
                        </div>

                        <div className={s.box5}>
                            <img src={about2} className={s.jobPic}/>
                            <p className={s.text4}>{t("order1")}</p>
                        </div>
                        <div className={s.box5}>
                            <img src={about3} className={s.jobPic}/>
                            <p className={s.text4}>{t("delivery")}</p>
                        </div>
                        <div className={s.box5}>
                            <img src={about4} className={s.jobPic}/>
                            <p className={s.text4}>
                                {t("order2")}
                                <p style={{
                                    color: "#3D9A85", marginLeft: '4px', marginRight: '4px'
                                }}> {`${" "}25${" "}`} </p>
                                {t("min")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={s.jobBox} ref={brandRef}>
                    <p className={s.title}>{t("brands")}</p>
                    <div className={s.content1}>
                        <Swiper spaceBetween={0} slidesPerView={width / 350}>
                            {brands?.map((item, id) => {
                                return (<SwiperSlide key={item.id}>
                                        <Brand_Item
                                            url={item.url}
                                            id={item.id}
                                        />
                                    </SwiperSlide>);
                            })}
                        </Swiper>
                    </div>
                </div>
                <div className={s.jobBox1} ref={contactRef}>
                    <p className={s.title}>{t("text6")} </p>
                    <p className={s.text1}>{t("text7")}</p>
                    <div className={s.inputs}>
                        <input
                            type="email"
                            placeholder={`${t("email")}`}
                            className={s.input_D}
                            value={email}
                            onChange={handleChange}
                        />
                        {!isEmail && (<button className={s.button_D} onClick={SendEmail}>
                                {t("send")}
                            </button>)}

                        {isEmail && <img src={about4} className={s.jobPic1}/>}
                    </div>

                    {!isEmail && errors?.message && <p className={s.error}> {errors?.message} </p>}

                </div>


                <div className={s.jobBox} ref={reviewRef}>
                    <p className={s.title}>{t("review")} </p>


                    <div className={s.reviews}>

                        <Swiper spaceBetween={0} slidesPerView={width / 470}>
                            {feedback?.map((item, index) => {
                                return (<SwiperSlide key={item.index}>
                                        <div className={s.box_col}>
                                            <img className={s.rev_image_D}
                                                 src={item.image?.small_image}/>
                                            <p className={s.rev_name}>{item.translation?.first_name} {" "} {item.translation?.last_name}</p>
                                        </div>
                                        <p className={s.rev_text}>{item.profession?.translation?.title}   </p>

                                        <p className={s.rev_text}>{item.translation?.description} </p>
                                    </SwiperSlide>)
                            })}   </Swiper>
                    </div>

                </div>

                <div className={s.jobBox} ref={jobRef}>
                    <p className={s.title}>{t("work")}</p>

                    <div className={s.box_1}>
                        <Swiper spaceBetween={0} slidesPerView={width / 520}>
                            {jobs?.map((item, index) => {
                                return (<SwiperSlide key={item.id}>
                                        <NavLink
                                            style={{textDecoration: "none"}}
                                            to={`/vacancies/${item.id}`}
                                        >
                                            <div className={s.vac}>
                                                <p className={s.vac_name}>
                                                    {item.work_category?.translation?.title}
                                                </p>
                                                <p className={s.vac_time}>16.06</p>

                                                <p className={s.vac_text}>
                                                    {item.translation?.description}
                                                </p>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>);
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>);
    }
};
export default React.memo(AboutUs);
