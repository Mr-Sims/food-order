import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const ctx = useContext(CartContext);

    const numberOfCartItems = ctx.items.reduce((accumulator, item) => {
        return accumulator + item.amount
    }, 0);
    // const numberOfCartItems = ctx.items.length;
    
    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`
    
    const {items} = ctx;
    
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        
        const timer = setTimeout(() => {
            setButtonIsHighlighted(false)
        }, 200);

        return () => {
            clearTimeout(timer);
        }

    }, [items])
    
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;

