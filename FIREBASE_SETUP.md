# Firebase Setup voor WIDM Knoppen

## Stap 1: Firebase Project Aanmaken

1. Ga naar [Firebase Console](https://console.firebase.google.com/)
2. Klik op "Add project"
3. Geef je project een naam (bijvoorbeeld "widm-portfolio")
4. Volg de setup wizard

## Step 2: Firestore Database Instellen

1. Ga naar "Firestore Database" in het Firebase console
2. Klik op "Create database"
3. Kies "Start in test mode" (voor ontwikkeling)
4. Kies een locatie dicht bij je gebruikers

## Stap 3: Firebase Configuratie

1. Ga naar Project Settings (tandwiel icoon)
2. Scroll naar "Your apps" sectie
3. Klik op het web icoon (</>) om een web app toe te voegen
4. Geef je app een naam
5. Kopieer de configuratie object

## Stap 4: Configuratie Toepassen

Vervang de placeholder waarden in `src/app/firebase/firebase.config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "jouw-api-key",
  authDomain: "jouw-project-id.firebaseapp.com",
  projectId: "jouw-project-id",
  storageBucket: "jouw-project-id.appspot.com",
  messagingSenderId: "jouw-messaging-sender-id",
  appId: "jouw-app-id"
};
```

## Stap 5: Afbeeldingen Toevoegen

Vervang de placeholder afbeeldingen in `src/assets/img/widm/` met je eigen afbeeldingen:

- `green-screen.jpg` - Afbeelding voor groen scherm
- `default-screen.jpg` - Afbeelding voor standaard scherm  
- `red-screen.jpg` - Afbeelding voor rood scherm

## Hoe het Werkt

1. **WIDM Knoppen** (`/widm-knoppen`): Selecteer een scherm - updates worden live naar Firebase gestuurd
2. **WIDM Scherm** (`/widm-scherm`): Toont het geselecteerde scherm fullscreen - luistert naar Firebase updates
3. **Real-time Updates**: Alle wijzigingen worden direct gesynchroniseerd tussen alle openstaande pagina's

## Routes

- `/widm-knoppen` - Knoppen om scherm te selecteren
- `/widm-scherm` - Fullscreen scherm weergave
- Beide pagina's hebben geen navbar voor een volledig scherm ervaring 