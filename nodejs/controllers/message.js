module.exports = async function (request, response) {
    try {
        var msg=request.body.msg;
        var tags=request.body.tags;
        
        var xkey = request.header('X-Key');
        var xroute = request.header('X-Route');
        var xsignature = request.header('X-Signature');

        var query = "msg/"+msg+";tags/"+tags+";"+xroute;
        query = query.split(";").sort().join(";");

        crypto = require("crypto");
        var signature = crypto.createHmac("sha256", request.session.shared_secret).update(query).digest("hex");
        if( request.session.key == xkey && signature ==  xsignature){
            var id = crypto.randomBytes(16).toString("hex");
            var value = {
                msg: msg,
                tags: tags,
                id: id
            };
            
            if (  request.session.data =="" || request.session.data == undefined ){
                var data = []; 
                data.push({'value':value});
            }else{
                var data = request.session.data;
                data.push({'value':value});
            }
            request.session.data = data;

            response.status(200).send({ id: id });
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