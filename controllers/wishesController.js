module.exports = {
    getActiveUser: (req, res, net) => {
        const body = req.body;
        const dbInstance = req.app.get('db');

        dbInstance.get_wishes_user([body.id])
            .then(result => {
                return res.status(200).send(result);
            });
    },

    getFamilyReference: (req, res, net) => {
      const dbInstance = req.app.get('db');

      dbInstance.get_family_reference()
          .then(result => {
              return res.status(200).send(result);
          });
    },

    getAllUsers: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.get_wishes_users()
            .then(result => {
                return res.status(200).send(result);
            });
    },

    getWishes: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')

        dbInstance.get_wishes_for_user([body.id])
            .then(result => {
                return res.status(200).send(result);
            });
    },

    getMyCompletedWishes: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')

        dbInstance.get_my_completed_wishes([body.id])
            .then(result => {
                return res.status(200).send(result);
            });
    },

    reserveWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.reserve_wish([body.reservedUserId, body.wishId])
      .then(result => {
          return res.status(200).send('Wish Reserved');
      });
    },

    releaseWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.release_wish([body.wishId])
      .then(result => {
          return res.status(200).send('Wish Released');
      });
    },

    completeWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.complete_wish([body.wishId])
      .then(result => {
          return res.status(200).send('Wish Completed');
      });
    },

    reactivateWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.reactivate_wish([body.wishId])
      .then(result => {
          return res.status(200).send('Wish Reactivated');
      });
    },

    addWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.get_max_wish_id()
        .then(maxID => {
            var newID = maxID[0].maxwishid + 1;

            dbInstance.add_wish([newID, body.userId, body.title, body.description, body.cost, body.link, body.rating])
              .then(result => {
                return res.status(200).send('Wish Added')
              });
        });
    },

    deleteWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.delete_wish([body.wishId])
        .then(result => {
          return res.status(200).send('Wish Deleted')
        });
    },

    updateWish: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.update_wish([body.title, body.description, body.cost, body.link, body.rating, body.wishId])
        .then(result => {
          return res.status(200).send('Wish Updated')
        });
    },

    getReservedWishes: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.get_my_reserved_wishes([body.userId])
        .then(result => {
          return res.status(200).send(result)
        });
    },

    updateWishesUser: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.update_wishes_user([body.userId, body.edwUserId, body.familyId, body.isParent, body.firstName, body.lastName, body.isAdmin, body.birthday, body.anniversary, body.group1, body.group2, body.group3, body.group4])
        .then(result => {
          return res.status(200).send('Wishes user updated')
        })
    },

    updateWishesFamily: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db');

      dbInstance.update_wishes_family([body.familyId, body.familyName, body.parent1, body.parent2, body.familyGroup])
        .then(result => {
          return res.status(200).send('Wishes family updated')
        })
    },

    updateBio: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db')

      dbInstance.update_bio([body.userId, body.bio])
        .then(result => {
          return res.status(200).send('Bio Updated')
        });
    },

    getReserverEmail: (req, res, next) => {
      const body = req.body;
      const dbInstance = req.app.get('db')

      dbInstance.get_reserver_email([body.userId])
        .then(result => {
          return res.status(200).send(result[0])
        });
    },

    checkEmailBirthdays: () => {
      app.get('db').check_birthdays()
        .then(result => {
          console.log('Birthday stuff', result)
        });
    },

    getAmazonWishes: (req, res, next) => {
      const awlInstance = req.app.get('awl');
      const dbInstance = req.app.get('db');
      const body = req.body;

      console.log('body', body);
      dbInstance.get_amazon_wish_list_id([body.userId])
        .then(result => {
          const amazonid = result[0].amazonwishlistid;

          if (amazonid) {
            awlInstance.getByID(amazonid)
              .then(list => {
                console.log('list', list);
                res.status(200).send(list);
              });
          } else {
            res.status(200).send('Provide Amazon ID');
          }

        });
    },

    emailReserver: (req, res, next) => {
      const transporterInstance = req.app.get('transporter')
      const dbInstance = req.app.get('db')
      const body = req.body;
      let reserverEmail = '';
      let questionerEmail = '';

      dbInstance.get_reserver_email([body.userId])
          .then(result => {
            reserverEmail = result[0].emaildsc;

            dbInstance.get_reserver_email([body.currentUserId])
              .then(result2 => {
                questionerEmail = result2[0].emaildsc

                const mailOptions = {
                  from: 'Cornwallia Wishes <cornwallia225@gmail.com>',
                  to: reserverEmail,
                  subject: `Regarding ${body.wishTitle} for ${body.wishRecipient}`,
                  text: `${body.content} \n \n ${body.userName} \n ${questionerEmail}`
                };

                transporterInstance.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error);
                  } else {
                    return res.status(200).send('Email sent')
                  }
                });
              });
          });
    }
  }
