const handleLogOut = (req, res, next) => {
    req.session=null;
    res.json({success:true});
}

module.exports = handleLogOut
