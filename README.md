# Web Application de To-Do List

## Description
Ce projet est une application web de gestion de tâches (To-Do List) développée avec Django et React. L'application permet aux utilisateurs de créer un compte, de créer des tâches, de les marquer comme terminées et de les supprimer. Le projet est également conteneurisé avec Docker et Docker Compose, ce qui facilite le déploiement et la gestion de l'application.

## Fonctionnalités principales

- **Authentification utilisateur**: Les utilisateurs peuvent créer un compte et se connecter pour accéder à leurs propres tâches.
- **Création de tâches**: Les utilisateurs peuvent créer de nouvelles tâches en spécifiant un titre et une description.
- **Marquage des tâches terminées**: Les utilisateurs peuvent marquer les tâches comme terminées une fois qu'elles sont accomplies.
- **Suppression de tâches**: Les utilisateurs peuvent supprimer les tâches qu'ils ne souhaitent plus voir dans leur liste.

## Technologies utilisées

- **Python**: Le backend de l'application est développé en utilisant le framework Django, qui permet de gérer les requêtes HTTP, les modèles de données et les opérations de base de données.
- **React**: Le frontend de l'application est développé en utilisant la bibliothèque React, qui facilite la création d'interfaces utilisateur interactives.
- **HTML/CSS**: Les pages web de l'application sont créées en utilisant HTML pour la structure et CSS pour la mise en forme.
- **Base de données**: Les données des utilisateurs et des tâches sont stockées dans une base de données, qui est gérée par Django.
- **Docker**: Le projet est conteneurisé à l'aide de Docker, ce qui permet de créer un environnement de développement cohérent et portable.
- **Docker Compose**: Docker Compose est utilisé pour orchestrer les conteneurs Docker et faciliter le déploiement de l'application.
- **Nginx**: Nginx est utilisé comme serveur Web pour servir l'application aux utilisateurs.

## Installation

1. Clonez ce référentiel sur votre machine locale en utilisant la commande suivante:
   ```
   git clone https://github.com/WassimZo/TODO.git
   ```

2. Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.

3. Accédez au répertoire racine du projet:
   ```
   cd ./TODO
   ```

4. Lancez les conteneurs Docker à l'aide de Docker Compose:
   ```
   docker-compose up -d
   ```

5. Accédez à l'application dans votre navigateur en visitant `http://127.0.0.1`.


## Auteurs

- Zouaoui Wassim
