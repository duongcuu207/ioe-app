# IOE App — Landing Page

Trang giới thiệu và tải app IOE App ( [ioe.vn](https://ioe.vn/trang-chu)).
HTML/CSS/JS thuần, không framework, không build step — mở `index.html` là chạy.

## Nội dung

| | |
|---|---|
| `index.html` | Landing: hero, hành trình cuộc thi 2026–2027, 8 tính năng, 3 nhóm người dùng, quyền riêng tư, hướng dẫn cài đặt |
| `style.css` | Toàn bộ style. Palette lấy từ ioe.vn (`#0095da` xanh dương, vàng `#f0d75f`, tím `#9d4edd`, mint `#3ddc97`, coral `#ff695d`), font Montserrat + Baloo 2 |
| `app.js` | Nav shadow khi cuộn, menu mobile, reveal on scroll, copy số tài khoản, lightbox QR, toast |
| `assets/IOE.apk` | APK release đã ký (~300 KB) |
| `assets/logo.png` | Logo IOE |
| `assets/qr-donate.jpg` | Mã QR VietQR ủng hộ (Vietcombank · HUYNH HAI DUONG · 1072951559) |

Nút **Download IOE.apk** và khối **QR donate** nằm cạnh nhau ở section "Cài đặt".

## Chạy local

```bash
cd web
python -m http.server 8899      # hoặc: npx serve .
# mở http://127.0.0.1:8899
```

## Deploy

Static thuần — deploy lên Vercel, Netlify, GitHub Pages hoặc bất kỳ host tĩnh nào:

```bash
npx vercel --prod            # Vercel
# hoặc push lên GitHub rồi bật Settings → Pages (branch: main, folder: /web)
```

Nếu deploy GitHub Pages từ thư mục `web/`, đặt source là branch `main` và folder `/web`.

## Cập nhật APK

Copy APK mới vào `assets/IOE.apk` (đường dẫn build xem `../README.md`), rồi sửa "Phiên bản" trong `index.html` nếu đổi số hiệu.
