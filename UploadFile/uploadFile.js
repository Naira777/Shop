import React, {useState} from "react";
import clsx from "clsx";
import {ReactComponent as UploadSvg} from "../../assets/svg/upload.svg";

import styles from "./uploadFile.module.css";
import {useTranslation} from "react-i18next";

const handleFiles = (files) =>
    new Promise((resolve) => {
        if (!files) {
            return null;
        }

        const images = [];
        let count = 0;
        const sendImages = () => {
            if (count === files.length) {
                resolve(files.length === 1 ? images[0] : images);
            }
        };
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function (e) {
                images.push({
                    file,
                    image: e.target.result,
                });
                count++;
                sendImages();
            };
            reader.readAsDataURL(file);
        }
    });

const UploadFile = ({setFile, className}) => {
    const [nameFile, setNameFile] = useState("");
    const {t} = useTranslation();

    const uploadFile = async (e) => {
        const files = await handleFiles(e.target.files);
        setNameFile(files?.file?.name);
        setFile(files);
    };

    return (
        <label className={clsx(className)}>
            <input
                className={styles.uploadFile}
                placeholder={t("add_cv")}
                type="file"
                onChange={uploadFile}
            />
            <div className={styles.uploadFile__text_icon}>
                <div className={styles.uploadFile__text}>
                    {nameFile ? nameFile : `${t("add_cv")}`}
                </div>
                <UploadSvg className={styles.uploadFile__icon}/>
            </div>
        </label>
    );
};

export default UploadFile;
