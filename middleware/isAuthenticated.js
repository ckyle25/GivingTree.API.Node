module.exports = {
  checkAuthenticated: (req, res, next) => {
    // if (!req.user) {
    //   return res.status(200).send('Login Required');
    // } else {
    //   next();
    // }
    next();
  }
};
