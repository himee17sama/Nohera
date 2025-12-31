Nohera — Reading Tracker App

Nohera est une application web de suivi de lecture permettant de gérer, organiser et analyser ses lectures de manière simple et visuelle.
Le projet a été conçu avec une approche produit & UX, en mettant l’accent sur la clarté, la progression de lecture et la personnalisation.

⸻

 Objectifs du projet
	•	Centraliser ses lectures au même endroit
	•	Visualiser sa progression et ses habitudes de lecture
	•	Offrir une expérience simple, élégante et personnalisée
	•	Mettre en pratique React + TypeScript dans un projet concret

⸻

Fonctionnalités

📖 Gestion des livres
	•	Ajouter un livre (titre, auteur, catégorie, format, note, commentaire)
	•	Modifier les informations d’un livre
	•	Supprimer un livre
	•	Ajouter une image de couverture

 Organisation
	•	Statut de lecture :
	•	En cours
	•	Terminé
	•	Abandonné
	•	Catégories via menu déroulant
	•	Format du livre : papier, ebook ou audio

Lecture & suivi
	•	Système de notation avec étoiles
	•	Calcul du temps de lecture en jours à partir de la date de début
	•	Affichage du nombre total de livres

 Tableaux de bord & statistiques
	•	Total des livres enregistrés
	•	Onglets :
	•	Lectures en cours
	•	Lectures du mois précédent
	•	Toutes les lectures
	•	Statistiques de lecture :
	•	Nombre de livres lus
	•	Temps total de lecture
	•	Répartition par catégorie

Persistance des données
	•	Sauvegarde automatique via localStorage
	•	Données conservées après rechargement de la page

 Interface & design
	•	Design personnalisé (rose, nude et violet pâle)
	•	Composants réutilisables
	•	Interface responsive
	•	Expérience utilisateur simple et lisible

⸻

🧱 Stack technique
	•	React (Vite)
	•	TypeScript
	•	CSS
	•	LocalStorage
	•	Git & GitHub
	•	Vercel (déploiement)

⸻

🧠 Architecture du projet

src/
├── components/
│   ├── Header.tsx
│   ├── Dashboard.tsx
│   ├── Library.tsx
│   ├── BookForm.tsx
│   ├── BookCard.tsx
│   └── EditBookModal.tsx
├── types.ts
├── App.tsx
├── main.tsx
└── index.css


⸻

🧩 Modèle de données principal

export type BookStatus = 'en cours' | 'terminé' | 'abandonné';

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: BookStatus;
  format: 'papier' | 'ebook' | 'audio';
  rating: number;
  startDate: string;
  readingDays: number;
  comment: string;
  cover?: string;
};


⸻

Démo en ligne

 Application déployée sur Vercel
--> (lien à ajouter)

⸻

 Améliorations futures
	•	Authentification utilisateur
	•	Sauvegarde en base de données (Firebase / Supabase)
	•	Export des statistiques
	•	Mode sombre
	•	Filtres avancés (par note, durée, catégorie)

⸻

👩‍💻 À propos

Projet développé par Hime,
dans une démarche de montée en compétences en React, TypeScript et UX design,
avec une approche orientée produit et expérience utilisateur.
