import { randomBytes } from "crypto"
import { NextFunction, Request, Response } from 'express'

export interface CsrfRequest extends Request {
    session: any
    csrf_token: any
}


const generateCSRFToken = (
    req: CsrfRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const path = req.route.path;
        const data = randomBytes(36).toString('base64'); //Generates pseudorandom data. The size argument is a number indicating the number of bytes to generate.
        req.csrf_token = data; // Used as a response and cookie parameter in router. 
        if (path == "/setCSRFTokenSTP") {
            req.session.csrfToken = data; // Assigns a token parameter to the session.
        }
        next();
    } catch (e:any) {
        res.status(500).json({ result: false, message: e.message });
        return;
    }
}


const checkCSRFTokenSTP = (
    req: CsrfRequest,
    res: Response,
    next: NextFunction
)=> {
    try {
        const sessionUserAuth = req.session.userAuthentication;
        const sessionCsrfToken = req.session.csrfToken;
        const requestCsrfToken = req.get('CSRF-Token'); //The token sent within the request header.
        if (!sessionUserAuth || !requestCsrfToken || !sessionCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Token has not been provided.'
                });
        }
        if (requestCsrfToken !== sessionCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Invalid token.'
                });
        }
        next();
    } catch (e: any) {
        res.status(500).json({ result: false, message: e.message });
        return;
    }
}


const checkCSRFTokenDSC = (
    req: CsrfRequest,
    res: Response,
    next: NextFunction
)=> {
    try {
        const sessionUserAuth = req.session.userAuthentication;
        const cookieCsrfToken = req.cookies.CSRF_TOKEN;
        const requestCsrfToken = req.get('CSRF-Token'); //The token sent within the request header.

        if (!sessionUserAuth || !requestCsrfToken || !cookieCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Token has not been provided.'
                });
            return;
        }
        if (requestCsrfToken !== cookieCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Invalid token.'
                });
            return;
        }
        next();
    } catch (e:any) {
        res.status(500).json({ result: false, message: e.message });
        return;
    }
}

/**
 * @desc set and check csrf token.
 * */
export default {
    generateCSRFToken, checkCSRFTokenSTP, checkCSRFTokenDSC
};