# 📚 Nohera - Application de Gestion de Lecture

Nohera est une application web moderne pour suivre et gérer votre bibliothèque personnelle de livres. Créez votre collection, suivez vos lectures en cours, consultez vos statistiques et visualisez votre progression avec des graphiques interactifs.

## ✨ Fonctionnalités

### 📖 Gestion de Bibliothèque
- **Ajout de livres** : Enregistrez vos livres avec titre, auteur, catégorie, format, note et commentaires
- **Images** : Ajoutez des images de couverture à vos livres
- **Statuts de lecture** :
  - 📖 **En cours** : Livres que vous êtes en train de lire
  - ✅ **Terminé** : Livres que vous avez terminés avec durée de lecture
  - ❌ **Abandonné** : Livres que vous avez arrêtés en cours de route
- **Modification et suppression** : Modifiez ou supprimez vos livres à tout moment

### 🔍 Recherche
- Recherche en temps réel par titre, auteur ou catégorie
- Filtrage instantané dans tous les onglets

### 📊 Organisation par Onglets
- **Toutes mes lectures** : Vue complète de votre bibliothèque
- **Lecture actuelle** : Livres que vous lisez actuellement
- **Ce mois** : Livres lus ce mois-ci
- **Mois dernier** : Livres lus le mois dernier
- **Statistiques** : Graphiques et statistiques détaillées

### 📈 Statistiques et Graphiques
- **Statistiques globales** :
  - Total de livres
  - Livres terminés
  - Livres en cours
  - Livres abandonnés
  - Livres ce mois / cette année
  - Vitesse de lecture moyenne
- **Graphiques interactifs** :
  - 📊 Livres par mois (12 derniers mois)
  - 📊 Livres par année (5 dernières années)
  - 📈 Vitesse de lecture (évolution mensuelle)

### 💾 Persistance des Données
- Sauvegarde automatique dans le localStorage
- Vos données restent disponibles même après fermeture du navigateur

## 🚀 Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/himee17sama/Nohera.git
   cd Nohera
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   - Le serveur démarre généralement sur `http://localhost:5173`
   - Ouvrez cette URL dans votre navigateur

## ⚠️ Important

**Ne pas ouvrir `index.html` directement depuis le Finder !**

L'application doit être servie par le serveur de développement Vite. Ouvrir directement le fichier HTML causera des erreurs CORS.

## 📝 Utilisation

### Ajouter un livre

1. Remplissez le formulaire avec :
   - Titre et auteur (obligatoires)
   - Catégorie (menu déroulant)
   - Note de 1 à 5 étoiles
   - Date de début de lecture
   - Durée de lecture (si terminé)
   - Case "En cours de lecture" (si non terminé)
   - URL de l'image (optionnel)

2. Cliquez sur "Ajouter le livre"

### Modifier un livre

1. Cliquez sur "Modifier" sur la carte du livre
2. Modifiez les informations souhaitées
3. Changez le statut si nécessaire (En cours / Terminé / Abandonné)
4. Cliquez sur "Sauvegarder"

### Consulter les statistiques

1. Allez dans l'onglet "Statistiques"
2. Consultez les statistiques globales
3. Visualisez les graphiques de progression

## 🛠️ Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants React
│   ├── BookCard.tsx    # Carte d'affichage d'un livre
│   ├── BookForm.tsx    # Formulaire d'ajout de livre
│   ├── Charts.tsx       # Composants de graphiques
│   ├── Dashboard.tsx   # Tableau de bord
│   ├── ErrorBoundary.tsx # Gestion des erreurs
│   ├── Header.tsx      # En-tête de l'application
│   ├── Library.tsx     # Composant principal de bibliothèque
│   ├── ReadingStats.tsx # Statistiques de lecture
│   └── Tabs.tsx        # Système d'onglets
├── utils/              # Utilitaires
│   ├── bookFilters.ts  # Fonctions de filtrage des livres
│   └── generateTestData.ts # Génération de données de test
├── types.ts            # Types TypeScript
├── App.tsx             # Composant principal
└── main.tsx            # Point d'entrée de l'application
```

## 🎨 Catégories Disponibles

- Fiction
- Non-fiction
- Science-fiction
- Fantasy
- Romantasy
- Mystère
- Romance
- New-Romance
- Thriller
- Biographie
- Histoire
- Philosophie
- Développement personnel
- Jeunesse
- Bande dessinée
- Poésie
- Religion
- Théâtre
- Autre

## 📦 Technologies Utilisées

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et serveur de développement
- **LocalStorage** - Persistance des données
- **SVG** - Graphiques natifs (sans dépendances externes)

## 🚢 Déploiement

L'application est prête pour le déploiement sur Vercel, Netlify ou tout autre hébergeur statique.

### Déploiement sur Vercel

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement le projet Vite
3. Le déploiement se fera automatiquement

## 📄 Licence

Ce projet est privé.

## 👤 Auteur

Développé avec ❤️ pour la gestion de bibliothèque personnelle.

---

**Note** : Cette application utilise le localStorage du navigateur pour sauvegarder vos données. Pour une sauvegarde permanente, pensez à exporter régulièrement vos données ou à utiliser une solution de sauvegarde cloud.
