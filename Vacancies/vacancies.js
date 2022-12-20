import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Social from "./components/Social";
import {getVacancyOne} from "../../redux/careersReducer";
import Title from "../Title";
import {ReactComponent as Check} from "../../assets/svg/check.svg";
import styles from "./vacancies.module.css";
import PageTitle from "../PageTitle";
import ApplyJob from './../ApplyJob/applyJob';
import { useWindowSize } from "../../CustomHooks/getWindowWidth";

const Vacancies = () => {
    const {vacancyOne} = useSelector((store) => store.CareersPage);
    const {filter} = useParams();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [height, width] = useWindowSize();

    useEffect(() => {
        dispatch(getVacancyOne(filter));
    }, [dispatch, filter]);

    return (
        <div>
         {width > 500 &&  <PageTitle title1={t("work")} title2={t("job_description")}/>}
            <div className={styles.vacancy__box}>
                <div className={styles.vacancy__box_info}>
                    <Title variant="h2" className={styles.vacancy__title}>
                        {vacancyOne?.work_category?.translation?.title}
                    </Title>
                    <div>
                        <div className={styles.vacancy__info}>
                            <div className={styles.info_box}>
                                <Check/> {t("work_location")}։
                            </div>
                            <div className={styles.info}>
                                {vacancyOne?.locality?.translation?.locality_code}
                            </div>
                        </div>
                        <div className={styles.vacancy__info}>
                            <div className={styles.info_box}>
                                <Check/> {t("deadline")}։
                            </div>
                            <div className={styles.info}>{vacancyOne?.deadline}</div>
                        </div>
                        <div className={styles.vacancy__info}>
                            <div className={styles.info_box}>
                                <Check/> {t("work_type")}։
                            </div>
                            <div className={styles.info}>
                                {vacancyOne?.work_hour?.translation.title}
                            </div>
                        </div>
                    </div>
                    <div className={styles.desc_title}>
                        <Title variant="h4" className={styles.work_desc_title}>
                            {t("work_dick")}
                        </Title>
                        <div>{vacancyOne?.translation?.description}</div>
                    </div>
                    <div className={styles.work_want_lis}>
                        <Title variant="h4" className={styles.work_desc_title}>
                            {t("work_wont")}
                        </Title>
                        <ul className={styles.work_want}>
                            {vacancyOne?.requirement?.map((item) => {
                                return <li key={item?.id}>{item?.translation?.title}</li>;
                            })}
                        </ul>
                    </div>
                </div>
                <div className={styles.work_social}>
                    <Social/>
                </div>
            </div>
            <div className={styles.vacancy__applyJob}>
                <ApplyJob
                    className={styles.applyJob}
                    selectVacancy={vacancyOne?.work_category?.translation?.title}
                    vacancyOneId={vacancyOne?.id}
                    workCategoryId={vacancyOne?.work_category_id}
                />
            </div>
        </div>
    );
};

export default Vacancies;
