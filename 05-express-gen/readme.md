# Adding passport.js to an express app

Note: this app is generated with `npx express-generator --view=hbs .`

## Step 1: Install passport.js and mongodb
In the terminal:

```
yarn add passport
yarn add passport-local
yarn add bcryptjs
yarn add mongodb
```

## Step 2: Create the user model

Add in the code to create and find user in UserModel.

## Step 3: Enable sessions
Install the following packages

```
yarn add express-session
yarn add session-file-store
yarn add uuid
```

And add the following to `app.js`

```
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
```

Then initialise the session:

```
app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  secret:"<your own key>",
  resave:false,
  saveUninitialized: true,
    store: new FileStore(),
}));
```

## 4 Setup passport
Create the file `passport/setup.js`. See the implementation in `passport/setup.js`

## 5 Setup the App to use the passport
Import in the `passport`setup.js` file.

```
const passport = require("./passport/setup")
```

Add the following to `app.js`, after the session setup:

```
app.use(passport.initialize()); // American spelling!
app.use(passport.session());
```

## 6. Create routes to register a user

## 7. Create a login route

First, create a login in form.

Then, for the POST method for the login, implement the authentication process:

```
router.post('/login', (req,res, next)=>{
    // second argument is the callback functoon that activates when authentication has finished processing
   let authProcess= passport.authenticate("local",  async (err, user, info)=>{
        if (err) {
            return res.status(400);
        }
        if (!user) {
            return res.status(400);
        }
        let loginError =  req.logIn(user, (loginError)=>{
                if (loginError) {
                    return res.status(400);
                } else {
                    res.send("User has logged in")
                }
            });
        });
     
    // run the authentication process
    authProcess(req, res, next);
})
```

## 8. Check if login is successful.

If login is successful the logged in user is available in `req.user`

See `users/profile` and `/restricted` route to check for login.

See `users/logout` to see how to logout

## 9. Add encryption

Import in `bcrypt` with:
```
require ('bycryptjs')
```

Use the following code to encrypt your password before saving in mongo:
```
async function createUser(name, email, password) {
    // salt the password first
    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    // todo: create user in mongo with the name, email and encryptedPassword
}
```

## 10. Compare encyrpted password when logging in
Inside `passport/setup.js`, change the comparsion between entered  password and the password in the user's record to:
```
if (user && bcrypt.compareSync(password, user.password)) ...
```
