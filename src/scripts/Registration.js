//const fetch = require("node-fetch");
//const fetch = require('node-fetch')
import axios from './axios'
/*function getInn(
    surname,
    name,
    patronymic,
    birthdate,
    doctype,
    docnumber,
    docdate
) {
    const url = "https://service.nalog.ru/inn-proc.do";
    const data = {
        fam: surname,
        nam: name,
        otch: patronymic,
        bdate: birthdate,
        bplace: "",
        doctype: doctype,
        docno: docnumber,
        docdt: docdate,
        c: "innMy",
        captcha: "",
        captchaToken: ""
    };
    console.log(url);
    const encoded = encode(data);
    console.log(encoded);
    //console.log(new URLSearchParams(encoded));
    //const testUrl = 'https://service.nalog.ru/inn-proc.do?fam=%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%BB%D1%91%D0%B2&nam=%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9&otch=%D0%A4%D1%91%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87&bdate=29.10.1978&bplace=&doctype=21&docno=46%2002%20385616&docdt=29.01.2002&c=innMy&captcha=&captchaToken='
    //const testUrl = 'https://cors-anywhere.herokuapp.com/https://service.nalog.ru/inn-proc.do?fam=%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%BB%D1%91%D0%B2&nam=%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9&otch=%D0%A4%D1%91%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87&bdate=29.10.1978&bplace=&doctype=21&docno=46%2002%20385616&docdt=29.01.2002&c=innMy&captcha=&captchaToken='
    //const testUrl = 'https://secret-ocean-49799.herokuapp.com/https://service.nalog.ru/inn-proc.do?fam=%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%BB%D1%91%D0%B2&nam=%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9&otch=%D0%A4%D1%91%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B8%D1%87&bdate=29.10.1978&bplace=&doctype=21&docno=46%2002%20385616&docdt=29.01.2002&c=innMy&captcha=&captchaToken='
    const falseBottomHerrokuapp = 'https://false-bottom.herokuapp.com/';
    //const secretOceanHerrokuapp = 'https://secret-ocean-49799.herokuapp.com/'
    //const secretOceanHerrokuapp = 'https://crossorigin.me/';
    const resp = axios.get(falseBottomHerrokuapp + url +'?'+ encoded)
    return resp;
}

function encode(data) {
    const encoded = Object.keys(data)
        .map(
            key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    return encoded;
}*/

/*suggestInn(
    "Иванов",
    "Сергей",
    "Владимирович",
    "16.03.1982",
    "21",
    "45 12 229333",
    "03.09.2012"
)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response);
    }); */
async function getInn(
    surname,
    name,
    patronymic,
    birthdate,
    doctype,
    docnumber,
    docdate
) {
    const resp = await axios.serviceNalogRu({
        surname,
        name,
        patronymic,
        birthdate,
        doctype,
        docnumber,
        docdate
    })
    return resp;
}

export {getInn};