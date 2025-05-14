# Commencis GUI Automation

This repository contains a Selenium-based GUI automation script written in Node.js that tests the **Popular Blogs section** of the [Commencis website](https://www.commencis.com/).

---

## What the Test Script Does

- Opens [https://www.commencis.com](https://www.commencis.com)
- Navigates to the **Blogs** section under the `INSIGHTS` top menu
- Iterates through each blog in the **Popular section**
- For each blog:
  - Verifies **title**, **content**, and **image**
  - Enters the blog detail page
  - Verifies:
    - Detail title
    - Published date & reading time
    - Stay Tuned email input + submit button
    - Author name
    - If author is `Commencis`, confirms the image matches  
      `https://cdn-www.commencis.com/wp-content/uploads/2018/03/favicon_commencis.png.webp`

---

## Technologies Used

- Node.js
- Selenium WebDriver
- ChromeDriver

---

## Setup Instructions

1. **Install Node.js**  
   [https://nodejs.org](https://nodejs.org)

2. **Install Dependencies**
   ```bash
   npm install selenium-webdriver
   ```

3. **Download and place** `chromedriver` in your PATH  
   [https://chromedriver.chromium.org/downloads](https://chromedriver.chromium.org/downloads)

---

## Run the Test

```bash
node testCommencis.js
```

You’ll see structured console logs for each blog.

---

## Example Output

```
Blog 1:
Başlık: The Super Bowl of AI — From a CIO Lens
İçerik: AI The Super Bowl of AI — From a CIO Lens ...
Görsel: https://cdn-www.commencis.com/wp-content/uploads/2025/03/...

Blog detay sayfasına geçildi.
Detay Başlık: The Super Bowl of AI — From a CIO Lens
Yayın tarihi ve süre: 28/03/2025 - Reading Time: 5 mins
Stay Tuned alanı bulundu.
Yazar: Duru Kızılkayak
Commencis görseli hatalı veya eksik.
```


