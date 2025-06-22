import styles from "./Topbar.module.scss";
import Logo from "../../../assets/img/datamind-logo@3x.png";

const Topbar = () => {
  return (
    <div className={styles.Topbar}>
      <img src={Logo} alt="DataMind Logo" className={styles.logo} />
    </div>
  );
};

export default Topbar;
