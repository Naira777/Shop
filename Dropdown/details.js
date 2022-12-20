import React from "react";
import Title from "../Title";
import CollNumber from "../CollNumber";

import { ReactComponent as Product } from "../../assets/svg/product.svg";
import { ReactComponent as Count } from "../../assets/svg/X.svg";
import { ReactComponent as Download } from "../../assets/svg/download.svg";
import { ReactComponent as DetailsPhone } from "../../assets/svg/DetailsPhone.svg";
import { ReactComponent as DetailsChat } from "../../assets/svg/DetailsChat.svg";

import styles from "./dropdown.module.css";

const Details = ({ info, standard, withIcon }) => {
  if (!standard) {
    const print = () => {
      // const pdf = new jsPDF ();
      // pdf.setLanguage("ru-MO");
      // pdf.text("смывпиыриыар фвпыврывар фвыпывп ցսցսցս սցսց սցսց գդֆհդֆհյըւկհօ",  10, 10)
      // pdf.save("pdf");
    };
    return (
      <div className={styles.details}>
        <div className={styles.details__title_download}>
          <Title variant="h3" children={styles.details__title}>
            Առաքման տվյալներ
          </Title>
          <div onClick={print} className={styles.details__download}>
            ներբեռնել <Download />
          </div>
        </div>
        <div className={styles.details__box}>
          <div className={styles.details__box_info}>
            {info?.products?.map((item) => {
              let isDiscounted = item?.product?.is_discounted;
              let discountPrice = item?.product?.discount?.discounted_price;
              let price = item.price;
              let title = item.product?.translation?.title;
              let salePrice = price - discountPrice;

              return (
                <div className={styles.details__product_box} key={item.id}>
                  <Product />
                  <div className={styles.details__price_box}>
                    {/* <img src={`add path name ${item.product.media.big_image}`} alt={item.product?.translation?.title}/> */}
                    <div className={styles.details__price_title}>
                      <div className={styles.details__price_title}>{title}</div>
                      {isDiscounted && isDiscounted === "yes" ? (
                        <div>
                          <span className={styles.details__price}>
                            {price} ֏
                          </span>
                          <span className={styles.details__salePrice}>
                            {salePrice} ֏
                          </span>
                        </div>
                      ) : (
                        <div> {price} </div>
                      )}
                    </div>

                    <div className={styles.details__count_price}>
                      <div>
                        <Count /> {item.quantity}
                      </div>
                      <div>{isDiscounted === "yes" ? salePrice : price} ֏</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.details__shopping_box}>
            <div className={styles.details__shopping_info}>
              <div>Առաքման հասցե</div>
              <div className={styles.details__address}>{info.address}</div>
            </div>
            <div className={styles.details__shopping_info}>
              <div>Առաքման արժեքը</div>
              <div>{info?.delivery_price} ֏ </div>
            </div>
            <div className={styles.details__shopping_info}>
              <div> Պատվերի գումարը </div>
              <div> {info?.price - info?.delivery_price} ֏ </div>
              {/* poxel {info?.price - info?.delivery_price } */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.standard__info}>
      {info}
      {withIcon ? (
        <div className={styles.withIcon}>
          <div className={styles.details__withIcon_svg}>
            <DetailsPhone className={styles.details_svg} />
            <CollNumber number={1234567890} className={styles.collNumber} />
            {/* <a href="1234567890">1234567890</a> */}
          </div>
          <div className={styles.details__withIcon_svg}>
            <DetailsChat className={styles.details_svg} />
            <span className={styles.chat}>Կենդանի շփում</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Details;
