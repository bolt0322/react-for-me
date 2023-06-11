import PropTypes from "prop-types";
import style from "./Button.module.css";

function Button({text}) {
    return <button className={style.btn1}>{text}</button>;
}
function Btn({text}) {
    return <button className={style.btn2}>{text}</button>;
}


Button.propTypes = {
    text: PropTypes.string.isRequired,
}; 

export default Button;  //App.js에서 Button을 가져올 수 있게 하기 위함.
console.log(style);