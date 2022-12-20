import s from './index.module.css'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
    createAddress,
    searchAddresses,
} from '../../../redux/usersReducer'
import {updateAddress} from './../../../redux/usersReducer'
import {useTranslation} from 'react-i18next';

function NewAddress({
                        update,
                        data
                    }) {
    const dispatch = useDispatch()
    const {errors} = useSelector((state) => state.UsersPage);
    const [city, setCity] = useState('')
    const [cityId, setCityId] = useState('')
    const [entrance, setEntrance] = useState('')
    const [floor, setFloor] = useState('')
    const [apt, setApt] = useState('');
    const {t} = useTranslation();

    const {searchAddressesArray} = useSelector((state) => state.UsersPage)

    useEffect(() => {
        if (entrance != '' && apt != '' && floor != '') {
            document.getElementById('button').style.opacity = '1'
        } else {
            document.getElementById('button').style.opacity = '0.4'
        }
    }, [entrance, apt, floor, city])

    const handleClickSearchAddress = (e) => {
        dispatch(searchAddresses(city))
        setCity(e.target.value)
        document.getElementById('search').style.display = 'block'
    }

    const handleClickSearch = (e) => {
        document.getElementById('search').style.display = 'none'
        setCity(e.currentTarget.textContent)
        setCityId(e.currentTarget.id)
    }

    useEffect(() => {
        setApt(data?.flat)
        setEntrance(data?.entrance)
        setFloor(data?.floor)
        setCityId(data?.address_id)
        setCity(data?.address)

    }, [data])


    const handleClick = () => {
        const data1 = {
            floor: floor,
            entrance: entrance,
            flat: apt,
            address_id: cityId,
            selected: 'yes',
        }

        !data && dispatch(createAddress(data1))
        data?.id && dispatch(updateAddress(data1, data?.id))
    }

    return (
        <div className={s.main}>
            <p className={s.header}>{!update ? `${t("new_address")}` : `${t("change_address")}`} </p>
            <div className={s.item}>
                <p className={s.textpoqr}>{t("address")}</p>
                <input
                    className={s.code}
                    placeholder={`${t("address")}`}
                    value={city}
                    onChange={handleClickSearchAddress}
                />
                <div className={s.dropdown} id="search">
                    {searchAddressesArray?.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                id={item.address_id}
                                className={s.dropdownItem}
                                onClick={handleClickSearch}
                            >
                                {item.address}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={s.item1}>
                <div className={s.item}>
                    <p className={s.textpoqr1}>{t("entrance")}</p>
                    <input
                        className={s.codepoqr}
                        placeholder={`${t("entrance")}`}
                        value={entrance}
                        onChange={(e) => {
                            setEntrance(e.target.value)
                        }}
                    />
                    {errors?.response?.data?.errors?.entrance && (
                        <p className={s.error}>
                            {errors?.response?.data?.errors?.entrance}
                        </p>
                    )}
                </div>

                <div className={s.item}>
                    <p className={s.textpoqr1}>{t("floor")}</p>
                    <input
                        className={s.codepoqr}
                        placeholder={`${t("floor")}`}
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                    />
                    {errors?.response?.data?.errors?.floor && (
                        <p className={s.error}>{errors?.response?.data?.errors?.floor}</p>
                    )}
                </div>

                <div className={s.item}>
                    <p className={s.textpoqr1}>{t("apt")}</p>
                    <input
                        className={s.codepoqr}
                        placeholder={`${t("apt")}`}
                        value={apt}
                        onChange={(e) => {
                            setApt(e.target.value)
                        }}
                    />
                    {errors?.response?.data?.errors?.flat && (
                        <p className={s.error}>{errors?.response?.data?.errors?.flat}</p>
                    )}
                </div>
            </div>

            <button className={s.button} onClick={handleClick} id="button">
                {t("save")}
            </button>
        </div>
    )
}

export default NewAddress
