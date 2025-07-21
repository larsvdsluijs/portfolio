# 🔒 Firebase Security Setup

## ⚠️ BELANGRIJK: API Key Veiligheid

Je Firebase API key staat momenteel in de repository. Dit is een veiligheidsrisico!

## 🚨 Directe Acties Nodig:

### 1. **Verwijder de API Key uit Git History**
```bash
# Voer dit uit in je terminal om de API key uit de git history te verwijderen
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch src/app/firebase/firebase.config.ts" \
  --prune-empty --tag-name-filter cat -- --all
```

### 2. **Force Push naar Remote**
```bash
git push origin --force --all
```

### 3. **Maak een Veilige Environment File**
Maak een nieuw bestand: `src/environments/environment.ts` (dit is al toegevoegd aan .gitignore)

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'JOUW_ECHTE_API_KEY_HIER',
    authDomain: 'shopping-list-e7a70.firebaseapp.com',
    projectId: 'shopping-list-e7a70',
    storageBucket: 'shopping-list-e7a70.firebasestorage.app',
    messagingSenderId: '229419963479',
    appId: 'JOUW_APP_ID_HIER'
  }
};
```

### 4. **Vervang de Placeholder Waarden**
- `JOUW_ECHTE_API_KEY_HIER` → Je echte Firebase API key
- `JOUW_APP_ID_HIER` → Je echte Firebase App ID

## 🔐 Waarom Dit Belangrijk Is:

- **API Keys zijn gevoelig** - Ze kunnen misbruikt worden
- **Git History blijft bestaan** - Zelfs na verwijderen
- **Public repositories** - Iedereen kan je keys zien
- **Firebase Security Rules** - Bescherm je database met regels

## 🛡️ Extra Beveiliging:

### Firebase Security Rules
Zet deze regels in je Firestore Database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /screens/{document} {
      allow read, write: if true; // Voor ontwikkeling
      // Later: allow read, write: if request.auth != null; // Voor productie
    }
  }
}
```

### Environment Bestanden
- `src/environments/environment.ts` → Development (lokaal)
- `src/environments/environment.prod.ts` → Productie (niet in git)

## ✅ Checklist:

- [ ] API key uit git history verwijderd
- [ ] Force push uitgevoerd
- [ ] Environment file aangemaakt met echte credentials
- [ ] .gitignore bevat environment bestanden
- [ ] Firebase security rules ingesteld
- [ ] App werkt nog steeds

## 🚀 Na Setup:

1. Test je app lokaal
2. Controleer of Firebase nog werkt
3. Commit alleen de placeholder waarden
4. Deel nooit je echte API keys 