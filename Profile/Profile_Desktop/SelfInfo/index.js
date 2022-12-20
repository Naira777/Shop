import React, { useEffect, useRef, useState } from "react";
import s from "./index.module.css";
import { edit, vector } from "../../../images";
import eye from "../../../../assets/eye.png";
import { useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../../../redux/usersReducer";
import Popup from "../../../Popup";
import PopupComponent from "../../../PopupComponent/PopupComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';


function SelfInfo({ mobile }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { errors, update } = useSelector((state) => state.UsersPage);

  const inputref1 = useRef();
  const inputref2 = useRef();
  const inputref3 = useRef();
  const inputref4 = useRef();

  const refMain = useRef();

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isSurName, setIsSurName] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(localStorage.getItem("password"));
  const [mode, setMode] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    setName(localStorage.getItem("user_name"));
    setSurName(localStorage.getItem("user_surname"));
    setEmail(localStorage.getItem("user_email"));
    setPassword(localStorage.getItem("password"));
  }, [mode]);

  useEffect(() => {
    if (name != "") {
      setIsName(false);

      document.getElementById("editbox1").style.transform = "translateY(-35px)";
      document.getElementById("name").style.color = "rgba(33, 33, 33, 0.8)";
    }

    if (surname != "") {
      setIsSurName(false);
      document.getElementById("editbox2").style.transform = "translateY(-35px)";
      document.getElementById("surname").style.color = "rgba(33, 33, 33, 0.8)";
    }

    if (email != "") {
      setIsEmail(false);
      document.getElementById("editbox3").style.transform = "translateY(-35px)";
      document.getElementById("email").style.color = "rgba(33, 33, 33, 0.8)";
    }

    if (password != "") {
      setIsPass(false);
      document.getElementById("editbox4").style.transform = "translateY(-35px)";
      document.getElementById("password").style.color = "rgba(33, 33, 33, 0.8)";
    }
  }, [surname, name, email, password]);

  const buttonClick = () => {
    if (name == "") {
      setIsName(true);
      inputref1.current.style.border = "1px solid red";
      document.getElementById("editbox1").style.transform = "translateY(-55px)";
      document.getElementById("name").style.color = "red";
    }

    if (surname == "") {
      setIsSurName(true);
      inputref2.current.style.border = "1px solid red";
      document.getElementById("editbox2").style.transform = "translateY(-55px)";
      document.getElementById("surname").style.color = "red";
    }

    if (email == "") {
      setIsEmail(true);
      inputref3.current.style.border = "1px solid red";
      document.getElementById("editbox3").style.transform = "translateY(-55px)";
      document.getElementById("email").style.color = "red";
    }

    if (password == "") {
      setIsPass(true);
      inputref4.current.style.border = "1px solid red";
      document.getElementById("editbox4").style.transform = "translateY(-55px)";
      document.getElementById("password").style.color = "red";
    }

    if (name != "" && surname != "" && email != " " && password != "") {
      dispatch(updateInfo(name, surname, email, password));
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_surname", surname);
      localStorage.setItem("user_email", email);
      localStorage.setItem("password", password);
      if (update) {
        setMode(!mode);
      }
    }
  };

  const handleClick = () => {
    inputref2.current.style.border = "1px solid #999999";
    inputref3.current.style.border = "1px solid #999999";
    inputref4.current.style.border = "1px solid #999999";
    inputref1.current.style.border = "1px solid #999999";
  };

  useEffect(() => {
    refMain?.current?.addEventListener("click", handleClick);

    return () => {
      refMain?.current?.removeEventListener("click", handleClick);
    };
  }, [refMain.current]);

  const click = (num) => {
    if (num === 1) {
      inputref1.current.focus();
      inputref1.current.style.border = "1px solid #3D9A85";
      inputref2.current.style.border = "1px solid #999999";
      inputref3.current.style.border = "1px solid #999999";
      inputref4.current.style.border = "1px solid #999999";
    }
    if (num === 2) {
      inputref2.current.focus();
      inputref2.current.style.border = "1px solid #3D9A85";
      inputref1.current.style.border = "1px solid #999999";
      inputref3.current.style.border = "1px solid #999999";
      inputref4.current.style.border = "1px solid #999999";
    }

    if (num === 3) {
      inputref3.current.focus();
      inputref3.current.style.border = "1px solid #3D9A85";
      inputref2.current.style.border = "1px solid #999999";
      inputref1.current.style.border = "1px solid #999999";
      inputref4.current.style.border = "1px solid #999999";
    }

    if (num === 4) {
      inputref4.current.focus();
      inputref4.current.style.border = "1px solid #3D9A85";
      inputref2.current.style.border = "1px solid #999999";
      inputref3.current.style.border = "1px solid #999999";
      inputref1.current.style.border = "1px solid #999999";
    }
  };

  function passwordShow() {
    const x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className={s.main}>
      {mobile &&  <img src={vector} className={s.vector} onClick={()=>navigate(-1)} />}
      <div className={s.content} ref={refMain}>
        <div className={s.content1}>
          <p className={s.header}> {t("personal_info")} </p>

          <div>
            <div className={s.textpoqr} id="name">
              {t("name")}
            </div>

            <input
              className={s.input}
              ref={inputref1}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={() => click(1)}
            />
            {isName && (
              <div
                className={s.textpoqr}
                style={{ color: "red", marginTop: "-0.2px" }}
              >
                {t("required_field")}
              </div>
            )}
            <div className={s.editbox} id="editbox1" onClick={() => click(1)}>
              <img src={edit} className={s.edit} />
            </div>
          </div>
          {errors && name != "" && (
            <div
              className={s.textpoqr1}
              style={{ color: "red", marginTop: "-0.8px" }}
            >
              {errors?.errors?.name}{" "}
            </div>
          )}

          <div>
            <div className={s.textpoqr} id="password">
              {t("password")}
            </div>
            <input
              id="passwordInput"
              className={s.input}
              value={password}
              type="password"
              ref={inputref4}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => click(4)}
            />
            <img src={eye} className={s.eye} onClick={passwordShow} />

            {isPass && (
              <div
                className={s.textpoqr}
                style={{ color: "red", marginTop: "-0.2px" }}
              >
                {t("required_field")}
              </div>
            )}
            <div className={s.editbox} onClick={() => click(4)} id="editbox4">
              <img src={edit} className={s.edit} />
            </div>
          </div>

          {errors && email != "" && (
            <p
              className={s.textpoqr1}
              style={{ color: "red", marginTop: "-0.8px" }}
            >
              {errors?.errors?.password}{" "}
            </p>
          )}

          <div>
            <div className={s.textpoqr} id="surname">
              {t("lastName")}
            </div>
            <input
              className={s.input}
              value={surname}
              ref={inputref2}
              onChange={(e) => setSurName(e.target.value)}
              onClick={() => click(2)}
            />
            {isSurName && (
              <div
                className={s.textpoqr}
                style={{ color: "red", marginTop: "-0.2px" }}
              >
                {t("required_field")}
              </div>
            )}
            <div className={s.editbox} onClick={() => click(2)} id="editbox2">
              <img src={edit} className={s.edit} />
            </div>
          </div>
          {errors && surname != "" && (
            <div
              className={s.textpoqr1}
              style={{ color: "red", marginTop: "-0.8px" }}
            >
              {errors?.errors?.surname}{" "}
            </div>
          )}

          <div>
            <div className={s.textpoqr} id="email">
              {t("email")}
            </div>
            <input
              className={s.input}
              value={email}
              type="email"
              ref={inputref3}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => click(3)}
            />
            {isEmail && (
              <div
                className={s.textpoqr}
                style={{ color: "red", marginTop: "-0.2px" }}
              >
                *Այս դաշտը պարտադիր է
              </div>
            )}
            <div className={s.editbox} onClick={() => click(3)} id="editbox3">
              <img src={edit} className={s.edit} />
            </div>
          </div>

          {errors && email != "" && (
            <div
              className={s.textpoqr1}
              style={{ color: "red", marginTop: "-0.8px" }}
            >
              {errors?.errors?.email}{" "}
            </div>
          )}

          <button className={s.button} onClick={buttonClick}>
            {t("save")}
          </button>
        </div>
      </div>
      {update && (
        <Popup mode1={true}>
          <PopupComponent
            mobile={mobile}
            url={`/categories`}
            buttonText={`${t("doShopping")}`}
            text={`${t("self_info")}`}
          />
        </Popup>
      )}
    </div>
  );
}

export default SelfInfo;
