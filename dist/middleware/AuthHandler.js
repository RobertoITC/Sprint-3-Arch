"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandler = void 0;
// ---------------- middleware/AuthHandler.ts -------------
const Handler_1 = require("./Handler");
// src/middleware/Handler.ts
class AuthHandler extends Handler_1.Handler {
    setNext(next) {
        this.next = next;
        return next;
    }
    // ——— REPLACE THIS METHOD ———
    handle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug(`🔍 Handler: start for request #${req.id}`);
            let proceed;
            try {
                proceed = yield this.process(req);
                console.debug(`🔍 Handler: process returned ${proceed} for request #${req.id}`);
            }
            catch (err) {
                console.error(`⚠️  Handler.process threw for request #${req.id}:`, err);
                return false;
            }
            if (!proceed) {
                console.debug(`🔍 Handler: stopping chain at request #${req.id}`);
                return false;
            }
            if (this.next) {
                console.debug(`🔍 Handler: passing to next handler for request #${req.id}`);
                const nextResult = yield this.next.handle(req);
                console.debug(`🔍 Handler: next handler returned ${nextResult} for request #${req.id}`);
                return nextResult;
            }
            console.debug(`🔍 Handler: end of chain for request #${req.id}`);
            return true;
        });
    }
    // ——— END REPLACEMENT ———
    process(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`🔒  AuthHandler: checking auth for request #${req.id}`);
            // Simulate auth check
            yield new Promise((r) => setTimeout(r, 20));
            const isAuthenticated = Math.random() > 0.5; // Randomly pass or fail auth
            if (!isAuthenticated) {
                console.warn(`❌  AuthHandler: request #${req.id} failed auth`);
                return false;
            }
            console.log(`✅  AuthHandler: request #${req.id} passed auth`);
            return true;
        });
    }
}
exports.AuthHandler = AuthHandler;
