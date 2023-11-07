export const error404 = ((req, res) => {
    res.status(404).send({
        message: 'Error 404: Page not found'
    });
});
