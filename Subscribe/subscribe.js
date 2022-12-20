import React from "react";
import {useForm} from "react-hook-form";
import clsx from "clsx";
import Button from "../Button/Button";
import TextInput from "../TextInput";
import Title from "../Title";
import {useWindowSize} from "../../CustomHooks/useWindowSize";
import {ReactComponent as Vector} from "../../assets/svg/vector.svg";
import {useDispatch} from "react-redux";
import {emailAPI} from "../../Api/EmailandShopingHisoryApi/api";
import {useTranslation} from "react-i18next";
import styles from "./subscribe.module.css";

const Subscribe = ({sendSubscribe, className}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const {
        control,
        formState: {errors},
        handleSubmit,
    } = useForm({defaultValues: {email: ""}});

    const onSubmit = handleSubmit((data) => {
        const filter_by_type = sendSubscribe ? sendSubscribe : "for_discount";
        dispatch(emailAPI.postEmail({...data, filter_by_type}));
    });

    const size = useWindowSize();

    return (
        <div className={clsx(className, styles.subscribe)}>
            <div className={styles.subscribe__title_text}>
               <p className={styles.title}> <Title>{t("be_firs")}</Title>  </p> 
             <p className={styles.title1}>  <Title variant="p">{t("subscribe_email")}</Title></p> 
            </div>
            <div className={styles.subscribe__email_btn}>
                <TextInput
                    className={styles.subscribe__email}
                    control={control}
                    name="email"
                    type="email"
                    placeholder={t("email")}
                    errors={errors}
                />
                <Button
                    className={!size ? styles.subscribe__icon_btn : styles.subscribe__btn}
                    onClick={onSubmit}
                >
                    {!size ? <Vector className={styles.subscribe__icon}/> : t("send")}
                </Button>
            </div>
        </div>
    );
};

export default Subscribe;
