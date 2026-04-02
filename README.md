# 🎮 XR3B Dashboard - لوحة التحكم الاحترافية

Dashboard كامل للتحكم في بوت Discord الخاص بك مع Discord OAuth2

---

## ✨ المميزات

- ✅ تسجيل دخول بـ Discord OAuth2
- ✅ لوحة تحكم شاملة
- ✅ إعدادات لكل سيرفر
- ✅ تفعيل/تعطيل الميزات
- ✅ إحصائيات مباشرة
- ✅ تصميم احترافي responsive

---

## 🚀 النشر على Render (الطريقة السهلة)

### **الخطوة 1: إعداد Discord Application**

1. اذهب لـ: https://discord.com/developers/applications
2. اختر التطبيق (البوت)
3. اذهب لـ **OAuth2** → **General**
4. أضف Redirect URL (سنضيفه بعد النشر)
5. احفظ **Client ID** و **Client Secret**

### **الخطوة 2: رفع على GitHub**

```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### **الخطوة 3: النشر على Render**

1. اذهب لـ: https://render.com
2. **Sign Up** أو **Log In**
3. اضغط **New +** → **Web Service**
4. اربط GitHub واختر المشروع
5. الإعدادات:
   - **Name:** `xr3b-dashboard`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. اضغط **Create Web Service**

### **الخطوة 4: Environment Variables**

في Render Dashboard، اذهب لـ **Environment**:

```
DISCORD_CLIENT_ID=your_client_id_here
DISCORD_CLIENT_SECRET=your_client_secret_here
BOT_TOKEN=your_bot_token_here
SESSION_SECRET=random_secret_string_here
CALLBACK_URL=https://your-app-name.onrender.com/api/auth/callback
```

### **الخطوة 5: تحديث Discord OAuth**

1. ارجع لـ Discord Developers
2. OAuth2 → Redirects
3. أضف الـ URL:
   ```
   https://your-app-name.onrender.com/api/auth/callback
   ```
4. احفظ

---

## 🏠 التشغيل المحلي (Local)

### **1. تنصيب:**
```bash
npm install
```

### **2. ملف .env:**
```bash
cp .env.example .env
```

عدّل `.env`:
```env
DISCORD_CLIENT_ID=YOUR_CLIENT_ID
DISCORD_CLIENT_SECRET=YOUR_CLIENT_SECRET
BOT_TOKEN=YOUR_BOT_TOKEN
SESSION_SECRET=random_string
CALLBACK_URL=http://localhost:3000/api/auth/callback
```

### **3. تشغيل:**
```bash
npm start
```

افتح: http://localhost:3000

---

## 📂 هيكل المشروع

```
xr3b-dashboard/
├── public/
│   ├── index.html      # الصفحة الرئيسية
│   └── dashboard.html  # Dashboard UI
├── server.js           # Backend Server
├── package.json        # المكتبات
├── .env.example        # مثال الإعدادات
├── .gitignore          # ملفات مستثناة
└── README.md           # الشرح
```

---

## 🔧 الربط مع البوت

Dashboard يتصل بالبوت عبر API. للربط الكامل:

1. البوت يجب أن يكون شغّال
2. إضافة API endpoints في البوت (اختياري)
3. Database للحفظ (MongoDB/PostgreSQL)

---

## 📝 ملاحظات مهمة

### **Render Free Tier:**
- ✅ مجاني 100%
- ✅ HTTPS تلقائي
- ⚠️ ينام بعد 15 دقيقة بدون نشاط
- ⚠️ أول request بعد النوم بطيء (30 ثانية)

### **الحل للنوم:**
استخدم **Uptime Robot** (مجاني):
1. https://uptimerobot.com
2. أضف monitor نوع **HTTP(s)**
3. URL: `https://your-app.onrender.com`
4. Interval: **5 minutes**

---

## 🛠️ استكشاف الأخطاء

### **"Application did not respond" في Discord:**
- تأكد من CALLBACK_URL صحيح
- تأكد من Redirect URL في Discord

### **"Not authenticated":**
- تأكد من Session Secret موجود
- امسح cookies وجرّب مرة ثانية

### **Dashboard فاضي:**
- تأكد من البوت في السيرفرات
- تأكد من صلاحيات MANAGE_GUILD

---

## 📞 الدعم

مشكلة؟ تواصل معنا!

---

**Made with ❤️ for XR3B Community**
