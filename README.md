# 🎂 The Cakewalk With Taruna — Website

A luxurious, full-stack bakery website with a WhatsApp order system.

---

## 📁 Project Structure

```
cakewalk/
├── frontend/
│   ├── index.html     ← Main website
│   ├── style.css      ← All styles
│   └── main.js        ← Scroll animations, form logic
└── backend/
    ├── server.js      ← Express server + Twilio WhatsApp
    ├── package.json
    ├── orders.json    ← Auto-created: local backup of orders
    └── .env.example   ← Copy to .env and fill in credentials
```

---

## 🚀 Setup Instructions

### Step 1 — Install Node.js
Download from https://nodejs.org (choose LTS version)

### Step 2 — Install Dependencies
```bash
cd cakewalk/backend
npm install
```

### Step 3 — Set Up Twilio (Free)
1. Create a free account at https://www.twilio.com
2. Go to Console → Get your **Account SID** and **Auth Token**
3. Go to **Messaging → Try it out → Send a WhatsApp message**
4. Follow the sandbox setup (send the join code to the Twilio sandbox number)
5. Your number `+91 94014 39292` must send the join code once to activate

### Step 4 — Configure Environment
```bash
cp .env.example .env
```
Open `.env` and fill in:
- `TWILIO_ACCOUNT_SID` — from Twilio console
- `TWILIO_AUTH_TOKEN` — from Twilio console
- `TWILIO_WHATSAPP_FROM` — keep as `+14155238886` for sandbox
- `BAKERY_PHONE` — `919401439292` (already set)
- `ADMIN_SECRET` — choose any secret password

### Step 5 — Run the Server
```bash
npm start
```
Open your browser at http://localhost:3000

---

## 📱 How Orders Work

1. Customer fills the order form on the website
2. Form submits to `POST /api/order` on your server
3. Server sends a formatted WhatsApp message to **+91 94014 39292**
4. Order is also saved to `orders.json` as a backup
5. If server is unreachable, the website opens WhatsApp directly as a fallback

### WhatsApp Message Format
```
🧁 NEW ORDER — The Cakewalk

👤 Customer: Priya Sharma
📞 Phone: +91 98765 43210

🛍️ Items:
2kg Birthday Cake (chocolate, fondant finish)

📅 Pickup: Saturday, 15 June 2025, 11:00 AM
📝 Notes: Pink flowers please

— Sent via The Cakewalk website
```

---

## 🖼️ Replacing Placeholder Photos

The website currently uses Unsplash placeholder images. To use your own:

1. Put your photos in `frontend/images/` folder
2. Open `frontend/index.html`
3. Find `<img src="https://images.unsplash.com/...">` tags
4. Replace the `src` with your local path, e.g. `src="images/hero.jpg"`

**Recommended photo sizes:**
- Hero: 1600×900px
- Menu cards: 600×400px
- Gallery: 600×600px (square)
- About: 800×600px

---

## 📊 View All Orders

Visit: `http://localhost:3000/api/orders?secret=YOUR_ADMIN_SECRET`

---

## 🌐 Deploy to the Internet (Optional)

To make the website publicly accessible:

**Option A — Railway (easiest, free tier):**
1. Create account at https://railway.app
2. Connect your GitHub repo
3. Add your `.env` variables in Railway's dashboard
4. Done — Railway gives you a public URL

**Option B — Render:**
1. Create account at https://render.com
2. New Web Service → connect your repo
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && node server.js`

---

## 🎨 Customisation

| What to change | Where |
|---|---|
| Bakery name | `index.html` — search "Cakewalk" |
| Phone number | `backend/.env` → `BAKERY_PHONE` |
| Menu items & prices | `index.html` → `#menu` section |
| Reviews | `index.html` → `#reviews` section |
| Colours | `frontend/style.css` → `:root` variables |
| Address & hours | `index.html` → footer and order sections |

---

*Built with love for The Cakewalk With Taruna 🍰*
