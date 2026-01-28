# ADLR Website

Site vitrine ADLR.

## URLs

- **Production** : https://adlr.swigs.online
- **API Backend** : https://swigs.online/api
- **Slug** : `adlr`

## 🚀 Stack Technique

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM
- **SEO** : React Helmet Async
- **Icons** : Lucide React

## 💻 Développement Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
```

## Build

```bash
npm run build
```

## 🚀 Déploiement

```bash
# 1. SSH sur le serveur
ssh swigs@192.168.110.73

# 2. Pull les changements
cd ~/swigs-apps/adlr-website
git pull origin main

# 3. Build
npm install
npm run build

# 4. Copier vers le dossier web
sudo cp -r dist/* /var/www/adlr/
```

## 📂 Chemins Serveur

| Élément | Chemin |
|---------|--------|
| **Source** | `~/swigs-apps/adlr-website` |
| **Build** | `/var/www/adlr/` |

## 🌐 Variables d'Environnement

```env
# .env.production
VITE_API_URL=https://swigs.online/api
```
