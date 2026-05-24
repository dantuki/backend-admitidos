exports.success = (req , res , message , status) => {
    const statusCode = status || 200;
    const statusMessage = message || 'Transacción exitosa';
    res.message = statusMessage;
    res.status(statusCode).send({
        error: false,
        code: statusCode,
        message: statusMessage
    });
};
exports.error = (req , res , message , status) => {
    const statusCode = status || 500;
    const statusMessage = message || 'Error en la transacción';
    res.message = statusMessage;
    res.status(statusCode).send({
        error: true,
        code: statusCode,
        message: statusMessage
    });
};