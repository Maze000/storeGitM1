const path = require('path');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.LOADSTRIPE_PRIVATE);
const Product = require('../productDb/product.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/user.js');
const SECRET_KEY = process.env.JUST_SECRET_KEY;
module.exports = (app, passport) => {

	app.post('/checkout', function (req, res) {
		const paymentMethodId = req.body.paymentMethodId;
		const amount = req.body.amount;
		
		stripe.paymentIntents.create({
			amount: amount,
			currency: 'usd',
			description: 'Mi producto',
			payment_method: paymentMethodId,
			confirm: true,
			confirmation_method: 'automatic',
			return_url: 'https://storegitm1-production.up.railway.app/form-6',
		}, function (error, paymentIntent) {
			if (error) {
				console.error("Error:", error);
				res.status(500).send({ success: false, message: error.message });
			} else {
				console.log("Pago realizado con éxito:", paymentIntent);
				res.send({ success: true, paymentIntent: paymentIntent });
			}
		});
	});

	app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));


	app.get('/auth/facebook/callback',
		passport.authenticate('facebook'), (req, res) => {
			if (req.user) {
				const email = req.user.facebook.email;
				const name = req.user.facebook.displayName;
				req.session.token = jwt.sign({ userId: req.user._id, email: email, name: name }, SECRET_KEY, { expiresIn: '5m' });
				res.redirect('/Verify2');
			} else {
				res.redirect('/login');
			}
		});

	app.get('/get-token', (req, res) => {
		if (req.session.token) {
			res.status(200).json({ token: req.session.token });
		} else {
			res.status(401).json({ error: 'No autorizado' });
		}
	});

	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}));

	app.get('/auth/google/callback',
		passport.authenticate('google'), (req, res) => {
			if (req.user) {
				const email = req.user.google.email;
				const name = req.user.google.name;

				req.session.token = jwt.sign({ userId: req.user._id, email: email, name: name }, SECRET_KEY, { expiresIn: '5m' });
				console.log(" antes de redirigir");
				res.redirect('/Verify2');
			} else {
				res.redirect('/login');
			}
		});


		app.post('/login', (req, res, next) => {
			passport.authenticate('local-login', (err, user, info) => {
				
				if (err) {
					
					return next(err); 
				}
				if (!user) {
					
					var errorMessage = req.flash('loginMessage')[0]; 
		
					if (errorMessage) {
						
						return res.status(200).json({ messageError: errorMessage }); 

					} else {
						
						return res.status(401).json({ messageError: "Authentication failed" });
					}
				}
		
				
				const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '5m' });
                console.log('antes de enviar el tokn de login');
				return res.status(200).json({ token }); 
		
			})(req, res, next); 
		});

	app.get('/logout', (req, res) => {

		req.logout();
		
		res.status(200).json({ message: 'Logout successful' });
	});

	app.get('/productos', (req, res) => {
		Product.find({}).then(productos => {
			res.status(200).json(productos);
		}).catch(err => {
			res.status(500).send(err);
		});
	});
	

	const transporterc = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'infimo000@gmail.com',
			pass: 'bnnhofjlhhlxblca',
		},
	});

	app.post('/send-emailc', (req, res) => {
		const { name, email, subject, message } = req.body;

		const mailOptions = {
			from: `${email}`,
			replyTo: `${email}`,
			to: 'infimo000@gmail.com',
			subject: 'Mensaje de Contacto',
			text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje: ${message}`,
		};


		transporterc.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);

				res.status(500);
			} else {
				console.log('Email enviado: ' + info.response);

				res.status(200).json({ message: 'success message' });
			}


		});
	});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'infimo000@gmail.com',
			pass: 'bnnhofjlhhlxblca',
		},
	});

	app.post('/send-email', (req, res) => {
		const { name, email, subject, message } = req.body;

		const mailOptions = {
			from: `${email}`,
			replyTo: `${email}`,
			to: 'infimo000@gmail.com',
			subject: 'Mensaje de Contacto',
			text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje: ${message}`,
		};


		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);

				res.status(500);
			} else {
				console.log('Email enviado: ' + info.response);

				res.status(200).json({ message: 'success message' });
			}


		});
	});


	const transporter2 = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'infimo000@gmail.com',
			pass: 'bnnhofjlhhlxblca'
		}
	});

	const transporter3 = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'infimo000@gmail.com',
			pass: 'bnnhofjlhhlxblca'
		}
	});

	app.post('/envioConfirm', (req, res) => {
		const { name, email, subject, message } = req.body;

		const mailOptions = {
			from: `${email}`,
			replyTo: `${email}`,
			to: 'infimo000@gmail.com',
			subject: 'Mensaje de Contacto',
			text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje: ${message}`,
		};


		transporter3.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);

				res.status(500);
			} else {
				console.log('Email enviado: ' + info.response);

				res.status(200).send('el correo ha sido enviado esto es del servidor');
			}
		});
	});

	

	
        app.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      var errorMessage = req.flash('signupMessage')[0];

      if (errorMessage) {
        return res.status(200).json({ messageError: errorMessage });
      } else {
        return res.status(401).json({ messageError: errorMessage });
      }
    }

    const verificationToken = generateVerificationToken();

    user.verificationToken = verificationToken;

    // Cambia aquí para usar Promesas
    user.save().then(() => {
      const verificationUrl = `https://storegitm1-production.up.railway.app/verify1?token=${verificationToken}`;

      return transporter2.sendMail({
        from: 'infimo000@gmail.com',
        to: user.local.email,
        subject: 'Verifica tu dirección de correo electrónico',
        html: `<p>Por favor, verifica tu correo haciendo clic en el siguiente enlace: <a href="${verificationUrl}">Verificar correo</a></p>`,
      });
    }).then(() => {
      res.status(200).json({ message: 'procesando registro' });
    }).catch(error => {
      console.log(error);
      if (error.message.includes('Error al guardar el usuario.')) {
        return res.status(500).send('Error al guardar el usuario.');
      } else {
        return res.status(500).send('Error al enviar el correo electrónico.');
      }
    });
  })(req, res, next);
});

	function generateVerificationToken() {

		return require('crypto').randomBytes(20).toString('hex');
	}

	

	app.post('/verify', (req, res) => {
	const {token}  = req.body;

	User.findOne({ verificationToken: token })
		.then(user => {
			if (!user) {
				return Promise.reject('Error al verificar el usuario o token no válido.');
			}

			user.isVerified = true;
			user.verificationToken = null;

			
			return user.save();
		})
		.then(user => {
			
			const token2 = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '5m' });
			res.status(200).json({ token2 });
		})
		.catch(err => {
			
			console.log(err);
			res.status(500).send('Error al verificar el usuario o token no válido.');
		});
});


};
