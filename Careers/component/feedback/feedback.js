import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../../../redux/careersReducer";
import { useWindowSize } from "../../../../CustomHooks/useWindowSize";
import Title from "../../../Title";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./feedback.module.css";


const Feedback = ({ className, width }) => {
  const { feedback } = useSelector((store) => store.CareersPage);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  let size = useWindowSize();


  return (
    <div className={clsx(className, styles.feedback)}>
      <Title variant="h2" className={styles.feedback__title}>
        {t("about_work")}
      </Title>
      <div className={styles.feedback__info}>
        {size ? (
          feedback?.map((item) => {
            return (
              <div className={styles.worker} key={item.id}>
                <div className={styles.worker_img}>
                  <img
                    className={styles.img}
                    src={item?.image?.big_image}
                    alt={item?.translation?.first_name}
                  />
                </div>
                <div className={styles.worker_name}>
                  {item.translation.first_name} {item.translation.last_name}
                </div>
                <div className={styles.worker_profession}>
                  {item?.profession?.translation?.title}
                </div>
                <Title variant="p" className={styles.worker_profession}>
                  {item?.translation?.description}
                </Title>
              </div>
            );
          })
        ) : (
          <Swiper
            slidesPerView={width/370}
            spaceBetween={0}
              >
            {feedback?.map((item) => {
              return (
                <SwiperSlide className={styles.worker} key={item.id}>
                  <div className={styles.worker_img}>
                    <img
                      className={styles.img}
                      src={item?.image?.big_image}
                      alt={item?.translation?.first_name}
                    />
                  </div>
                  <div className={styles.worker_name}>
                    {item.translation.first_name} {item.translation.last_name}
                  </div>
                  <div className={styles.worker_profession}>
                    {item?.profession?.translation?.title}
                  </div>
                  <Title variant="p" className={styles.worker_profession}>
                    {item?.translation?.description}
                  </Title>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Feedback;
