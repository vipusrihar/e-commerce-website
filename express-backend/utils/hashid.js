import Hashids from 'hashids';

const hashids = new Hashids(process.env.HASHID_SALT || 'default-salt', 10);

export default hashids;
