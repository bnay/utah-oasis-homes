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
