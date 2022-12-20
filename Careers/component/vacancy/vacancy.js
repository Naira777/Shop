import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getVacancy } from "../../../../redux/careersReducer";
import Title from "../../../Title";
import styles from "./vacancy.module.css";

const Vacancy = () => {
  const { vacancy } = useSelector((store) => store.CareersPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getVacancy());
  }, [dispatch]);

  const handleSendId = (id) => {
    navigate(`/vacancies/${id}`);
  };

  return (
    <div className={styles.vacancy}>
      <Title className={styles.vacancy__title}>{t("works_reg")}</Title>
      <div className={styles.vacancy__box}>
        <div className={styles.vacancy__info}>
          {vacancy?.map((item) => {
            let date = item?.deadline.split("-").join("/");
            return (
              <div
                className={styles.info}
                key={item.id}
                onClick={() => handleSendId(item.id)}
              >
                <div className={styles.info__work_date}>
                  <div>
                    <div className={styles.info__work}>
                      {item?.work_category?.code}
                    </div>
                    <div className={styles.info__locality}>
                      {item?.locality_code}
                    </div>
                  </div>
                  <div className={styles.info__date_type}>
                    <div className={styles.info__date}>{date}</div>
                    <div className={styles.job__type}>{t("job_all")}</div>
                  </div>
                </div>
                <div className={styles.info__description}>
                  {item?.translation?.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Vacancy;
