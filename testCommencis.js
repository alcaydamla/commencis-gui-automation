const { Builder, By, until } = require('selenium-webdriver');

(async function guiAutomationHW() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.commencis.com/');
    console.log("Anasayfa açıldı");

    await driver.wait(until.elementLocated(By.tagName("nav")), 10000);

    const insightsMenuItem = await driver.wait(
      until.elementLocated(By.id('menu-item-97126')),
      10000
    );
    await driver.actions().move({ origin: insightsMenuItem }).perform();
    console.log("INSIGHTS menüsüne hover yapıldı");

    await driver.sleep(1000);

    const blogLink = await driver.wait(
      until.elementLocated(By.css("a[href='https://www.commencis.com/thoughts/']")),
      10000
    );
    await driver.executeScript("arguments[0].click();", blogLink);
    console.log("📝 Blog (Thoughts) sayfasına tıklandı");

    await driver.wait(until.urlContains("/thoughts"), 10000);
    console.log("Blogs sayfası açıldı");

    await driver.sleep(2000);

    console.log(`\nSayfa 1:`);

    await driver.wait(until.elementsLocated(By.css('div.t-inside.style-color-white-bg.no-anim')), 10000);
    let blogs = await driver.findElements(By.css('div.t-inside.style-color-white-bg.no-anim'));

    if (blogs.length === 0) {
      console.log("Bu sayfada blog bulunamadı.");
    } else {
      console.log(`${blogs.length} blog bulundu.`);

      for (let i = 0; i < blogs.length; i++) {
        blogs = await driver.findElements(By.css('div.t-inside.style-color-white-bg.no-anim'));
        const blog = blogs[i];
        console.log(`\nBlog ${i + 1}:`);

        try {
          const title = await blog.findElement(By.css('.t-entry-title a')).getText();
          console.log("Başlık:", title);
        } catch {
          console.log("Başlık bulunamadı.");
        }

        try {
          const content = await blog.findElement(By.css('.t-entry-text .t-entry')).getText();
          console.log("İçerik:", content.substring(0, 50) + "...");
        } catch {
          console.log("İçerik bulunamadı.");
        }

        let imgSrc = "";
        try {
          const img = await blog.findElement(By.css('img'));
          imgSrc = await img.getAttribute("src");
          console.log("Görsel:", imgSrc);
        } catch {
          console.log("Görsel bulunamadı.");
        }

        try {
          const detailLink = await blog.findElement(By.css('.t-entry-title a'));
          await driver.executeScript("arguments[0].click();", detailLink);
          await driver.wait(until.urlContains("/thoughts/"), 10000);
          console.log("\nBlog detay sayfasına geçildi.");

          // Detay başlık
          try {
            const detailTitle = await driver.findElement(By.css('h1')).getText();
            console.log("Detay Başlık:", detailTitle);
          } catch {
            console.log("Detay başlık bulunamadı.");
          }

          // Yayın tarihi ve süre (XPath ile)
          try {
            const dateTimeElement = await driver.findElement(By.xpath("//*[contains(text(),'Reading Time')]"));
            const dateText = await dateTimeElement.getText();
            console.log("Yayın tarihi ve süre:", dateText);
          } catch {
            console.log("Yayın tarihi ve süre bulunamadı.");
          }

          // Stay Tuned alanı
          try {
            await driver.wait(until.elementLocated(By.css("input[type='email']")), 5000);
            await driver.wait(until.elementLocated(By.css("button[type='submit']")), 5000);
            console.log("Stay Tuned alanı bulundu.");
          } catch {
            console.log("Stay Tuned alanı bulunamadı.");
          }

          // Yazar bilgisi (XPath ile)
          try {
            const author = await driver.findElement(By.xpath("//*[text()='Duru Kızılkayak']"));
            console.log("Yazar: Duru Kızılkayak");

            if (imgSrc === "https://cdn-www.commencis.com/wp-content/uploads/2018/03/favicon_commencis.png.webp") {
              console.log("Commencis görseli doğru.");
            } else {
              console.log("Commencis görseli zorunlu değil.");
            }
          } catch {
            console.log("Yazar bilgisi bulunamadı.");
          }

          await driver.navigate().back();
          await driver.wait(until.urlContains("/thoughts"), 10000);
          await driver.sleep(2000);
        } catch {
          console.log("Blog detay sayfasına geçilemedi.");
        }
      }
    }

  } catch (err) {
    console.error("Hata:", err);
  } finally {
    await driver.quit();
  }
})();