module.exports = {
    auth: (req, res, next) => {
        try {
            const { userByEmail } = req;

            res.json(userByEmail);
        } catch (e) {
            next(e);
        }
    }
};
