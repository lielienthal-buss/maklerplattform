# Yacht Platform - B2B Dashboard für Yachtmakler

Eine moderne B2B-Webplattform, die Yachtmaklern dabei hilft, Listings von verschiedenen Marktplätzen automatisiert zu sammeln, zu analysieren und zu verwalten.

## 🚀 Quick Start

### Voraussetzungen
- Python 3.11+
- Node.js 18+
- pnpm (für Frontend)

### Backend starten

```bash
cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

Der Backend-Server läuft auf http://localhost:8000

### Frontend starten

```bash
cd frontend/yacht-dashboard
pnpm install
pnpm run dev --host
```

Das Frontend läuft auf http://localhost:5173

## 🔐 Standard-Anmeldedaten

**Admin-Account:**
- E-Mail: admin@yachtplatform.com
- Passwort: admin123

## 📋 Features

### ✅ Implementiert (MVP)
- Benutzerregistrierung und -anmeldung
- Rollenbasierte Zugriffskontrolle (User/Admin)
- Demo-Scraping für 3 Yacht-Plattformen
- Intelligente Deduplizierung von Listings
- Attraktivitäts-Scoring-System
- Responsive Dashboard mit Filteroptionen
- Admin-Panel für Benutzerverwaltung
- Rechtlicher Compliance-Disclaimer

### 🔄 In Entwicklung
- Echte Scraper für Yacht-Portale
- Gespeicherte Suchen
- Export-Funktionen
- Erweiterte Filteroptionen
- Mobile Optimierung

## 🏗️ Architektur

### Backend (FastAPI)
- **API**: RESTful API mit automatischer Dokumentation
- **Datenbank**: SQLite (MVP) → PostgreSQL (Produktion)
- **Authentifizierung**: JWT-basierte Sicherheit
- **Scraping**: Modulares System mit Fehlerbehandlung

### Frontend (React)
- **UI**: Moderne Komponenten mit Shadcn/UI
- **Styling**: Tailwind CSS für responsive Design
- **Routing**: React Router für Navigation
- **State**: React Hooks für Zustandsverwaltung

## 📊 API-Dokumentation

Die vollständige API-Dokumentation ist verfügbar unter:
http://localhost:8000/docs (Swagger UI)

### Wichtige Endpunkte
- `POST /auth/login` - Benutzeranmeldung
- `POST /auth/register` - Benutzerregistrierung
- `GET /listings` - Yacht-Listings abrufen
- `POST /scrape` - Scraping starten
- `POST /deduplicate-and-score` - Deduplizierung ausführen

## ⚖️ Rechtliche Hinweise

Diese Plattform nutzt Web-Scraping-Technologien. Nutzer sind verpflichtet:

1. Die Nutzungsbedingungen der Ziel-Websites zu beachten
2. DSGVO-Compliance bei personenbezogenen Daten sicherzustellen
3. Rechtliche Beratung vor produktiver Nutzung einzuholen

Ein umfassender rechtlicher Disclaimer ist in der Anwendung integriert.

## 🔧 Entwicklung

### Projektstruktur
```
yacht_platform/
├── backend/                 # FastAPI Backend
│   ├── main.py             # Haupt-API-Server
│   ├── models.py           # Datenbankmodelle
│   ├── scrapers.py         # Scraping-Module
│   └── deduplication.py    # Deduplizierung & Scoring
├── frontend/               # React Frontend
│   └── yacht-dashboard/    # Haupt-Anwendung
└── LEGAL_DISCLAIMER.md     # Rechtliche Hinweise
```

### Datenbank-Schema
- **YachtListing**: Yacht-Informationen mit Metadaten
- **User**: Benutzerkonten mit Rollen
- **SavedSearch**: Gespeicherte Suchfilter
- **ScrapeLog**: Audit-Trail für Scraping

### Entwickler-Tools
- **Backend**: Automatische API-Dokumentation, Hot-Reload
- **Frontend**: Vite für schnelle Entwicklung, ESLint für Code-Qualität
- **Datenbank**: SQLAlchemy ORM mit Migrationen

## 🚀 Deployment

### Lokale Entwicklung
Beide Server (Backend und Frontend) können parallel laufen. Das Frontend proxy-t API-Anfragen automatisch an das Backend.

### Produktion
- Backend: Uvicorn/Gunicorn mit Reverse Proxy
- Frontend: Statische Dateien über CDN/Nginx
- Datenbank: PostgreSQL mit Backup-Strategie
- Monitoring: Health-Checks und Logging

## 📈 Roadmap

### Phase 2 (3-6 Monate)
- Echte Scraper für Top-10 deutsche Yacht-Portale
- Automatisches Scheduling für regelmäßige Updates
- AIS/MMSI-Integration für verbesserte Deduplizierung
- Basis-CRM-Funktionen für Lead-Management

### Phase 3 (6-12 Monate)
- Enterprise-Features (SSO, SLA, erweiterte Admin-Tools)
- ML-basierte Bildanalyse und Kategorisierung
- Partner-APIs und offizielle Integrationen
- Mobile App für iOS/Android

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch
3. Committe deine Änderungen
4. Erstelle einen Pull Request

## 📄 Lizenz

Dieses Projekt ist für den internen Gebrauch bestimmt. Alle Rechte vorbehalten.

## 🆘 Support

Bei Fragen oder Problemen:
1. Prüfe die API-Dokumentation unter /docs
2. Überprüfe die Logs in der Konsole
3. Kontaktiere das Entwicklungsteam

---

**Hinweis**: Dies ist eine MVP-Version für Demonstrationszwecke. Für den produktiven Einsatz sind zusätzliche Sicherheits- und Compliance-Maßnahmen erforderlich.

