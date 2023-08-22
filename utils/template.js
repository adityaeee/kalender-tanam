const dataLayout = (req, props ) => {
    console.log(req.cookies)
    return {
        layout: "layouts/main-layouts",
        tahun: process.env.TAHUN,
        msg: req.flash("msg"),
        user: req.cookies?.user ? JSON.parse(req.cookies?.user) : {},
        ...props    
    }
}

module.exports = {dataLayout}