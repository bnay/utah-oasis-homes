# Utah Oasis Homes Website
## Check-In, Build, and Deployment Runbook

**Project folder**

```text
C:\Projects\utah-oasis-homes
```

**Framework**

- Astro static site
- Source content is compiled at build time
- Deployment output is the contents of `dist`
- Do not upload files from `src` directly to the web server
- Do not upload Markdown files directly; rebuild the site after content changes
- Do not run `npm audit fix --force`
- Do not upgrade Astro without a separate migration and regression-testing plan

---

# 1. Open PowerShell in the project

```powershell
cd C:\Projects\utah-oasis-homes
```

Confirm the location:

```powershell
Get-Location
```

Expected:

```text
C:\Projects\utah-oasis-homes
```

---

# 2. Review the current changes

Check repository status:

```powershell
git status
```

Review a summary of changed files:

```powershell
git diff --stat
```

Review the actual changes:

```powershell
git diff
```

For a specific file:

```powershell
git diff -- path\to\file
```

Example:

```powershell
git diff -- src\components\Footer.astro
```

Before committing, confirm that:

- every changed file is intentional
- no temporary files or backup files are included
- no preview ZIP file is being committed
- no image-backup folders are inside the repository
- no unrelated whitespace-only changes are present

---

# 3. Run Astro diagnostics

```powershell
npm exec astro check
```

Expected result:

```text
Result (... files):
- 0 errors
- 0 warnings
- 0 hints
```

Do not continue to deployment if diagnostics report errors.

---

# 4. Create a production build

```powershell
npm run build
```

Expected:

```text
Build complete
```

The generated static site is placed in:

```text
C:\Projects\utah-oasis-homes\dist
```

Important:

- `dist` is generated output
- deploy the contents of `dist`
- do not deploy the `src` directory
- do not upload Markdown content files directly
- a content or tag change can affect multiple generated pages, tag routes, metadata, structured data, and the sitemap

---

# 5. Review the repository again

After diagnostics and build:

```powershell
git status
```

The build should not introduce unexpected tracked-file changes.

Review all intended changes one final time:

```powershell
git diff
```

---

# 6. Stage the intended files

## Stage specific files — preferred

```powershell
git add path\to\file1 path\to\file2
```

Example:

```powershell
git add src\components\Footer.astro src\styles\global.css
```

For changed home Markdown files:

```powershell
git add src\content\homes\*.md
```

## Stage everything — use only after reviewing `git status`

```powershell
git add .
```

Avoid `git add .` when unrelated files may be present.

---

# 7. Review the staged changes

Show staged-file summary:

```powershell
git diff --cached --stat
```

Show the complete staged diff:

```powershell
git diff --cached
```

Confirm that only the intended files and edits are staged.

To unstage a file without discarding its edits:

```powershell
git restore --staged path\to\file
```

---

# 8. Commit the changes

Use a concise message describing the completed work:

```powershell
git commit -m "Describe the completed change"
```

Examples:

```powershell
git commit -m "Add social media links to footer"
```

```powershell
git commit -m "Update home service area tags"
```

```powershell
git commit -m "Optimize homepage hero assets"
```

---

# 9. Push to GitHub

```powershell
git push
```

Then verify:

```powershell
git status
```

Expected:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Optional history check:

```powershell
git log -1 --stat
```

---

# 10. Build the exact version to deploy

After the commit and push, run the checks again so the deployment corresponds to the committed source:

```powershell
npm exec astro check
npm run build
```

---

# 11. Create the deployment ZIP

From the project root:

```powershell
Compress-Archive `
  -Path .\dist\* `
  -DestinationPath .\utah-oasis-homes-preview.zip `
  -Force
