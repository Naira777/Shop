import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import CareerImg from "./component/careerImg/careerImg";
import Advantage from "./component/advantage";
import Vacancy from "./component/vacancy";
import Feedback from "./component/feedback";
import JoinTeam from "./component/joinTeam";
import Button from "../Button/Button";
import PageTitle from "../PageTitle";
import Subscribe from "../Subscribe";
import styles from "./career.module.css";
import ApplyJob from './../ApplyJob/applyJob';

import {useWindowSize} from './../../CustomHooks/getWindowWidth';

const Careers = () => {
    const feedbackRef = useRef(null);
    const joinTeamRef = useRef(null);
    const vacancyRef = useRef(null);
    const subscribeRef = useRef(null);
    const {t} = useTranslation();
    const [height, width] = useWindowSize()
    const handleFeedbackRef = (ref) => {
        ref.current.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className={styles.career}>
            {width > 500 && <PageTitle title1={t("work")}/>}
            <CareerImg/>
            <div className={styles.career__btn_list}>
                <Button className={styles.career_btn}>{t("advantages")}</Button>

                <Button
                    onClick={() => handleFeedbackRef(feedbackRef)}
                    className={styles.career_btn}
                >
                    {t("review")}
                </Button>

                <Button
                    onClick={() => handleFeedbackRef(joinTeamRef)}
                    className={styles.career_btn}
                >
                    {t("Jobs_search")}
                </Button>

                <Button
                    onClick={() => handleFeedbackRef(vacancyRef)}
                    className={styles.career_btn}
                >
                    {t("work_apply")}
                </Button>

                <Button
                    onClick={() => handleFeedbackRef(subscribeRef)}
                    className={styles.career_btn}
                >
                    {t("subscribe")}
                </Button>
            </div>
            <div>
                <Advantage/>
            </div>
            <div ref={feedbackRef}>
                <Feedback className={styles.career__feedback} width={width}/>
            </div>
            <div ref={joinTeamRef}>
                <JoinTeam/>
            </div>
            <div ref={vacancyRef}>
                <Vacancy/>
            </div>
            <div className={styles.career__applyJob_subscribe}>
                <div className={styles.career__applyJob} ref={subscribeRef}>
                    <ApplyJob/>
                </div>

                <div className={styles.career__subscribe} ref={subscribeRef}>
                    <Subscribe/>
                </div>
            </div>
        </div>
    );
};
export default Careers;
