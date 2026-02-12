# KisanSarthi

KisanSarthi is a responsive landing page refactored into a modular, scalable **React** app using **Vite**.

## Tech Stack

- React (Vite)
- Framer Motion (scroll/entrance animations)
- Context + hooks (language + toasts)

## Project Structure

```
Kisan/
  kisansarthi-react/
    public/
    src/
      components/
      context/
      hooks/
      data/
      pages/
      services/
```

## Run Locally

From the repository root:

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (typically http://127.0.0.1:5173/).

## Notes

- Language selection persists via localStorage.
- Toast notifications replace manual DOM toast creation.
- Scroll-triggered animations are handled by Framer Motion.

