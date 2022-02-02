const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/:idioma/:texto', async (req, res) => {
  	const idioma = req.params.idioma;
	const texto = req.params.texto;

	const browser = await puppeteer.launch({ headless: true });
  	const page = await browser.newPage();
  	await page.goto('https://translate.google.com.br/?hl=' + idioma + '&text=' + texto);

	await page.waitForSelector('div[class="J0lOec"]');

  	// Get the "viewport" of the page, as reported by the page.
  	const answer = await page.evaluate(() => {
    		return {
			textoTraduzido: document.querySelector('div[class="J0lOec"]').innerText
      		}
	});
	
	//console.log(answer.textoTraduzido);

 	res.send(answer.textoTraduzido);	

  	await browser.close();
})

app.listen(8080, () => {
	console.log('Listening on port 8080!')
})