```

This creates:

```text
C:\Projects\utah-oasis-homes\utah-oasis-homes-preview.zip
```

The command packages the **contents** of `dist`, not an outer `dist` folder.

Do not commit the ZIP to Git.

Optional verification:

```powershell
Get-Item .\utah-oasis-homes-preview.zip |
Select-Object Name, Length, LastWriteTime
```

---

# 12. Deploy to the HTTPS preview site

## cPanel path

```text
/home/utahoasishomes/preview.utahoasishomes.com
```

## Deployment steps

1. Log in to Hosting.com cPanel.
2. Open **File Manager**.
3. Navigate to:

   ```text
   /home/utahoasishomes/preview.utahoasishomes.com
   ```

4. Confirm you are in the preview document root.
5. Select the existing website files and folders inside that directory.
6. Delete the old deployed files.
7. Do not delete the `preview.utahoasishomes.com` directory itself.
8. Click **Upload**.
9. Upload:

   ```text
   utah-oasis-homes-preview.zip
   ```

10. Return to File Manager.
11. Select the ZIP file.
12. Click **Extract**.
13. Extract directly into:

    ```text
    /home/utahoasishomes/preview.utahoasishomes.com
    ```

14. Confirm this file exists directly in the document root:

    ```text
    /home/utahoasishomes/preview.utahoasishomes.com/index.html
    ```

15. Confirm the files were not extracted into an extra `dist` folder.
16. Delete the uploaded ZIP from the server after extraction.

---

# 13. Verify the preview deployment

Open:

```text
https://preview.utahoasishomes.com
```

Use a hard refresh:

```text
Ctrl + Shift + R
```

Check the changed page or feature first.

Then verify representative routes:

```text
/
 /about
 /process
 /start
 /homes
 /privacy
```

Also verify:

- mobile layout
- desktop layout
- header navigation
- footer
- social links
- images
- tag links
- form submission when form behavior changed
- `/thank-you` redirect when applicable
- no horizontal scrolling
- no visible stray characters
- HTTPS loads without warnings

For content-tag changes, verify generated routes such as:

```text
/homes/tag/wasatch-front
/homes/tag/southern-utah
```

---

# 14. Optional Lighthouse check

Use a Chrome Incognito window so extensions do not affect the result.

1. Open the preview homepage.
2. Open DevTools.
3. Select **Lighthouse**.
4. Choose:
   - Navigation
   - Mobile
   - Performance
   - Accessibility
   - Best Practices
   - SEO
5. Run the audit.

Recent verified target scores:

```text
Performance: 98
Accessibility: 100
Best Practices: 100
SEO: 100
```

A small performance variation between runs is normal.

---

# 15. Preview deployment shortcut

For a routine approved change, the practical command sequence is:

```powershell
cd C:\Projects\utah-oasis-homes

git status
git diff

npm exec astro check
npm run build

git add path\to\changed-files
git diff --cached
git commit -m "Describe the completed change"
git push
git status

npm exec astro check
npm run build

Compress-Archive `
  -Path .\dist\* `
  -DestinationPath .\utah-oasis-homes-preview.zip `
  -Force
```

Then upload and extract the ZIP in the preview document root through cPanel.

---

# 16. Production deployment

Do not deploy to production until:

- the client approves the preview
- diagnostics and build are clean
- preview QA passes
- Formspree works on preview
- business information is confirmed
- portfolio and testimonial permissions are confirmed
- the latest changes are committed and pushed

Production document root:

```text
/home/utahoasishomes/public_html
```

Before the first production deployment:

1. Back up the existing contents of `public_html`.
2. Move or download the backup ZIP outside `public_html`.
3. Confirm the production domain and SSL configuration.
4. Deploy the contents of the latest `dist` build.
5. Perform full live-site QA.
6. Enable Formspree domain restrictions only after production form testing succeeds.

---

# 17. Common problems

## A source change does not appear online

Likely causes:

- `npm run build` was not rerun
- an old ZIP was uploaded
- the ZIP was extracted into the wrong directory
- browser cache is showing an old file

Checks:

```powershell
npm run build
```

Then recreate the ZIP with `-Force`, redeploy it, and hard-refresh the browser.

## The site shows 403 Forbidden

Confirm that `index.html` is directly inside the domain document root.

## The site shows an older version

Inspect the built file locally:

```powershell
Select-String -Path .\dist\index.html -Pattern "text expected in the new build"
```

Then verify the corresponding server-side `index.html` was replaced.

## Git reports an unexpected modified file

Review it:

```powershell
git diff -- path\to\file
```

If the change is accidental:

```powershell
git restore -- path\to\file
```

Do not discard a file until its diff has been reviewed.

## Astro reports duplicate content IDs after Markdown changes

If source files are confirmed not to be duplicated:

```powershell
Remove-Item .\.astro -Recurse -Force
npm run build
```

Do not rewrite the content collection merely because of stale Astro cache output.

---

# 18. Launch tag

After production deployment and full live-site QA:

```powershell
git tag -a v1.0.0 -m "Utah Oasis Homes website launch"
git push origin v1.0.0
```
