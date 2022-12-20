import React, {useState, useEffect} from 'react'
import s from './index.module.css'
import vector from '../../../assets/vector.png'
import check from '../../../assets/check.png'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
    verification, verifyMessage, setSignup, setPassword, phoneVerify, setSignuporSignin, setSignin
} from './../../../redux/usersReducer'
import {useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next';
import sign from "../../../assets/about4.png";

function SignUp_Mobile({desktop}) {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [tel, setTel] = useState(localStorage.getItem("tel"))
    const [code, setCode] = useState('')
    const [disable, setDisable] = useState(true)
    const [checked, setChecked] = useState(false);
    const {verify, phone_verify} = useSelector((state) => state.UsersPage)
    const dispatch = useDispatch()

    const handleClick = () => {
   
        dispatch(verification(`+374${tel}`, code))
        
    }

    useEffect(() => {
        if (tel.length === 8) {
          dispatch(phoneVerify(`+374${tel}`));
        }
      }, [tel]);
    
      useEffect(() => {
         
        if (phone_verify?.exists === "no" || phone_verify?.is_verified === "no" ) {
          dispatch(setSignup(true));
           dispatch(setSignin(false));
          dispatch(setSignuporSignin(false));
          localStorage.setItem('tel', tel)          
    
        }
        if (phone_verify?.is_registered === "yes") {
         
          dispatch(setSignup(false));
          dispatch(setSignuporSignin(false));
          localStorage.setItem('tel', tel)
          navigate('/home')
          dispatch(setSignin(true));
         
        }
    
        if (
          phone_verify?.is_verified === "yes" &&
          phone_verify?.exists === "yes" &&
          phone_verify?.is_registered === "no"
        ) {
                       
          dispatch(setSignin(false));
          dispatch(setSignup(false));
          dispatch(setSignuporSignin(false));
          localStorage.setItem('tel', tel)
          navigate('/selfinfo')
    
        }
    
     }, [phone_verify]);


    useEffect(() => {
        const a = tel.slice(0, 1);
    
        if (tel.length === 8 && a != 0) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }, [tel.length]);

    useEffect(() => {
        if (verify) {
            localStorage.setItem('tel', tel)           
            dispatch(setSignup(false))
            navigate('/selfinfo')
            
        }
    }, [verify])

    useEffect(() => {
        if (tel.length === 8) {
            dispatch(verifyMessage(`+374${tel}`))
        }
    }, [tel])

    const handleChange = (e) => {
        setTel(e.target.value)
    }

    useEffect(() => {
     
        if (code.length === 8) {
             document.getElementById('button_confirm').style.background = '#3D9A85'
           setDisable(false)
        }
    }, [code])

    const handleClick_NewCode = () => {
        dispatch(verifyMessage(`+374${tel}`))
        setCode('')
        setDisable(true)
        document.getElementById('button_confirm').style.background = 'rgba(61, 154, 133, 0.4)'
    }

    return (<div className={s.main}>
       {desktop && <img
            src={vector}
            className={s.vector}
            onClick={() => {
                navigate(-1)
            }}
        />}

        <p className={s.header}>  {t("signup")}</p>

        <p
            className={s.text}
         
        >
            {t("signupText")}
        </p>

        <p className={s.textpoqr}> {t("tel")} </p>
        <div className={s.inputs}>
            <input
                readOnly
               
                className={s.country_code}
                value={`+374`}
            />

            <input
               
                className={s.tel_code}
                type="tel"
                id="phone"
                name="phone"
                value={tel}
                placeholder="(XX)-XX-XX-XX"
                pattern="([0-9]{2}) [0-9]{2} [0-9]{2} [0-9]{2}"
                onChange={handleChange}
                required
            />
             {checked && <img src={sign} className={s.sign} />}
        </div>

        <p className={s.textpoqr}> {t("code")}</p>

        <input
            className={s.code}
            value={code}
            onChange={(e) => {
                if(e.target.value.length<9){
                setCode(e.target.value)}
            }}
        />
     
        <p className={s.text_kapuyt} onClick={handleClick_NewCode}>
           {t("new_code")}
        </p>

        <button
            onClick={handleClick}
            id="button_confirm"
            disabled={disable}         
            className={s.button}
        >

        {t("confirm")}
        </button>
    </div>
    )
}

export default SignUp_Mobile
