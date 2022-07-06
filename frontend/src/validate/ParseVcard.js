export const parseCard = (input) => {
    var Re1 = /^(version|fn|n|title|org|adr|url):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var Re3 = /(;+)|\\n+|\\+/g
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).map((line) => {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            results[2] = results[2].replace(Re3," ")
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            if (!fields[key]) fields[key] = [];

            fields[key] = {
                value: results[3].replace(Re3," ")
            }
        }
    });

    return fields;
};
