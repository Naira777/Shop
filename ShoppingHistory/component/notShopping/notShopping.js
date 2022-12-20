import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EmptyBox from "../../../../assets/empty box.png";
import Button from "../../../Button/Button"
import Title from "../../../Title";

import styles from "./notShopping.module.css";

const NotShopping = () => {
  let userName = localStorage.getItem("user_name");
  let userSurname = localStorage.getItem("user_surname");
  const { t } = useTranslation();
const navigate = useNavigate()
  return (
    <div className={styles.notShopping}>
      <div>
        <img
          className={styles.notShopping_img}
          src={`${EmptyBox}`}
          alt="empty box"
        />
        <div className={styles.title_btn}>
          <Title className={styles.title}>
          {t("dear")}{" "}{userName} {userSurname},{t("no_shopping")}
          </Title>
          <Button className={styles.btn} onClick={()=>navigate('/categories')} >{t("doShopping")}</Button>
        </div>
      </div>
    </div>
  );
};

export default NotShopping;
