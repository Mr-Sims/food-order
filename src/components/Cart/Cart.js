import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);

    const ctx = useContext(CartContext);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        ctx.addItem({ ...item, amount: 1 })
    };

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {ctx.items.map((item) =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            )}
        </ul>
    );

    const modalActions = <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
        {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div>

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </Modal>
    )
};

export default Cart;