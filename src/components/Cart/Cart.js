import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const ctx = useContext(CartContext);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        ctx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);

        await fetch('https://fir-react-http-deb7f-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user: userData,
                orderedItems: ctx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        ctx.clearItems()
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

    const cartModalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </>

    const isSubmittinModalContent = <p>Sending order data!</p>;

    const didSubmitModalContent = <p>Successfully sent the order! Your food is on its way! :)</p>


    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittinModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
};

export default Cart;