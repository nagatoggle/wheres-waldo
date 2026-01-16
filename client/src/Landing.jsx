import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router';
import { useOutletContext } from 'react-router';
import styles from './Landing.module.css'

export default function Landing() {
  const { characters, loading, error } = useOutletContext();

  const isButtonDisabled = characters.length === 0 || loading || error !== null;

  return (
    <div className={styles.layout}>
      <h1 className={styles.h1}>Xをさがせ!</h1>
      <section>
        <p>ゲーム説明: </p>
        <ol>
          <li>キャラクターを探す</li>
          <li>見つけたら左クリックする</li>
          <li>ドロップダウンメニューが表示されるので､見つけたキャラクターを選ぶ</li>
          <li>全員見つければクリア! (30位以内に入ると名前を登録できます)</li>
        </ol>
      </section>

      <section>
        <p>探すキャラクター: </p>
        <ul className={styles.ul}>
          {characters.map(c => (
            <li key={c.id} className={styles.li}>
              <span>{c.name}</span>
              {c.imageUrl && (
                <img className={styles.img} src={c.imageUrl} alt={c.id} width="558" height="1037" />
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.btn}>
        {!loading && (
          <Button
            variant="contained"
            disabled={isButtonDisabled}
            component={RouterLink}
            to="/game"
          >
            START
          </Button>
        )}
      </div>


    </div>
  );
}