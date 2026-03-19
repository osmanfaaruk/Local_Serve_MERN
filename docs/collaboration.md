# Team Collaboration Guide 🤝

This guide explains **exactly** how you and your frontend partner should work together on this repository without overwriting each other's code.

---

## 🛑 Rule #1: Never work directly on `main` at the same time!
If you both edit the `main` branch at the same time, you will face **Merge Conflicts** (git gets confused whose code to keep). 

To prevent this, we use **Branches**.
*   **`main` branch**: This is the "Live" and "Final" version. It should always be working.
*   **Your branch**: A safe copy where you do your work without breaking the main code.

---

## 📖 Step-by-Step Workflow (How to Code Together)

### Step 1: Get the latest code before starting
Every time you open your computer to start working, always get the latest updates that your friend might have pushed while you were away.
```bash
# 1. Ensure you are on the main branch
git checkout main

# 2. Download the newest code from GitHub
git pull origin main
```

### Step 2: Create a new branch for your task
Don't write code yet! Create a new branch. Name it something that explains what you are doing.
```bash
# Create and switch to a new branch
git checkout -b feature/login-page

# Examples of good branch names:
# feature/provider-form-css
# fix/search-button
```

### Step 3: Write your code
Now you can safely write your code, edit HTML/JS/CSS, and save your files.

### Step 4: Save (Commit) your work locally
When a small piece of work is done (e.g., you finished the CSS for a button), save it. Don't wait until the end of the day.
```bash
# Stage all changes
git add .

# Save with a clear message
git commit -m "Add blue hover effect to search button"
```

### Step 5: Send (Push) your branch to GitHub
When your feature is complete and you want your friend to have it, push your *branch* to GitHub.
```bash
git push origin your-branch-name
# Example: git push origin feature/login-page
```

### Step 6: Merge it into `main` (Pull Request)
1. Go to your repository on **GitHub.com**.
2. You will see a green button saying **"Compare & pull request"**. Click it.
3. This asks GitHub to merge your `feature/login-page` into the final `main` branch.
4. Your friend can look at your code there. If it's good, click **"Merge pull request"**.

*After it's merged, both of you repeat **Step 1** to get the new `main` branch!*

---

## ⚠️ What if we get a Merge Conflict?

A conflict happens if you both edited the **exact same line of code** in the same file. Git won't know which one is correct.

**How to fix it:**
1. VS Code will highlight the conflicting file in red. Open it.
2. You will see weird markers like `<<<<<<< HEAD` and `======` and `>>>>>>> origin/main`.
3. VS Code will give you clickable buttons above the conflict:
    *   `Accept Current Change` (Keep your code)
    *   `Accept Incoming Change` (Keep your friend's code)
    *   `Accept Both Changes` (Keep both)
4. Click the right button, save the file, and then run:
```bash
git add .
git commit -m "Resolve merge conflict in index.html"
git push origin main
```

---
*Follow this guide, and your team will never lose code or break the project!*
