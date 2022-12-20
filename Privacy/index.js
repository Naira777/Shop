import React, {useEffect} from 'react'
import {vector} from '../images'
import s from './index.module.css'
import {useNavigate} from 'react-router-dom';
import {getTerms} from '../../redux/rulesReducer';
import {useSelector, useDispatch} from 'react-redux';
import PageTitle from './../PageTitle/index';
import {WithPreloaderHOC} from './../Hoc/withPreloader';
import {useWindowSize} from './../../CustomHooks/getWindowWidth';
import { useTranslation } from 'react-i18next';


const Privacy = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {lang} = useSelector((state) => state.CategoryPage)
    const {termsofuse, loading} = useSelector((state) => state.RulesPage)
    const [height, width] = useWindowSize()


    useEffect(() => {

        dispatch(getTerms())

    }, [lang])


    return (

        <WithPreloaderHOC loading={loading}>
            <div className={s.content}>
                {width > 500 && <PageTitle title1={`${t("privacy")}`}/>}
                <img src={vector} className={s.vector} onClick={() => {
                    navigate(-1)
                }}/>
                <p className={s.header}> {termsofuse.title}</p>
                <p className={s.text}> {termsofuse.desc}
                </p>

            </div>
        </WithPreloaderHOC>
    )

}
export default Privacy