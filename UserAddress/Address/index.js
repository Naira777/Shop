import React from 'react'
import s from './index.module.css'
import {useTranslation} from 'react-i18next';

function Address({
                     address,
                     entrance,
                     floor,
                     flat,
                     handleClick,
                     selectedAddress,
                 }) {
    const {t} = useTranslation();

    return (
        <div className={s.content} onClick={handleClick}>
            <div>
                {selectedAddress ? (
                    <div className={s.cycle_green} id="cycle_green">
                        <div className={s.cycle_small} id="cycle_small">

                        </div>
                    </div>
                ) : (
                    <div className={s.cycle_gray} id="cycle_gray"></div>
                )}</div>

            {address}, {t("floor")}՝ {floor}, {t("entrance")}՝ {entrance}, {t("apt")} {flat}
        </div>
    )
}

export default Address
