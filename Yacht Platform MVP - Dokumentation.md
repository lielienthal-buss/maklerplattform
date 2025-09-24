# Yacht Platform MVP - Dokumentation

## Überblick

Die Yacht Platform ist eine B2B-Webplattform für Yachtmakler, die automatisiert Listings von verschiedenen Yacht-Marktplätzen scraped und in einem übersichtlichen Dashboard aufbereitet. Diese MVP-Version implementiert die Kernfunktionalitäten gemäß den ursprünglichen Anforderungen und berücksichtigt die identifizierten rechtlichen und technischen Risiken.

## Implementierte Features

### 1. Rechtliche Compliance
- **Rechtlicher Haftungsausschluss**: Umfassender Disclaimer bezüglich Scraping und DSGVO-Compliance
- **Nutzerverantwortung**: Klare Kommunikation, dass Nutzer für die Einhaltung der Quellen-ToS verantwortlich sind
- **DSGVO-Hinweise**: Aufklärung über Datenschutzverantwortung bei personenbezogenen Daten

### 2. Scraping-Modul (Demo-Implementation)
- **Drei Demo-Plattformen**: YachtWorld, Boats.com, und Yachtall (simulierte Daten)
- **On-Demand Scraping**: Manueller Trigger über Dashboard-Button
- **Datenstruktur**: Vollständige Erfassung aller relevanten Yacht-Daten
- **Fehlerbehandlung**: Robuste Logging-Mechanismen für Scraping-Ergebnisse

### 3. Benutzer- und Rollenverwaltung
- **Sichere Authentifizierung**: JWT-basierte Anmeldung mit Passwort-Hashing
- **Rollenbasierte Zugriffskontrolle**: User und Admin-Rollen
- **Registrierung**: Selbstregistrierung für neue Makler
- **Admin-Panel**: Vollständige Benutzerverwaltung für Administratoren

### 4. Dashboard und Datenvisualisierung
- **Übersichtliches Interface**: Moderne, responsive Benutzeroberfläche
- **Statistiken**: Echtzeit-Übersicht über Listings, Nutzer und Systemstatus
- **Listing-Anzeige**: Detaillierte Darstellung aller Yacht-Listings
- **Filteroptionen**: Umfangreiche Such- und Filterfunktionen

### 5. Deduplizierung und Scoring
- **Intelligente Duplikatserkennung**: Multi-Kriterien-Algorithmus basierend auf HIN/MMSI, Titel, Marke/Modell
- **Attraktivitäts-Scoring**: Regelbasiertes Bewertungssystem für Listing-Qualität
- **Automatische Verarbeitung**: On-Demand Ausführung über Dashboard

## Technische Architektur

### Backend (Python/FastAPI)
- **Framework**: FastAPI für moderne, schnelle API-Entwicklung
- **Datenbank**: SQLite für MVP (einfach zu PostgreSQL migrierbar)
- **Authentifizierung**: JWT-Token mit sicherer Passwort-Verschlüsselung
- **CORS**: Vollständige Cross-Origin-Unterstützung für Frontend-Integration

### Frontend (React)
- **Framework**: React mit modernen Hooks und Router
- **UI-Komponenten**: Shadcn/UI für professionelle Benutzeroberfläche
- **Styling**: Tailwind CSS für responsive Design
- **State Management**: React Hooks für lokale Zustandsverwaltung

### Datenmodell
- **YachtListing**: Vollständige Yacht-Informationen mit Metadaten
- **User**: Benutzerkonten mit Rollen und Profilinformationen
- **SavedSearch**: Gespeicherte Suchfilter (Grundstruktur implementiert)
- **ScrapeLog**: Audit-Trail für alle Scraping-Aktivitäten

## Sicherheitsfeatures

### Authentifizierung und Autorisierung
- SHA256-Passwort-Hashing für sichere Speicherung
- JWT-Token mit 24-Stunden Gültigkeit
- Rollenbasierte Zugriffskontrolle für Admin-Funktionen
- Sichere API-Endpunkte mit Token-Validierung

### Datenintegrität
- Transaktionale Datenbankoperationen
- Fehlerbehandlung mit Rollback-Mechanismen
- Eingabevalidierung auf Frontend und Backend
- SQL-Injection-Schutz durch ORM (SQLAlchemy)

## Deployment-Bereitschaft

