# Seyed Amin Hosseini — Personal Portfolio

یک وب‌سایت رزومه و پورتفولیوی تک‌صفحه‌ای، RTL و واکنش‌گرا که با React، TypeScript و Vite ساخته شده است.

## اجرا

```bash
pnpm install
pnpm dev
```

## ساخت خروجی production

```bash
pnpm build
```

فایل‌های قابل‌ویرایش رزومه در `src/data/profile.ts` قرار دارند. کامپوننت اصلی در `src/main.tsx` و استایل‌ها در `src/styles.css` هستند.

## موارد SEO

- متا تگ‌های title، description، Open Graph و Twitter Card
- Canonical URL
- JSON-LD Person
- `public/robots.txt` و `public/sitemap.xml`
- HTML معنایی، ناوبری قابل‌دسترسی و کنتراست مناسب
