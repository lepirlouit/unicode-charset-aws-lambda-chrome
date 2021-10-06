const chromium = require('chrome-aws-lambda');
const fs = require('fs');
const htmlContent = `<html>
      <head>
      </head>
      <body>
          &eacute;<br/>
          &sup3;<br/>
          ³<br/>
          &permil;<br/>
          ‰<br/>
          &pertenk;<br/>
          ‱<br/>

      </body>
    </html>
    `;
exports.handler = async (event, context, callback) => {



  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf');

    let page = await browser.newPage();
    const tmpFile = "/tmp/tmpFile.html"
    fs.writeFileSync(tmpFile, htmlContent, { encoding: 'utf8' })
    // page.setContent(htmlContent);
    await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle0' })

    //await page.goto(event.url || 'https://example.com');
    
    const pdf = await page.pdf({
      format: 'A4',
    });
    // console.log(pdf.toString('base64'));
    return pdf.toString('base64');
    
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, result);
};

// this.handler(undefined,undefined,console.log);