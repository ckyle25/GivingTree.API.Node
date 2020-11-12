// const nodemailer = require('nodemailer')
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_SERVICE_USERNAME,
//       pass: process.env.EMAIL_SERVICE_PASSWORD
//     }
//   });

module.exports = {
    getCards: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')

        myQuery = `
        SELECT
        *
        FROM givingtree.cards 
        `
        dbInstance.query(myQuery, (err, result) => {
            return res.status(200).send(result.rows)
        })
    },

    reserveCard: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')
        const transporterInstance = req.app.get('transporter')

        myQuery = `
        UPDATE givingtree.cards
        SET reservedflg = 1,
        reservednm = $1,
        reservedemailtxt = $2
        WHERE cardid = $3
        RETURNING *
        `
        values = [body.name, body.email, body.cardid]


        dbInstance.query('SELECT reservedflg FROM givingtree.cards WHERE cardid = $1', [body.cardid], (err, checkResult) => {
            if (err) {
                return res.status(400).send("Check Failed")
            } else {
                if (checkResult.rows[0].reservedflg == 0) {
                    dbInstance.query(myQuery, values, (err, result) => {
                        if (err) {
                            return res.status(400).send(["Reservation Failed"])
                        } else {
                            const mailOptions = {
                                from: 'Giving Tree <syc4thgivingtree@gmail.com>',
                                to: body.email,
                                subject: `Thank You for Your Reservation`,
                                text: `This email is to confirm your reservation for \n\n${result.rows[0].cardtitletxt}\n${result.rows[0].carddsc}\n\nPlease be sure to give your reserved items to Viviann Carlsen by (insert date here)\n\nThank you again for your participation.\n\nMerry Christmas!\n\n-Sycamores 4th Ward Giving Tree`
                              };
              
                              transporterInstance.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                  return res.status(200).send(result.rows)
                                }
                              });
                            
                            return res.status(200).send(result.rows)
                        }
                    })
                } else {
                    return res.status(400).send(["Already reserved"])
                }
            }
        })
    },

    releaseCard: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')

        myQuery = `
        UPDATE givingtree.cards
        SET reservedflg = 0,
        reservednm = null,
        reservedemailtxt = null
        WHERE cardid = $1
        RETURNING *
        `
        values = [body.cardid]

        dbInstance.query('SELECT reservedflg FROM givingtree.cards WHERE cardid = $1', [body.cardid], (err, checkResult) => {
            if (err) {
                return res.status(400).send(["Check Failed"])
            } else {
                if (checkResult.rows[0].reservedflg == 1) {
                    dbInstance.query(myQuery, values, (err, result) => {
                        if (err) {
                            return res.status(400).send(["Release Failed"])
                        } else {
                            return res.status(200).send(result.rows)
                        }
                    })
                } else {
                    return res.status(200).send(["Not Reserved"])
                }
            }
        })
    },

    addCard: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')

        myQuery = `
        INSERT INTO givingtree.cards(familyid,cardtitletxt,carddsc)
        VALUES ($1,$2,$3)
        RETURNING *
        `
        values = [body.familyid, body.cardtitletxt, body.carddsc]

        dbInstance.query(myQuery, values, (err, result) => {
            if (err) {
                return res.status(400).send(err)
            } else {
                return res.status(200).send(result.rows)
            }
        })
    },

    deleteCard: (req, res, next) => {
        const body = req.body;
        const dbInstance = req.app.get('db')

        myQuery = `
        DELETE FROM givingtree.cards
        WHERE cardid = $1
        `
        dbInstance.query(myQuery, [body.cardid], (err, result) => {
            if (err) {
                return res.status(400).send(["Delete Failed"])
            } else {
                return res.status(200).send(["Delete Succeeded"])
            }
        })
    }
}