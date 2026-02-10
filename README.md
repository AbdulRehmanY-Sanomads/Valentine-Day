# Interactive Website Instructions

This folder contains your interactive personalization website. 

## How to Use & Share


1. **Personalize**: 
   - To send a personalized link, simply add `?name=YourFriendName` to the end of the URL.
   - Example (Local): `file:///d:/Valentine%20Day/index.html?name=John`
   - Example (Hosted): `https://your-site.com/?name=Sarah`

## How to Edit "No" Messages

1. Open `script.js` in any text editor (Notepad, VS Code, etc.).
2. Look for the list starting with `const noMessages = [`.
3. Add, remove, or change the text inside the quotes.
   ```javascript
   const noMessages = [
       "No way!", 
       "Please say yes!",
       "New message here!"
   ];
   ```

## Files
- `index.html`: The main page structure.
- `style.css`: The styling and colors.
- `script.js`: The logic for buttons and personalization.
- `assets/`: Contains images (keep this folder with the others).
