exports.status = (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "It´s working"
    })
    console.log("It is running");
}