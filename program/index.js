const retriever = require('amazon-price-retriever');
const emailvar = require('nodemailer');
var data = 0, last_price = 0;
var url = "test";
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter url ", function(URL) {
        url = URL;
        get(url);
    });
setInterval(function(){get(url)}, 8640000);

    
 
 
 async function get(url){
    await retriever.retrievePrice(url).then(price => data = price);
    var data1 = data.replace('$','');
    var price = parseFloat(data1);
    if(last_price != price){
        console.log(price);
        last_price = price;
        email(price, last_price, url);
    }
    return;
}
 async function email(price, lp, url){
    let transporter = emailvar.createTransport({
        service: 'gmail',
        auth: {
            user: 'email',
            pass: 'password'
        }
    });
    var options = {
        from: 'email', 
        to: 'to',
        subject: 'subject', 
        text: ('The item price changed to: ' + price + ' from ' + lp + ' Link: ' + url)
    };
    transporter.sendMail(options,function(error, info){
        if (error){
            console.log(error);
        }else{
            console.log(info.response);

        };
    });
    return;
}
