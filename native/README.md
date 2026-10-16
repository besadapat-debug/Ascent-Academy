# Ascent Academy apps (Windows, macOS, Android, iPhone)

All four apps open your live site, so **every change you publish shows up in the apps
automatically**. You never rebuild an app just because the website changed.

## Get the installers (no software needed on your computer)
1. On GitHub open the repo, then the **Actions** tab, then **Build apps**, then **Run workflow**.
2. Wait about 10 to 15 minutes. Open the finished run and download from **Artifacts**:
   - `windows-installer`: Windows setup .exe
   - `mac-dmg`: Mac disk image (.dmg), Apple Silicon and Intel
   - `android-apk`: Android app (.apk), install it directly on a phone
   - `ios-xcode-project`: iPhone project to open in Xcode (see below)

## Change the website address
Edit `native/app.config.json` (the `url` line), then run **Build apps** again.
Do this after you rename the Netlify project.

## Windows and Mac
Unsigned apps show a warning the first time.
- Windows: "Windows protected your PC" then **More info** then **Run anyway**.
- Mac: right-click the app then **Open**, or run `xattr -cr "/Applications/Ascent Academy.app"`.
Signing certificates remove the warnings (Windows code-signing certificate, Apple Developer account).

## Android
The .apk installs on any phone (allow "install unknown apps"). For Google Play you need a
Play developer account (one-off US$25) and a signed release build (.aab).

## iPhone
iPhones only install apps from the App Store or TestFlight. You need an Apple Developer
account (US$99 a year) and a Mac with Xcode: unzip `ios-xcode-project`, open
`ios/App/App.xcodeproj`, pick your team under Signing, then Product, Archive, Distribute.
Apple can reject apps that are only a website, so plan to add a native feature
(for example push notifications) before you submit.

## Run on your own computer instead
In the `native` folder: `npm install`, then `npm start` (desktop window), or
`npm run dist:win` / `npm run dist:mac` on that operating system.
