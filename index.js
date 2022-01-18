const fs = require("fs")

try {
    fs.mkdirSync("./game")
} catch (e) {}

const template = fs.readFileSync("./template.html").toString()
const script = JSON.parse(fs.readFileSync("./script.json"))

const pages = Object.keys(script)
for (let page of pages) {

    let newTemplate = template.split()[0]

    let keys = Object.keys(script[page])
    for (let key of keys) {
        if (key === "choices") {
            let choices = ""
            Object.entries(script[page][key]).forEach(choice => {
                choices += "    <li><a href='./" +  choice[1] + ".html'>" + choice[0] + "</a></li>\n    "
            })
            newTemplate = newTemplate.replace(/%choices%/g, choices)
        } else {
            newTemplate = newTemplate.replace(new RegExp("%" + key + "%", "g"), script[page][key])
        }
    }

    fs.writeFileSync("./game/" + page + ".html", newTemplate.replace(/ ?\w*="%.*%"/gm, "").replace(/<.*>%.*%<\/.*>/gm, "").replace(/@del *<\w* ?\/>/gm, "").replace(/@del/gm, "").replace(/\n *\n/gms, "\n"))
}