module.exports = async function (request, response) {
    try {
        var id = request.params.id;

        var xkey = request.header('X-Key');
        var xroute = request.header('X-Route');
        var xsignature = request.header('X-Signature');

        var query = "id/"+id+";"+xroute;
        query = query.split(";").sort().join(";");

        crypto = require("crypto");
        var signature = crypto.createHmac("sha256", request.session.shared_secret).update(query).digest("hex");

        if( request.session.key == xkey && signature ==  xsignature){
            var data = request.session.data.filter(function(item) {
                return item.value.id == id;
            });

            response.status(200).send({ data: data });
            response.end();
        }else{
            response.status(403);
            response.end();
        }

    }catch (e) {
        response.status(400);
        response.end();
    }
}