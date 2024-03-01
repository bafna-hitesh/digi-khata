# loaders/errors.py

from flask import Flask, jsonify, make_response

class HttpError(Exception):
    def __init__(self, message: str, status: int) -> None:
        super().__init__(message)
        self.status = status
        self.message = message  # Ensure the message attribute is set

def load_errors(app: Flask):
    @app.errorhandler(HttpError)
    def handle_http_error(error: HttpError):
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
