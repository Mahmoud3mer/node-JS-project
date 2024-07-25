
module.exports = (fn) => {
    return (req, res , next) => {
        fn(req, res , next).catch((err) => {
            next(err) // send error to Global middleware Error handler
        });
    }
}