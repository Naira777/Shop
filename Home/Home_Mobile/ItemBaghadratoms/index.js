import s from './index.module.css'
import {useState} from 'react'
import {useEffect} from 'react'
import {clock, fire, star1, star2} from '../../../images'
import { useTranslation } from 'react-i18next';

function ItemBaghadratoms({url, title, time, rate, recipe_type}) {
    const [yellow, setYellow] = useState([])
    const [gray, setGray] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        setYellow(Array.from(Array(rate).keys()))
        setGray(Array.from(Array(5 - rate).keys()))
    }, [rate])

    return (
        <div className={s.content}>
            <img src={url} className={s.picBig}/>

            <p className={s.text}> {title} </p>

            <div className={s.boxstars}>
                {yellow.map((item, id) => {
                    return <img key={id} src={star1} className={s.star}/>
                })}

                {gray.map((item, id) => {
                    return <img key={id} src={star2} className={s.star}/>
                })}
            </div>
            <p className={s.rate}>{rate}</p>

            <div className={s.box}>
                <img src={clock} className={s.clock}/>
                <p className={s.time}>{`${time}`} {t("minute")}  </p>

                <img src={fire} className={s.fire}/>
                <p className={s.time}>{recipe_type}</p>
            </div>
        </div>
    )
}

export default ItemBaghadratoms
