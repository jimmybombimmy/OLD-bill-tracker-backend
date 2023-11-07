export const error404 = ((req, res) => {
    console.log("this is the one");
    res.status(404).send({
        message: 'Error 404: Page not found'
    });
});
