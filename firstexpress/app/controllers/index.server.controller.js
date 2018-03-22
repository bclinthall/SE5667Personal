exports.render = function(req, res) {
//    res.status(200).send('Hello from a complicated directory structure.\n');
    if (req.session.lastVisit) {
        console.log('Last Visit: ', req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('index', {
        title: 'Hello World'
    });
};
