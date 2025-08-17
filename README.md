# 💕 Trang Mời Xem Phim Cute

Một landing page dễ thương để mời bạn gái đi xem phim với phong cách pastel cute!

## 🎬 Tính năng

- ✨ Giao diện pastel cute với hiệu ứng animation dễ thương
- 🎲 Random hiển thị lời mời và tiêu đề
- 💖 Hiệu ứng confetti khi đồng ý
- 📅 Cho phép chọn ngày khác nếu bận
- 🔊 Âm thanh nhẹ nhàng khi click
- 😊 Tooltip troll nhẹ khi cố thoát trang
- 📱 Responsive hoàn hảo trên mọi thiết bị
- 🔗 SEO optimized cho social sharing
- 🔔 Discord webhook notifications khi có tương tác

## 🚀 Cách sử dụng

### 1. Tùy chỉnh thông tin
Mở file `app.js` và chỉnh sửa object `config`:

```javascript
const config = {
    inviterName: "Tên của bạn",
    movieTitle: "Tên phim",
    cinema: "Tên rạp",
    datetime: "2025-08-20T19:30:00+07:00", // Format: YYYY-MM-DDTHH:mm:ss+07:00
    seats: "H10–H11",
    contact: {
        zalo: "0123456789",
        phone: "0123456789"
    },
    discordWebhook: "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL" // Tùy chọn
};
```

### 2. Cấu hình Discord Webhook (Tùy chọn)
Để nhận thông báo khi có người tương tác với trang web:

1. Tạo webhook trong Discord server của bạn
2. Copy URL webhook và paste vào `config.discordWebhook`
3. Bạn sẽ nhận được thông báo khi:
   - Có người đồng ý đi xem phim
   - Có người muốn đổi lịch
   - Có người chọn ngày mới

### 3. Thêm ảnh Open Graph
Tạo một file ảnh `og-image.png` (1200x630px) để hiển thị đẹp khi share link trên Facebook/Zalo.

### 4. Deploy
- Upload tất cả files lên hosting
- Hoặc sử dụng GitHub Pages, Netlify, Vercel...
- Share link cho crush của bạn! 💕

## 📁 Cấu trúc files

```
gift/
├── index.html      # Cấu trúc HTML
├── style.css       # Thiết kế giao diện
├── app.js         # Logic và tương tác
├── og-image.png   # Ảnh preview khi share (tùy chọn)
└── README.md      # File này
```

## 🎨 Tùy chỉnh thêm

### Thay đổi màu sắc
Chỉnh sửa các biến CSS trong file `style.css`:

```css
:root {
    --pink-pastel: #FF8FAB;
    --pink-light: #FFD6E7;
    --blue-baby: #BDE0FE;
    --purple-light: #FFC6FF;
    --text-gray: #4A4A4A;
}
```

### Thêm lời mời
Thêm vào mảng `invitationMessages` trong `app.js`:

```javascript
const invitationMessages = [
    "Lời mời của bạn...",
    // Thêm nhiều câu khác
];
```

## 🌟 Tips

- Test kỹ trên điện thoại trước khi gửi
- Chọn phim mà bạn biết crush thích
- Timing là quan trọng - đừng gửi lúc crush đang bận
- Chuẩn bị kế hoạch B nếu crush chọn "Hôm khác nha"
- Discord webhook sẽ giúp bạn biết ngay khi có phản hồi từ crush

## 💝 Good luck!

Chúc bạn thành công! Remember: Confidence is key! 🎬✨
