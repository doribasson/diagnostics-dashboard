import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FaBell, FaFile, FaIndustry } from "react-icons/fa";
import { ImInfo } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.side_logo}>
        <Link to="/">
          <FaIndustry size={15} />
        </Link>
      </div>
      <ul className={styles.top}>
        <li>
          <Link to="/info">
            <ImInfo size={15} color="white" />
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <FaBell size={15} color="white" />
          </Link>
        </li>
        <li>
          <Link to="/files">
            <FaFile size={15} color="white" />
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <IoSettingsOutline size={15} color="white" />
          </Link>
        </li>
      </ul>
      <ul className={styles.bottom}>
        <li>
          <Link to="/logout">
            <FaArrowRightFromBracket size={15} color="white" />
          </Link>
        </li>
        <li className={styles.bottom_logo}>DB</li>
      </ul>
    </div>
  );
};

export default Sidebar;