### Lokale Entwicklung
- Backend läuft auf Port 8000 (http://localhost:8000)
- Frontend läuft auf Port 5173 (http://localhost:5173)
- Automatische Code-Reload für Entwicklung
- Umfassende API-Dokumentation unter /docs

### Produktions-Vorbereitung
- Umgebungsvariablen für Konfiguration
- CORS-Konfiguration für verschiedene Domains
- Health-Check-Endpunkt für Monitoring
- Strukturierte Logging für Debugging

## Benutzerhandbuch

### Erste Schritte
1. **Registrierung**: Neue Makler können sich selbst registrieren
2. **Anmeldung**: Sichere Anmeldung mit E-Mail und Passwort
3. **Dashboard**: Übersicht über aktuelle Listings und Statistiken
4. **Scraping starten**: "Start Scraping" Button für Datenaktualisierung
5. **Deduplizierung**: "Deduplicate & Score" für Datenbereinigung

### Admin-Funktionen
- **Benutzerverwaltung**: Aktivierung/Deaktivierung von Benutzerkonten
- **System-Monitoring**: Einsicht in Scraping-Logs und Systemstatistiken
- **Datenübersicht**: Vollständige Kontrolle über Plattform-Daten

### Listings durchsuchen
- **Filteroptionen**: Marke, Preis, Baujahr, Länge, Standort
- **Sortierung**: Nach Attraktivitäts-Score oder anderen Kriterien
- **Detailansicht**: Vollständige Listing-Informationen mit Originallink

## Rechtliche Hinweise für Nutzer

### Scraping-Compliance
Die Plattform implementiert einen umfassenden rechtlichen Disclaimer, der Nutzer über folgende Punkte aufklärt:

- **Terms of Service**: Viele Marktplätze verbieten automatisiertes Scraping
- **Rechtliche Verantwortung**: Nutzer tragen die volle Verantwortung für ToS-Compliance
- **DSGVO-Compliance**: Nutzer sind für Datenschutz bei personenbezogenen Daten verantwortlich
- **Haftungsausschluss**: Plattform-Betreiber übernehmen keine Haftung für Scraping-Aktivitäten

### Empfohlene Maßnahmen
- Rechtliche Beratung vor Nutzung einholen
- ToS der Ziel-Marktplätze sorgfältig prüfen
- Wo möglich, offizielle APIs oder Partnerschaften bevorzugen
- Respektvolle Scraping-Praktiken einhalten

## Nächste Entwicklungsschritte

### Phase 2 (3-6 Monate)
- **Echte Scraper**: Implementation für tatsächliche Yacht-Portale
- **Erweiterte Plattformen**: Integration der Top-10 deutschen Marktplätze
- **Automatisches Scheduling**: Regelmäßige Scraping-Läufe
- **AIS/MMSI Integration**: Verbesserte Deduplizierung durch Schiffsdaten
- **CRM-Integration**: Basis-Lead-Management-Funktionen

### Phase 3 (6-12 Monate)
- **Enterprise Features**: SSO, SLA, erweiterte Admin-Funktionen
- **Bildanalyse**: ML-basierte Bilderkennung und -kategorisierung
- **Partner-APIs**: Offizielle Integrationen mit Marktplätzen
- **Mobile App**: Native mobile Anwendung für unterwegs
- **Advanced Analytics**: Markttrend-Analysen und Prognosen

### Technische Verbesserungen
- **Skalierung**: Migration zu Microservices-Architektur
- **Performance**: Elasticsearch für erweiterte Suchfunktionen
- **Monitoring**: Umfassendes Application Performance Monitoring
- **Security**: Penetration Tests und Security Audits
- **Backup**: Automatisierte Backup- und Recovery-Systeme

## Fazit

Diese MVP-Implementation stellt eine solide Grundlage für eine professionelle B2B-Yacht-Plattform dar. Sie berücksichtigt sowohl die funktionalen Anforderungen als auch die kritischen rechtlichen und technischen Aspekte, die in der ursprünglichen Analyse identifiziert wurden.

Die Plattform ist bereit für erste Pilotnutzer und kann schrittweise zu einer vollwertigen Produktionslösung ausgebaut werden. Der modulare Aufbau ermöglicht eine flexible Weiterentwicklung entsprechend den Marktanforderungen und dem Nutzerfeedback.

