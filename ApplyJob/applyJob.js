import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {careersAPI} from "../../Api/CareersApi/api";
import TextInput from "../TextInput";
import MainSelect from "../MainSelect";
import Button from "../Button/Button";
import Title from "../Title";
import UploadFile from "../UploadFile";

import styles from "./applyJob.module.css";

const ApplyJob = ({
                      className,
                      selectVacancy,
                      vacancyOneId,
                      workCategoryId,
                  }) => {
    const {vacancy} = useSelector((store) => store.CareersPage);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const formData = new FormData();
    const [file, setFile] = useState(null);
    const {
        control,
        formState: {errors, dirtyFields},
        handleSubmit,
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            phone_number: "",
            announcement_id: selectVacancy ? selectVacancy : {},
        },
    });

    const btnDisabled = selectVacancy
        ? !file || Object.values(dirtyFields).length < 3
        : !file || Object.values(dirtyFields).length < 4;

    const options = vacancy?.map((item) => ({
        label: item?.work_category.code,
        value: item?.work_category.code,
    }));

    const onSubmit = handleSubmit((data) => {
        Object.entries(data).forEach(([k, v]) => {
            formData.append(k, v);
        });

        const announcementId = vacancy?.find(
            (item) => data.announcement_id.value === item.work_category.code
        );

        data.announcement_id = vacancyOneId ? vacancyOneId : announcementId.id;
        data.work_category_id = workCategoryId
            ? workCategoryId
            : announcementId.work_category_id;
        dispatch(careersAPI.postVacancy({...data, ...file}));
    });

    return (
        <div className={styles.applyJob}>
            <Title className={styles.applyJob_title}> {t("work_apply")} </Title>
            <div className={clsx(className, styles.applyJob__box)}>
                <div>
                    <TextInput
                        control={control}
                        name="first_name"
                        placeholder={t("name")}
                        errors={errors}
                        className={styles.applyJob__input}
                    />
                    <TextInput
                        control={control}
                        errors={errors}
                        name="last_name"
                        placeholder={t("lastName")}
                        className={styles.applyJob__input}
                    />
                </div>
                <div className={styles.applyJob__box_one}>
                    <MainSelect
                        name="announcement_id"
                        options={options}
                        control={control}
                        errors={errors}
                        disabled={selectVacancy ? true : false}
                        placeholder={selectVacancy ? selectVacancy : t("choose_work")}
                        className={styles.applyJob__select}
                    />
                    <TextInput
                        control={control}
                        errors={errors}
                        name="phone_number"
                        type="number"
                        placeholder={t("tel")}
                        className={styles.applyJob__input}
                    />
                    <UploadFile setFile={setFile} control={control} name="file"/>
                </div>
            </div>
            <Button
                className={
                    btnDisabled ? styles.applyJob__btn_disabled : styles.applyJob__btn
                }
                onClick={onSubmit}
                disabled={btnDisabled}
            >
                {t("send")}
            </Button>
        </div>
    );
};
export default ApplyJob;
