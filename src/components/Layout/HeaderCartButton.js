import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext)

    // const numberOfCartItems = ctx.items.reduce((accumulator, item) => {
    //     return accumulator + item.amount
    // }, 0);

    const numberOfCartItems = ctx.items.length;
    return (
        <button onClick={props.onClick} className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;

