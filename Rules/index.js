import React from 'react'
import {vector} from '../images'
import s from './index.module.css'
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getRules} from './../../redux/rulesReducer';
import {useEffect} from 'react';
import PageTitle from '../PageTitle';
import {WithPreloaderHOC} from './../Hoc/withPreloader';
import {useWindowSize} from './../../CustomHooks/getWindowWidth';
import { useTranslation } from 'react-i18next';


const Rules = () => {

    const navigate = useNavigate()
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const {lang} = useSelector((state) => state.CategoryPage)
    const {privacy, loading} = useSelector((state) => state.RulesPage)
    const [height, width] = useWindowSize()

    useEffect(() => {
        dispatch(getRules())
    }, [lang])

    return (

        <WithPreloaderHOC loading={loading}>
            <div className={s.content}>
                {width > 500 && <PageTitle title1={`${t("rule")}`}/>}
                <img src={vector} className={s.vector} onClick={() => {
                    navigate(-1)
                }}/>
                <p className={s.header}> {privacy.title}</p>
                <p className={s.text}> {privacy.desc} </p>

            </div>

        </WithPreloaderHOC>
    )

}
export default Rules