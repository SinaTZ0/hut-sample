import '@fontsource-variable/vazirmatn'
import { Link } from 'react-router'
import { identity } from '../../content'
import { faNumber } from '../../shared/utils/fa'
import { versions } from '../../versions/registry'
import styles from './VersionGallery.module.css'

/** Index page: lists every registered design version for side-by-side review. */
export function VersionGallery() {
  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <img src={identity.images.campus} alt={identity.images.campusAlt} className={styles.photo} />
        <div>
          <h1 className={styles.title}>بازطراحی صفحه اصلی {identity.name}</h1>
          <p className={styles.lede}>
            {faNumber(versions.length)} نسخه با یک محتوای مشترک. همه نسخه‌ها از متن، سامانه‌ها و تقویم آموزشی بایگانی‌شده از
            hut.ac.ir استفاده می‌کنند و فقط در ترتیب اولویت و زبان بصری با هم فرق دارند.
          </p>
        </div>
      </header>

      <ol className={styles.list} role="list">
        {versions.map((v) => (
          <li key={v.id} className={styles.item}>
            <Link to={`/${v.slug}`} className={styles.card}>
              <span className={styles.slug} lang="en" dir="ltr">
                {v.nameEn}
              </span>
              <span className={styles.name}>{v.name}</span>
              <span className={styles.emphasis}>{v.emphasis}</span>
              <span className={styles.concept}>{v.concept}</span>
              <span className={styles.swatches} aria-hidden="true">
                {v.swatches.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </span>
              <span className={styles.fonts} lang="en" dir="ltr">
                {v.fonts}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className={styles.note}>
        برای دیدن خط زمانی در روزهای دیگر ترم، به نشانی صفحه <code dir="ltr">?today=1405-09-28</code> اضافه کنید.
      </p>
    </main>
  )
}
