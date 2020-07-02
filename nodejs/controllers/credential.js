module.exports = async function (request, response) {
    try {
        var key=request.body.key;
        var shared_secret=request.body.shared_secret;

        if(request.session.key=="" || request.session.key == undefined ){
            request.session.key = key;
            request.session.shared_secret = shared_secret;
            response.status(204);
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