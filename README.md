# TradePulse

A simple personal trading journal. The home page shows your account balance, previous loss recovery, a fresh daily reminder and one quick form to log a trade (with charges), a no-trade day or a holiday. Your history and calendar are on a separate History tab.

Everything runs in the browser. Your data is stored in your own browser (localStorage) and never leaves your device.

## Deploy on GitHub Pages

1. Create a new repository on GitHub (for example `tradepulse`).
2. Upload `index.html`, `style.css`, `app.js` and `README.md` to the root of the repository.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then Save.
5. After a minute your site is live at `https://YOUR-USERNAME.github.io/tradepulse/`.

## Good to know

- The page is public (anyone with the link can open it), but trades you enter are saved only in your own browser, so others never see your numbers.
- Data is stored per browser and per web address. Moving to the GitHub address starts empty: use **Copy backup** on the old page and **Restore** on the new one.
- Clearing browser data erases your journal, so copy a backup now and then.

## Files

- `index.html` page layout
- `style.css` design, light and dark themes
- `app.js` all the logic
