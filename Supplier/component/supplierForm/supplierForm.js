import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {providersAPI} from "../../../../Api/ProvidersApi/api";
import {getProviders} from "../../../../redux/providersReducer";
import Textarea from "../../../Textarea";
import TextInput from "../../../TextInput";
import Button from "../../../Button/Button";
import Title from "../../../Title";
import MainSelect from "../../../MainSelect";
import Popup from "../../../Popup";
import styles from "./supplierForm.module.css";

const SupplierForm = ({className}) => {
    const {providers} = useSelector((store) => store.ProvidersPage);
    const {lang} = useSelector((store) => store.CategoryPage);
    const {t} = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProviders());
    }, [dispatch]);

    const {
        control,
        formState: {errors, dirtyFields},
        handleSubmit,
    } = useForm({
        defaultValues: {
            company: "",
            full_name: "",
            position: "",
            phone_number: "",
            product_categories: [],
            comment: "",
        },
    });
    const btnDisabled = Object.values(dirtyFields).length < 6;

    const onSubmit = handleSubmit((data) => {
        const providersId = providers?.filter((item) =>
            data.product_categories.find(
                (elem) => elem.value === item.translation.title
            )
        );

        data.product_categories = providersId.map((element) => {
            return {id: `${element.id}`};
        });
        providersAPI.postProvidersCreate(data, lang).then((res) => {
            res.data ? <Popup/> : <Popup/>;
        });
    });

    const options = providers?.map((item) => {
        return {value: item.translation.title, label: item.translation.title};
    });

    return (
        <div className={clsx(className, styles.supplier__form)}>
            <Title className={styles.supplier__form_title}> {t("be_supplier")}</Title>
            <TextInput
                control={control}
                errors={errors}
                name="company"
                placeholder={t("organization_name")}
                className={styles.supplier__input}
            />
            <TextInput
                control={control}
                errors={errors}
                name="full_name"
                placeholder={t("name_lastName")}
                className={styles.supplier__input}
            />
            <TextInput
                control={control}
                errors={errors}
                name="position"
                placeholder={t("position")}
                className={styles.supplier__input}
            />
            <TextInput
                className={styles.supplier__input}
                control={control}
                errors={errors}
                name="phone_number"
                type="number"
                placeholder={t("tel")}
            />
            <MainSelect
                control={control}
                options={options}
                name="product_categories"
                placeholder={t("product_supplied")}
                className={styles.supplier__select}
                isMulti
                disabledOptions
            />
            <Textarea
                control={control}
                name="comment"
                placeholder={t("comment_field")}
                className={styles.supplier__textarea}
            />
            <Button
                className={
                    btnDisabled ? styles.supplier__btn_disabled : styles.supplier__btn
                }
                type="submit"
                onClick={onSubmit}
                disabled={btnDisabled}
            >
                {t("send")}
            </Button>
        </div>
    );
};
export default SupplierForm;
