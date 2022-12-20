import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import TextInput from "../../../TextInput";
import Button from "../../../Button/Button";
import styles from "./shoppingDate.module.css";
import { getSearchShoppingHistory } from "../../../../redux/shoppingHistoryReducer";
import { useTranslation } from 'react-i18next';
import { setModalShow } from './../../../../redux/shoppingHistoryReducer';


const ShoppingDate = ({ className }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { start_data: "", end_data: "" } });

  const onSubmit = handleSubmit((data) => {   
    dispatch(getSearchShoppingHistory(data));
    dispatch(setModalShow(false))
  });


  return (
    <div className={clsx(className, styles.date_box)}>
      <TextInput
        type="date"
        name="start_data"
        placeholder={"from"}        
        control={control}
        errors={errors}
        className={styles.date_from}
      />
      <TextInput
        type="date"
        name="end_data"
        placeholder={"to"}
        control={control}
        errors={errors}
        className={styles.date_to}
      />
      <Button className={styles.btn} onClick={onSubmit}>
      {t("search")}
      </Button>
    </div>
  );
};
export default ShoppingDate;
