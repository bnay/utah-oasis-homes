# Utah Oasis Homes Content Workflow

## Start the project

Open PowerShell in:

```text
C:\Projects\utah-oasis-homes
```

Run:

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:4321/
```

Stop the development server with:

```text
Ctrl+C
```

---

## Add a new home

### 1. Copy the home template

From the project root, run:

```powershell
Copy-Item "templates\home-template.md" `
          "src\content\homes\new-home-name.md"
```

Replace `new-home-name.md` with a lowercase, hyphenated filename.

Example:

```text
park-city-retreat.md
```

The filename becomes the page URL:

```text
/homes/park-city-retreat
```

### 2. Edit the new Markdown file

Required fields:

```yaml
---
title: "Park City Retreat"
location: "Park City, Utah"
coverImage: "/images/homes/park-city-retreat.png"

tags:
  - "Mountain"
  - "Northern Utah"
  - "View Lot"

featured: false
order: 60

gallery:
  - "/images/homes/park-city-retreat-1.png"
  - "/images/homes/park-city-retreat-2.png"
  - "/images/homes/park-city-retreat-3.png"
---
```

Write a short home description below the closing `---`.

### 3. Add the image files

Place the images in:

```text
public\images\homes
```

The filenames must match the paths used in the Markdown file.

Example:

```text
public\images\homes\park-city-retreat.png
public\images\homes\park-city-retreat-1.png
public\images\homes\park-city-retreat-2.png
public\images\homes\park-city-retreat-3.png
```

### 4. Control display order

Lower numbers appear earlier.

Example:

```yaml
order: 10
```

appears before:

```yaml
order: 20
```

Use increments of 10 so a home can be inserted later without renumbering everything.

Featured homes always appear before non-featured homes.

```yaml
featured: true
```

Use `featured: true` only for homes that should appear in the Featured section.

### 5. Preview the new home

Run:

```powershell
npm run dev
```

Check:

```text
/homes
/homes/new-home-name
```

Also click the home’s tags to confirm the tag pages work.

---

## Remove a home

Delete its Markdown file from:

```text
src\content\homes
```

Example:

```powershell
Remove-Item "src\content\homes\old-home-name.md"
```

Optionally delete its unused images from:

```text
public\images\homes
```

Pagination and tag pages update automatically.

---

## Validate the site before publishing

Stop the development server and run:

```powershell
npm run build
```

A successful build ends with:

```text
[build] Complete!
```

Then preview the production version:

```powershell
npm run preview
```

---

## Important notes

Do not place templates or notes inside:

```text
src\content\homes
```

Every Markdown file in that folder is treated as a real home.

The reusable template belongs here:

```text
templates\home-template.md
```

Do not edit pagination files when adding or removing homes.

Pagination, tag pages, URLs, breadcrumbs, and SEO metadata update automatically.

Do not install an Astro adapter unless the site is intentionally changed from static rendering to server rendering.

Do not upgrade Astro while making routine content updates.



DEPLOYMENT PROCESS

Here’s the safe publish process for the updated preview site.

1. Build the latest site

From PowerShell:

cd C:\Projects\utah-oasis-homes

npm exec astro check
npm run build

Confirm:

no Astro errors
the build completes successfully
sand-hollow-oasis appears in the generated routes

You can verify the page exists with:

Test-Path .\dist\homes\sand-hollow-oasis\index.html

Expected:

True
2. Create the deployment ZIP

Run:

Compress-Archive `
  -Path .\dist\* `
  -DestinationPath .\utah-oasis-homes-preview.zip `
  -Force

This creates:

C:\Projects\utah-oasis-homes\utah-oasis-homes-preview.zip
3. Open the preview folder in cPanel

Go to:

cPanel → File Manager

Navigate to:

/home/utahoasishomes/preview.utahoasishomes.com
4. Replace the current preview files

Inside that folder:

Select the existing website files and folders.
Do not delete the preview.utahoasishomes.com folder itself.
Delete the old deployed files.
Click Upload.
Upload:
utah-oasis-homes-preview.zip
Return to File Manager.
Select the ZIP.
Click Extract.
Extract directly into:
/home/utahoasishomes/preview.utahoasishomes.com

After extraction, confirm:

index.html

is directly inside the preview folder, not inside an extra dist directory.

Then delete the ZIP from the server.

5. Verify the new deployment

Open:

https://preview.utahoasishomes.com

Hard refresh with:

Ctrl + Shift + R

Then verify:

https://preview.utahoasishomes.com/homes/sand-hollow-oasis

Check:

the new home appears
cover and gallery images load
clicking an image opens the lightbox
previous and next controls work
keyboard arrows work
Escape closes the lightbox
mobile layout still looks correct
the new tags and related tag pages work

Also test:

https://preview.utahoasishomes.com/homes/tag/wasatch-front

and:

https://preview.utahoasishomes.com/homes/tag/southern-utah