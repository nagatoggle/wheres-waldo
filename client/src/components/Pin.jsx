import pinIcon from '../assets/pin.svg';
import styles from './Pin.module.css';

export default function Pin({ xPercent, yPercent }) {
  return (
    <img
      src={pinIcon}
      alt='pin'
      className={styles.pin}
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`
      }}
    />
  )
}