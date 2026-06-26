# InboxOS

> An AI-powered Inbox Operating System — not just another email client.

InboxOS sits on top of your existing email provider and acts as a **decision + execution layer**. It understands every incoming email, prioritizes what matters, extracts deadlines and action items, and routes information to the right place automatically.

---

## 🏗️ Architecture

```
Email → AI Understanding → Decision Engine → Actions → Delivery (Telegram/WhatsApp/Dashboard)
```

### Monorepo Structure

```
inboxos/
├── apps/
│   ├── web/              # React + Vite frontend (port 5173)
│   └── api/              # FastAPI backend (port 8000)
├── packages/
│   ├── core/             # Shared schemas + base classes
│   ├── email-connectors/ # Gmail, Outlook, IMAP
│   ├── parsers/          # HTML→text, signature stripping
│   ├── intelligence/     # AI classification + extraction
│   ├── rules-engine/     # Rule evaluation logic
│   ├── actions/          # Task/calendar/label modules
│   └── outputs/          # WhatsApp, Telegram, Slack adapters
├── docker/
├── docs/
└── scripts/
```

---

## 🚀 Quick Start

### Docker (Recommended)

```bash
# 1. Clone
git clone https://github.com/your-org/inboxos.git
cd inboxos

# 2. Configure
cp .env.example .env
# Edit .env with your API keys

# 3. Start everything
docker-compose up -d

# 4. Run migrations
docker-compose exec api alembic upgrade head

# 5. Open dashboard
# http://localhost:5173
```

### Manual Setup (Development)

**Backend:**
```bash
cd apps/api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../../.env.example ../../.env
uvicorn main:app --reload
# API: http://localhost:8000
# Docs: http://localhost:8000/docs
```

**Frontend:**
```bash
cd apps/web
npm install
npm run dev
# App: http://localhost:5173
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Zustand |
| Backend | FastAPI, SQLAlchemy, Alembic |
| Database | PostgreSQL (prod), SQLite (dev) |
| Cache | Redis |
| Task Queue | Celery |
| AI | OpenAI / Gemini / Ollama (mock in dev) |

---

## 🗺️ Roadmap

- **v1 (Weeks 1-4):** Gmail connector, AI classification, WhatsApp alerts, dashboard
- **v2 (Weeks 5-8):** Multi-channel, smart routing, calendar integration, expense tracking
- **v3 (Weeks 9-12):** Plugin system, local AI, reply assistant, team inbox

---

## 🤝 Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for module ownership, code standards, and PR guidelines.

**Entry points for beginners:**
- Output adapters (Telegram/Discord)
- Parser improvements
- Dashboard UI components
- Unit tests

---

## 📄 License

MIT — See [LICENSE](LICENSE)