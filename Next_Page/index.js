import React from 'react'
import s from './index.module.css'
import {useTranslation} from 'react-i18next';

const Next_Page = ({mobile, desktop, handleLoadMore, url}) => {

    const {t} = useTranslation();

    if (desktop) {
        return (
            <div className={s.pagination}>
                <button className={s.buttonMore_desktop} onClick={() => handleLoadMore()}>
                    {t("seeMore")}
                </button>
            </div>
        )
    } else if (mobile) {

        return (
            <div className={s.pagination_mobile} url={url}>
                <button className={s.buttonMore_mobile} onClick={() => handleLoadMore()}>
                    {t("seeMore")}
                </button>
            </div>
        )

    }

}
export default Next_Page