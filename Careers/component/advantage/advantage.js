import React from "react";
import {useTranslation} from "react-i18next";
import Title from "../../../Title";
import {ReactComponent as Graph} from "../../../../assets/svg/graph.svg";
import {ReactComponent as Illustration} from "../../../../assets/svg/illustration.svg";
import {ReactComponent as Launch} from "../../../../assets/svg/launch.svg";
import {ReactComponent as Bulb} from "../../../../assets/svg/bulb.svg";
import {ReactComponent as Team} from "../../../../assets/svg/ph-fill.svg";

import styles from "./advantage.module.css";

const Advantage = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.advantage}>
            <Title className={styles.advantage__title} variant="h1">
                {t("advantages_work")}
            </Title>
            <div className={styles.advantage__info}>
                <div className={styles.advantage__svg_info}>
                    <Graph/>
                    <Title variant="p">{t("flex_time")}</Title>
                </div>
                <div className={styles.advantage__svg_info}>
                    <Illustration/>
                    <Title variant="p">{t("high_salary")}</Title>
                </div>
                <div className={styles.advantage__svg_info}>
                    <Launch/>
                    <Title variant="p">{t("career_growth")}</Title>
                </div>
                <div className={styles.advantage__svg_info}>
                    <Bulb/>
                    <Title variant="p">{t("int_work")}</Title>
                </div>
                <div className={styles.advantage__svg_info}>
                    <Team/>
                    <Title variant="p">{t("good_team")}</Title>
                </div>
            </div>
        </div>
    );
};

export default Advantage;