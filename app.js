// Imports
const express = require('express')
const app = express()
const port = 3000
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

// Set Views
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

            await driver.get("https://finance.yahoo.com/most-active/?offset=0&count=250");
            var xpathcount =  await driver.findElements(By.xpath("/html/body/div[1]/div/div/div[1]/div/div[2]/div/div/div[6]/div/div/section/div/div[2]/div[1]/table/tbody/tr/td[1]/a"));
            var numberofrows = Number(xpathcount.length);
            console.log(numberofrows);
            for (const x of Array(numberofrows).keys()) {
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
            driver.quit();
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

app.get("/about", function (req, res) {
    res.render("about", {contentAbout: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", {contentContact: contactContent});
});

app.listen(port, () => console.info(`Listening on port ${port}`))
