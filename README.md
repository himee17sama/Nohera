# Nohera - Application de gestion de lecture

## Démarrage de l'application

### ⚠️ IMPORTANT : Ne pas ouvrir index.html directement !

Pour lancer l'application, vous devez utiliser le serveur de développement :

```bash
npm run dev
```

Ensuite, ouvrez votre navigateur et allez à :
**http://localhost:5173**

### Pourquoi ?

- Le fichier `index.html` utilise des imports de modules (`/src/main.tsx`) qui ne fonctionnent qu'avec un serveur HTTP
- Ouvrir directement le fichier HTML cause des erreurs CORS
- Le serveur Vite compile le TypeScript et gère les modules

### Commandes disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production
