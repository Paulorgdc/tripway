# MEMORY — TRIPWAY
Plataforma de planejamento de viagens e otimização de roteiros (Projeto Integrador, UNIVAG).

## Stack
- `backend/`: Python · Django ≥5 + Django REST Framework · gunicorn · SQLite (`db.sqlite3`); apps `core`, `trips`, `users`
- `frontend/`: React 19.1 · Vite 7 (PWA, `dev-dist/`) · ESLint · npm

## Comandos
- backend: `pip install -r requirements.txt` · `python manage.py migrate` · `python manage.py runserver`
- frontend: `npm install` · `npm run dev` · `npm run build` · `npm run preview` · `npm run lint`

## Variáveis de ambiente
- backend: SECRET_KEY, DEBUG, ALLOWED_HOSTS (`backend/.env.example`)
- frontend: VITE_API_BASE_URL (`frontend/.env.example`)

## Regras de ouro
1. API em DRF; o frontend consome só a API, com CORS via django-cors-headers.
2. Login aceita e-mail ou username, via backend de autenticação customizado (app `users`).
3. Lógica de viagens/roteiros fica no app `trips`; mudanças de modelo exigem migration.
