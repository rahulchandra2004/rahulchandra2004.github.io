# 🚀 How to Deploy to your GitHub Profile Repository

Your special GitHub profile repository is located at:  
👉 **[https://github.com/rahulchandra2004/rahulchandra2004](https://github.com/rahulchandra2004/rahulchandra2004)**

---

### Option 1: Quick Git Push (Recommended)

Run the following commands inside this `github-profile` directory:

```bash
# 1. Navigate to this folder
cd "c:\Users\Rahul\Desktop\Portfolio\github-profile"

# 2. Initialize git if not already initialized
git init -b main

# 3. Add all files (README.md and assets/)
git add .

# 4. Commit your changes
git commit -m "feat: launch elite developer profile README with pixel mosaic portrait"

# 5. Link your GitHub profile repo
git remote add origin https://github.com/rahulchandra2004/rahulchandra2004.git

# 6. Push to main (force push if repo has existing files like license/initial commit)
git push -u origin main --force
```

---

### Option 2: Drag & Drop or Copy Files

If you already have `rahulchandra2004` cloned elsewhere:
1. Copy the `README.md` file and the `assets/` folder from:
   `c:\Users\Rahul\Desktop\Portfolio\github-profile\`
2. Paste them into the root of your `rahulchandra2004` repository.
3. Commit and push:
   ```bash
   git add README.md assets/
   git commit -m "Update profile README with pixel mosaic portrait and projects"
   git push
   ```

---

### 🎨 Included Assets
- **`assets/rahul_pixel_card.png`**: Framed HUD card with tactile beveled square pixel tiles of Rahul Chandra.
- **`assets/rahul_pixel.png`**: High-resolution transparent background pixel art mosaic.
- **`assets/ArcP.png`**, **`Robot.png`**, **`Dashboard.jpeg`**, **`Gas.jpeg`**, **`MNIST.jpeg`**: High-fidelity project previews.
