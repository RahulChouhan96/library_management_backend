const port = "2000";
const host = "127.0.0.1";

const dbUrl = "mongodb://Rahul:password1@ds157857.mlab.com:57857/library_management";
const dbUsr = "Rahul";
const dbPwd = "Password@1";
const authSource = "library_management";

const scrtKey = "Library";

module.exports = {
    PORT: port,
    HOST: host,
    DBURL: dbUrl,
    DBUSR: dbUsr,
    DBPWD: dbPwd,
    authSource: authSource,
    SCRTKEY: scrtKey
};