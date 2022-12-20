import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import ShoppingDate from "../shoppingDate";
import Popup from "../../../Popup";
import { ReactComponent as ShoppingDataSvg } from "../../../../assets/svg/shoppingDataSvg.svg";
import styles from "./shoppingInfo.module.css";
import AccordionProducts from './../../../AccordionProducts/accordionProducts';
import { useSelector, useDispatch } from 'react-redux';
import { setModalShow } from "../../../../redux/shoppingHistoryReducer";


const ShoppingInfo = ({ className, shoppingHistoryData}) => {
  const { t } = useTranslation();
  const { search, searchShoppingHistory, modalShow } = useSelector(
    (store) => store.shoppingHistoryPage
  );
  const dispatch = useDispatch()
  const openSearchDataPopup = () => {
    dispatch(setModalShow(!modalShow))
  };


  return (
    <div className={clsx(className)}>
      <div className={styles.title_popup}>
        <div>
          <span className={styles.info_title}>{t("my_orders")}</span>
        </div>
        <div className={styles.popup} onClick={openSearchDataPopup}>
          <ShoppingDataSvg />      
        </div>   
         {modalShow ? (
            <Popup mode1={true} url={`/shoppingHistory`}  key={Math.random()} >
              <ShoppingDate />
            </Popup>
          ) : null}
      </div>      
      <AccordionProducts  list={search? searchShoppingHistory: shoppingHistoryData} />
    </div>
  );
};
export default ShoppingInfo;
