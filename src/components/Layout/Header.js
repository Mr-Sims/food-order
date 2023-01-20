import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {

    return (
        <>
            <header className={classes.header}>
                <h1>Food</h1>
                <HeaderCartButton/>
            </header>

            <div className={classes['main-image']}>
                <img src={mealsImage} alt="mealsImage" />
            </div>

        </>
    );
};

export default Header;