import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuestions} from "../../redux/questionsReducer";
import Dropdown from "../Dropdown/dropdown";
import Title from "../Title";
import PageTitle from "../PageTitle";
import {useTranslation} from "react-i18next";
import styles from "./frequentlyQuestions.module.css";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";

const FrequentlyQuestions = () => {
    const {questions} = useSelector((store) => store.QuestionsPage);
    const {t} = useTranslation();
    const [height, width] = useWindowSize();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    const lastItem = questions[questions.length - 1];
    return (
        <>
            {width > 500 && <PageTitle title1={t("frequently_questions")}/>}
            <div className={styles.frequentlyQuestions}>
                <Title className={styles.frequentlyQuestions__title} variant="h1">
                    {t("frequently_questions")}
                </Title>
                {questions?.map((item) => {
                    return (
                        <div key={item.id} className={styles.dropDown__children}>
                            <Dropdown
                                standard
                                className={styles.dropDown}
                                info={item?.translation?.description}
                                withIcon={lastItem === item}
                            >
                                <Title className={styles.dropDown__title} variant="span">
                                    {item.translation.title}
                                </Title>
                            </Dropdown>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default FrequentlyQuestions;
