import '@fontsource-variable/vazirmatn'
import { Link } from 'react-router'
import { identity } from '../../content'
import { faNumber } from '../../shared/utils/fa'
import { archivedVersions, currentVersions } from '../../versions/registry'
import styles from './VersionGallery.module.css'

/** Index page: lists the current design versions for side-by-side review; `archive` lists the earlier ones. */
export function VersionGallery({ archive = false }: { archive?: boolean }) {
  const versions = archive ? archivedVersions : currentVersions
  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <img src={identity.images.campus} alt={identity.images.campusAlt} className={styles.photo} />
        <div>
          <h1 className={styles.title}>{archive ? 'بایگانی نسخه‌های پیشین' : `بازطراحی صفحه اصلی ${identity.name}`}</h1>
          <p className={styles.lede}>
            {archive
              ? `${faNumber(versions.length)} نسخه‌ای که پیش‌تر بررسی شدند. نشانی هر نسخه همچنان کار می‌کند.`
              : `${faNumber(versions.length)} نسخه با یک محتوای مشترک. همه نسخه‌ها از متن، سامانه‌ها و تقویم آموزشی بایگانی‌شده از hut.ac.ir استفاده می‌کنند و فقط در ترتیب اولویت و زبان بصری با هم فرق دارند.`}
          </p>
          <Link to={archive ? '/' : '/archive'} className={styles.switch}>
            {archive ? 'بازگشت به نسخه‌های فعلی' : `بایگانی (${faNumber(archivedVersions.length)} نسخه پیشین)`}
          </Link>
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
