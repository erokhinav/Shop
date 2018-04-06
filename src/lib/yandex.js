class Category {
    constructor(text, id, parentId, parent) {
        this.text = text;
        this.id = id;
        this.parentId = parentId;
        this.parent = parent;
    }
}

class Market {
    constructor(name, company, url, categories, offers) {
        this.name = name;
        this.company = company;
        this.url = url;
        this.categories = categories;
        this.offers = offers;
    }
}

class Offer {
    constructor(id, url, price, oldprice, currencyId, categoryId, picture, store, pickup, delivery, deliveryOptions, typePrefix, vendor, model, description, param, salesNotes, manufacturerWarranty, countryOrigin, barcode, cpa) {
        this.id = id;
        this.url = url;
        this.price = price;
        this.oldprice = oldprice;
        this.currencyId = currencyId;
        this.categoryId = categoryId;
        this.picture = picture;
        this.store = store;
        this.pickup = pickup;
        this.delivery = delivery;
        this.deliveryOption = deliveryOptions;
        this.typePrefix = typePrefix;
        this.vendor = vendor;
        this.model = model;
        this.description = description;
        this.param = param;
        this.typePrefix = typePrefix;
        this.salesNotes = salesNotes;
        this.manufacturerWarranty = manufacturerWarranty;
        this.countryOrigin = countryOrigin;
        this.barcode = barcode;
        this.cpa = cpa;
    }
}

function loadYML(url) {
    let request = new XMLHttpRequest();

    request.open('GET', url, false);

    if (request.overrideMimeType) {
        request.overrideMimeType('text/xml');
    }

    request.send();

    return xmlToJson(request.responseXML);
}

export function parse(url) {
    let yml = loadYML(url);
    let shop = yml['yml_catalog']['shop'];
    return new Market(getTextValue(shop.name), getTextValue(shop.company), getTextValue(shop.url), parseCategories(shop.categories.category), parseOffers(shop.offers.offer));
}

function parseOffers(offers) {
    let result = [];
    offers.forEach(function (element) {
        let attributes = getAttributes(element);
        result[attributes.id] = new Offer(attributes.id, getTextValue(element.url), getTextValue(element.price), getTextValue(element.oldprice), getTextValue(element.currencyId), getTextValue(element.categoryId), getTextValue(element.picture));
    });

    return result;
}

function parseCategories(categories) {
    let result = [];
    categories.forEach(function (element) {
        let attributes = getAttributes(element);

        let parentId = null;
        let parent = null;
        if (attributes.parentId) {
            parentId = attributes.parentId;
            parent = result[attributes.parentId];
        }

        result[attributes.id] = new Category(getTextValue(element), attributes.id, parentId, parent);
    });

    return result;
}

function getTextValue(element) {
    return element['#text'];
}

function getAttributes(element) {
    return element['@attributes'];
}

function xmlToJson(xml) {
    // Create the return object
    let obj = {};

    const textType = 3;
    const elementType = 1;
    const undefined = 'undefined';

    if (xml.nodeType === elementType) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                let attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === textType) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            let item = xml.childNodes.item(i);
            let nodeName = item.nodeName;
            if (typeof(obj[nodeName]) === undefined) {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) === undefined) {
                    let old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }

    return obj;
}