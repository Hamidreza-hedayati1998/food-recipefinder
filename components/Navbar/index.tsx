import Link from 'next/link';
import { FaHome, FaHeart } from 'react-icons/fa';
import styles from './navbar.module.scss';
import Image from 'next/image';
import Searchfood from '../Searchfood';
import { Food } from '../../types/Foodtypes';
import NavLink from '../NavLink';

interface NavbarProps {
  foods: Food[];
  onSearchResults?: (results: Food[]) => void;
}

const Navbar = ({ foods, onSearchResults = () => {} }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoWrap}>
            <Image
              src="/foodmood-logo.png"
              alt="FoodMood Logo"
              width={120}
              height={40}
              quality={100}
              priority
            />
          </Link>
        </div>

        <div className={styles.navLinks}>
          <NavLink href="/" className={styles.navLink} exact>
            <FaHome className={styles.icon} />
            <span className={styles.linkText}>Home</span>
          </NavLink>

          <NavLink href="/FavoriteFood" className={styles.navLink} exact>
            <FaHeart className={styles.icon} />
            <span className={styles.linkText}>My Favorites</span>
          </NavLink>
        </div>

        <div className={styles.searchWrapper}>
          <Searchfood foods={foods} onSearchResults={onSearchResults} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
