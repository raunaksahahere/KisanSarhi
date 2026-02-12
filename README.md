# KisanSarthi

KisanSarthi is a responsive landing page refactored into a modular, scalable **React** app using **Vite**.

## Tech Stack

- React (Vite)
- Framer Motion (scroll/entrance animations)
- Context + hooks (language + toasts)

## Project Structure

```
Kisan/
  kisansarthi/
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
```bash
cd kisansarthi
```
```powershell
npm install
npm run dev
```

Open the URL printed by Vite (typically http://127.0.0.1:5173/).

## Notes

- **Language Selection**: Users can switch between English and Hindi and Bengali. The selection is saved in localStorage.
- **Toast Notifications**: Success and error messages are displayed using a custom toast component.
- **Scroll Animations**: Framer Motion is used to animate components on scroll.