import s from "./index.module.css";
import {clock, fire, star1} from '../../images'
import { useTranslation } from 'react-i18next';


function Item_Desktop({url, title, time, rate, recipe_type}) {
    const { t } = useTranslation();
    return (
        <div className={s.content}>
            <img src={url} className={s.picBig}/>


            <p className={s.text}>{title}</p>

            <div className={s.rating}>
                <img src={star1} className={s.star}/>
                <p className={s.rate}>{rate}</p>
            </div>

            <div className={s.box}>
                <div className={s.row}>
                    <img src={clock} className={s.clock}/>
                    <p className={s.time}>{`${time}`} {t("minute")}</p>
                </div>
              
                <div className={s.row}>
                    <img src={fire} className={s.fire}/>
                    <p className={s.type}> {recipe_type} </p>
                </div>
            </div>

        </div>
    );
}

export default Item_Desktop;
