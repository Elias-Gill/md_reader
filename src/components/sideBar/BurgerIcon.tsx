import Svg from "../../assets/burger-menu.svg";
import "./styles.css"

export default function BurgerIcon() {
    return (
        <div>
            <img className="filter-green" src={Svg} width="30px" height="30px" />
        </div>
    );
}
