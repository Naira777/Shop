import s from './index.module.css'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Item from './ItemProduct/index'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {useNavigate} from 'react-router-dom';
import {getDiscountedProducts} from './../../../redux/reducer';
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import {useWindowSize} from './../../../CustomHooks/getWindowWidth';
import {useTranslation} from 'react-i18next';

function Discounted_Products() {

    const [height, width] = useWindowSize();
    const {t} = useTranslation();
    const {sale_products, loading, lang, delivery_type} = useSelector((state) => state.CategoryPage)
    const {token} = useSelector((state) => state.UsersPage)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getDiscountedProducts('all', 'all'))

    }, [lang, token, delivery_type])


    return (
        <WithPreloaderHOC loading={loading} mobile>
            <div className={s.content}>
                <p className={s.header}> {t("sale")} </p>
                <p className={s.textpoqr} onClick={() => {
                    navigate(`/products/discountproducts`)
                }}> {t("seeAll")} </p>
                <div className={s.contentbytype}>

                    <Swiper spaceBetween={0} slidesPerView={width / 190}>
                        {sale_products?.map((item, id) => {
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
                                                ishit={item.ishit}
                                                price={item.price}
                                                prevPrice={item.prevPrice}
                                                meas={item.meas}
                                                id={item.id}

                                            />
                                        </NavLink>

                                    </SwiperSlide>
                                </div>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </WithPreloaderHOC>


    )
}

export default Discounted_Products