module.exports = department => {
    return (req, res, next) => {
        console.log(req.user)
        if(department === req.user.department) {
            next();
        } else {
            res.status(403).json({message: "Unauthorized"})
        }
    }
}