const {log} = require("console");
var puppeteer = require("puppeteer");

(async () => {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Navigate the page to a URL
	await page.goto("https://themeforest.net/");

	// await page.screenshot({
	// 	path: "example.png",
	// 	fullPage: true,
	// });

	// await page.pdf({
	// 	path: "example.pdf",
	// 	format: "A4",
	// });

	// const html = await page.content();
	// console.log("Content", html);

	// const title = await page.evaluate(() => document.title);
	// console.log(title);

	// const text = await page.evaluate(() => document.body.innerText);
	// console.log(text);

	// const links = await page.evaluate(() =>
	// 	Array.from(document.querySelectorAll("a"), (e) => e.href)
	// );
	// console.log(links);

	// const links = await page.evaluate(() =>
	// 	Array.from(
	// 		document.querySelectorAll(
	// 			".home-newest_items_grid_component__root a.shared-item_cards-preview_image_component__imageLink "
	// 		),
	// 		(e) => e.href
	// 	)
	// );
	// console.log(links);

	// const data = await page.evaluate(() =>
	// 	Array.from(
	// 		document.querySelectorAll(
	// 			".home-newest_items_grid_component__root .home-newest_items_grid_component__cardWrapper "
	// 		),
	// 		(e) => {
	// 			return {
	// 				link: e.querySelector(
	// 					".shared-item_cards-card_component__root a.shared-item_cards-grid-image_card_component__itemLinkOverlay"
	// 				).href,
	// 				title: e.querySelector(
	// 					".shared-item_cards-card_component__root a.shared-item_cards-item_name_component__itemNameLink"
	// 				).innerHTML,
	// 			};
	// 		}
	// 	)
	// );
	// console.log(data);

	// Type into search box
	await page.type(".shared-autosuggest_component__searchInput", "worpress");
	await page.click("button.shared-autosuggest_component__searchBtn");
	await page.waitForSelector(".search-index_content__searchContentSection");

	await page.pdf({
		path: "example.pdf",
		format: "A4",
	});
	const data = await page.evaluate(() =>
		Array.from(
			document.querySelectorAll(
				".search-index_content__searchResultsWrapper .shared-item_cards-card_component__root "
			),
			(e) => {
				return {
					link: e.querySelector(
						"a.shared-item_cards-list-image_card_component__itemLinkOverlay"
					).href,
					title: e.querySelector(
						"a.shared-item_cards-item_name_component__itemNameLink"
					).innerHTML,
				};
			}
		)
	);
	console.log(data);

	await browser.close();
	return;

	// Wait and click on first result
	const searchResultSelector = ".shared-autosuggest_component__searchBtn";
	await page.waitForSelector(searchResultSelector);
	await page.click(searchResultSelector);

	// Locate the full title with a unique string
	const textSelector = await page.waitForSelector("text/worpress");
	const fullTitle = await textSelector?.evaluate((el) => el.textContent);

	// Print the full title
	console.log('The title of this blog post is "%s".', fullTitle);

	await browser.close();
})();
