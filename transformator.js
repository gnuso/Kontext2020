// load pmml model
let pmmlPath = "models/rpart_orientation_walking_sitting.xml"
var Connect = new XMLHttpRequest();
Connect.open("GET", pmmlPath, false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
var pmmlDoc = Connect.responseXML;
console.log(pmmlDoc);

// Load xsl file pmml2js_dt_4_3_with_compound_sp
let xslPath = "js/pmml2js_dt_4_3_with_compound_sp.xml"
Connect.open("GET", xslPath, false);
Connect.setRequestHeader("Content-Type", "text/xml");
Connect.send(null);
var xsltFile = Connect.responseXML;
console.log(xsltFile)

// transform xml with xsl
function transform() {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsltFile);
    resultDocument = xsltProcessor.transformToFragment(pmmlDoc, document);
    console.log(resultDocument);
    return {code: resultDocument.textContent};
}

// write on html
let gen = transform();
console.log(gen)
document.write(gen.code);