import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local";
import { JWT_SECRET } from "../utils/jwt.js";
import { userModel } from "../models/user.model.js";
import { compareHash } from "../utils/hash.js";
import { createHash } from "../utils/hash.js";

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function initializePassport() {
  // Login
  passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                console.log("Usuario encontrado:", user);

                if (!user) {
                    return done(null, false, { message: "Usuario no encontrado" });
                }

                const isPw = await compareHash(password, user.password);
                console.log("Contraseña coincide:", isPw);

                if (!isPw) {
                    return done(null, false, { message: "Contraseña incorrecta" });
                }

                return done(null, user);
            } catch (error) {
                console.log(error);
                return done(`Hubo un error: ${error.message}`);
            }
        }
    )
);

  // Register
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age, role } = req.body;

          if(!first_name || !last_name || !age || !role){
            return done(null, false, { message: "Faltan datos" });
          }

          const userExists = await userModel.findOne({ email });
          if (userExists) { 
            return done(null, false, { message: "El usuario ya existe" });
          }

          const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email,
            password: await createHash(password),
            age: req.body.age,
            role: req.body.role
          };
          const user = await userModel.create(newUser);
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(`Hubo un error: ${error.message}`);
        }
      }
    )
  );
    
    passport.deserializeUser(async (id, done) => {
        try {
          const user = await userModel.findById(id);
    
          return done(null, user);
        } catch (error) {
          return done(null, false, { message: `Hubo un error: ${error.message}` });
        }
    });

    function cookieExtractor(req) {
      let token = null;
    
      if (req && req.cookies) {
        token = req.cookies.token;
      }
      console.log("cookieExtractor", token);
    
      return token;
  }

    // JWT
    passport.use(
        "jwt",
        new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => {
            try {
            done(null, payload);
            } catch (error) {
            return done(null, false, { message: `Error: ${error.message}` });
            }
        }
        )
    );

}
  
export { initializePassport };

  