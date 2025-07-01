import Hashids from 'hashids';

const salt = process.env.HASHID_SALT || 'some-secure-random-string';

const hashids = new Hashids(salt, 10);

function encodeId(hexId) {
  return hashids.encodeHex(hexId);
}

function decodeId(hashid) {
  return hashids.decodeHex(hashid);
}

export default {
  encodeId,
  decodeId,
  instance: hashids,
};

