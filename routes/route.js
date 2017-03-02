/*
* @Author: Ali
* @Date:   2017-03-02 11:29:46
* @Last Modified by:   Ali
* @Last Modified time: 2017-03-02 11:44:01
*/

module.exports = (app, swaggerSpec) => {
    'use strict';

    /**
     * @swagger
     * /*:
     *   get:
     *     tags:
     *       - Employee
     *     description: Returns inndex.html file
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: index.html file
     */
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/index.html'));
    });

    // serve swagger
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.listen(app.get('port'), () => {
        console.log('Server is listening on port ' + app.get('port') + '. Press CTRL-C to terminate.');
    });
}