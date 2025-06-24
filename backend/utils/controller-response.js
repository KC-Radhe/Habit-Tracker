const successResponse = (res) => {
    return {
        success: true,
        statusCode: res.statusCode,
        message: res.message,
        response: res.response,
    }
};

const errorResponse = (err) => {
    return {
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal server error',
        error: err.stack
    }
};

module.exports = {
    successResponse,
    errorResponse,
}