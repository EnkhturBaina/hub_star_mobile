## BUILD хийх тохиргоонууд

**Note**

## contants.js (IOS_VERSION, ANDROID_VERSION) UPDATE хийх

## app.json (version, ios->buildNumber, android->versionCode) UPDATE хийх

1. eas build --platform android //ANDROID BUILD
2. eas submit -p android --latest //ANDROID SUBMIT TO PLAY STORE
3. eas build --platform ios //IOS BUILD
4. eas submit -p ios --latest //ANDROID SUBMIT TO APP STORE

5. eas build -p android --profile preview2 //ANDROID BUILD APK FILE

npm install expo@49
npm install expo@latest

npx expo-doctor
npx expo install --fix

eas update --branch development --message "Fixes typo"

## CHECK

eas update:configure and follow all the steps.

eas build --profile production – don't forget to increase the build number

eas submit -p ios --latest in order to have the last build on testflight and also make sure you update the app in your phone.

eas update after this, force close the app 2-3 times and you'll see the changes.
