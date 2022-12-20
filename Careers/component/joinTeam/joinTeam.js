import React from "react";
import { useTranslation } from "react-i18next";
import Title from "../../../Title";
import { ReactComponent as One } from "../../../../assets/svg/one.svg";
import { ReactComponent as Two } from "../../../../assets/svg/two.svg";
import { ReactComponent as Tree } from "../../../../assets/svg/tree.svg";
import { ReactComponent as Four } from "../../../../assets/svg/four.svg";

import styles from "./joinTeam.module.css";

const JoinTeam = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.joinTeam}>
      <Title className={styles.joinTeam__title}>{t("join_team")}</Title>
      <div className={styles.joinTeam__border}>
        <div className={styles.joinTeam__info}>
          <div className={styles.joinTeam__box}>
            <One />
            <p>{t("disciplined")}</p>
          </div>

          <div className={styles.joinTeam__box_two}>
            <Two />
            <div>
              <p>{t("comte_problem")}</p>
            </div>
          </div>

          <div className={styles.joinTeam__box}>
            <Tree />
            <p>{t("hard_work")}</p>
          </div>

          <div className={styles.joinTeam__box}>
            <Four />
            <p>{t("fast_work")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
