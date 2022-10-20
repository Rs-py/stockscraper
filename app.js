// Imports
const express = require('express')
const app = express()
const port = 3000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Views
app.set('views', './')
app.set('view engine', 'ejs')

// Display Page
app.get('', (req, res) => {
// Run Selenium to Scrape Data
async function yahoo(){    
    webdriver = require("selenium-webdriver");

    require("chromedriver");

    const driver =  new webdriver.Builder()
        .forBrowser("chrome").build();


        const {By,Key,Builder} = require("selenium-webdriver");
        require("chromedriver");
        until = webdriver.until
        
            let symbols = []
            let names = []
            let prices = []
            let changes = []
            let volumes = []
            for (const x of Array(216).keys()) {
                sym = "/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div[6]/div/div/section/div/div[2]/div[1]/table/tbody/tr["+x+"]/td[1]/a";
                n = "/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div[6]/div/div/section/div/div[2]/div[1]/table/tbody/tr["+x+"]/td[2]"
                p = "/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div[6]/div/div/section/div/div[2]/div[1]/table/tbody/tr["+x+"]/td[3]/fin-streamer";
                c = "/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div[6]/div/div/section/div/div[2]/div[1]/table/tbody/tr["+x+"]/td[4]/fin-streamer/span"
                v = "/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div[6]/div/div/section/div/div[2]/div[1]/table/tbody/tr["+x+"]/td[6]/fin-streamer";
                
                symbols.push(sym);
                names.push(n);
                prices.push(p);
                changes.push(c);
                volumes.push(v);
            }

            symbols.splice(0,1);
            names.splice(0,1);
            prices.splice(0,1);
            changes.splice(0,1);
            volumes.splice(0,1);

            symlist = [];
            namelist = [];
            pricelist = [];
            changelist = [];
            volumelist = [];

            await driver.get("https://finance.yahoo.com/most-active/?offset=0&count=250");
            for (x of symbols){
                driver.wait(until.elementLocated(By.xpath(x)), 1000);
                var heading = await driver.findElement(By.xpath(x)).getText();
                symlist.push(heading);
                }
            for (x of names){
                var heading = await driver.findElement(By.xpath(x)).getText();
                namelist.push(heading);
                }
            for (x of prices){
                var heading = await driver.findElement(By.xpath(x)).getText();
                pricelist.push(heading);
                }
            for (x of changes){
                var heading = await driver.findElement(By.xpath(x)).getText();
                changelist.push(heading);
                }
            for (x of volumes){
                var heading = await driver.findElement(By.xpath(x)).getText();
                volumelist.push(heading);
                }
            console.log("Done");
            console.log(symlist);
            console.log(namelist);
            console.log(pricelist);
            console.log(changelist);
            console.log(volumelist);
            res.render('theindex', {"symlist":symlist, "namelist":namelist, "pricelist":pricelist, "changelist":changelist, "volumelist":volumelist})
        }
    yahoo();
})
app.listen(port, () => console.info(`Listening on port ${port}`))
