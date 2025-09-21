// Client-side auth driven by Medo localStorage wrapper using a dedicated 'auth' collection
import db from "./Medo.js";

const COLLECTION = "auth";

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromString(str) {
  return new TextEncoder().encode(str);
}

function randomSalt(len = 16) {
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  return toHex(buf);
}

async function sha256Hex(input) {
  const data = fromString(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

function getAuthDoc() {
  return db.getBy("type", "config", COLLECTION) || null;
}

function ensureAuthDoc() {
  let doc = getAuthDoc();
  if (!doc) {
    const id = db.insert(
      { type: "config", salt: null, passwordHash: null, loggedIn: false },
      COLLECTION
    );
    // fetch with id to include the id field
    doc = db.getById(id, COLLECTION);
  }
  return doc;
}

export function isPasswordSet() {
  const doc = getAuthDoc();
  return !!(doc && doc.passwordHash);
}

export async function setPassword(password) {
  if (!password || password.length < 4) {
    throw new Error("Le mot de passe doit contenir au moins 4 caractères.");
  }
  const salt = randomSalt();
  const hash = await sha256Hex(salt + ":" + password);
  const doc = ensureAuthDoc();
  db.update(COLLECTION, doc.id, {
    salt,
    passwordHash: hash,
    loggedIn: true, // auto-login after registering
  });
}

export async function verifyPassword(password) {
  const doc = getAuthDoc();
  if (!doc || !doc.passwordHash || !doc.salt) return false;
  const hash = await sha256Hex(doc.salt + ":" + password);
  return hash === doc.passwordHash;
}

export function isAuthenticated() {
  const doc = getAuthDoc();
  return !!(doc && doc.passwordHash && doc.loggedIn === true);
}

export async function login(password) {
  const ok = await verifyPassword(password);
  if (!ok) return false;
  const doc = ensureAuthDoc();
  db.update(COLLECTION, doc.id, { loggedIn: true });
  return true;
}

export function logout() {
  const doc = getAuthDoc();
  if (!doc) return;
  db.update(COLLECTION, doc.id, { loggedIn: false });
}
