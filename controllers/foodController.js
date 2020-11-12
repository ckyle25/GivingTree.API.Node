module.exports = {
  foodGetActiveUser: (req, res, net) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.get_food_user([body.id])
          .then(result => {
              return res.status(200).send(result);
          });
  }
}
