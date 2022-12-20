import s from "./userAddress.module.css";
import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    deleteAddress,
    getAllAddresses,
    updateAddress,
} from "../../redux/usersReducer";
import Address from "./Address";
import NewAddress from "./NewAddress";
import {useTranslation} from 'react-i18next';

function UserAddress({}) {
    const {addresses} = useSelector(
        (state) => state.UsersPage
    );
    const {lang} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const selectedAddressIdRef = useRef();
    const [editableItem, setEditableItem] = useState(null);
    const [mode, setMode] = useState(false);
    const [modalToggle, setModalToggle] = useState(false);
    const [update, setUpdate] = useState(false);
    const {t} = useTranslation();


    useEffect(() => {
        dispatch(getAllAddresses());
    }, [lang]);

    const handleClickAddressItem = (item) => {
        const data = {
            selected: "yes",
            address_id: item.address_id,
            floor: item.floor,
            flat: item.flat,
            entrance: item.entrance,
        };

        dispatch(updateAddress(data, item.id));
    };

    const modalShow = (id) => {
        selectedAddressIdRef.current = id;
        setModalToggle(true);
    };
    const handleDelete = (type) => {

        type === "delete" && dispatch(deleteAddress(selectedAddressIdRef.current));
        setModalToggle(false);
    };

    const handleClickUpdate = (item) => {
        setEditableItem(item);
        setUpdate(true);
    };
    const handleClick = () => {
        setMode(true);
    };
    return (
        <>
            {!mode && !modalToggle && !update && (
                <div className={s.content}>
                    <p className={s.header}>{t("shipp_address")}</p>
                    <p className={s.text}>
                        {t("three_address")}
                    </p>

                    {addresses?.map((item, index) => {
                        return (
                            <React.Fragment key={item.id}>
                                <Address
                                    entrance={item.entrance}
                                    floor={item.floor}
                                    flat={item.flat}
                                    address={item.address}
                                    handleClick={() => handleClickAddressItem(item)}
                                    selectedAddress={item.selected === "yes"}
                                />

                                <div className={s.box}>
                                    {addresses.length > 1 && <p
                                        className={s.greenText}
                                        onClick={() => modalShow(item.id)}
                                    >
                                        {t("delete_address")}
                                    </p>}
                                    <button className={s.buttonSmall} onClick={() => handleClickUpdate(item)}>
                                        {t("change_address")}
                                    </button>
                                </div>
                            </React.Fragment>
                        );
                    })}

                    {addresses?.length <= 2 && (
                        <button className={s.buttonBig} onClick={handleClick}>
                            {t("new_address")}
                        </button>
                    )}
                </div>
            )}
            {mode && !modalToggle && !update && <NewAddress/>}
            {modalToggle && (
                <div className={s.box1}>
                    <p className={s.text1}>  {t("delete_address1")}</p>
                    <div className={s.box}>
                        <p className={s.greenText} onClick={handleDelete}>
                            {t("close")}
                        </p>
                        <button
                            className={s.buttonSmall}
                            onClick={() => handleDelete("delete")}
                        >
                            {t("delete")}
                        </button>
                    </div>
                </div>
            )}
            {update && (
                <NewAddress
                    update
                    data={editableItem}
                />
            )}
        </>
    );
}

export default UserAddress;
