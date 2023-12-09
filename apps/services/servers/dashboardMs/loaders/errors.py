from flask import Flask, jsonify, request, Response, make_response


class HttpError(Exception):
    status: int

    def __init__(self, message: str, status: int) -> None:
        super().__init__(message)
        self.status = status


def load_errors(app: Flask):
    """
    Registers error handling middleware for the application.

    Args:
        app: Flask application instance.
    """

    @app.errorhandler(HttpError)
    def handle_http_error(error: HttpError) -> Response:
        response = make_response(
            jsonify({"errors": {"message": error.message}})
        )
        response.status_code = error.status
        return response

    @app.errorhandler(404)
    def handle_not_found(error):
        response = make_response(
            jsonify({"errors": {"message": "Not Found"}}), 404
        )
        return response
