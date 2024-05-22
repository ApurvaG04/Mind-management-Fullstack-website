# Install all the dependencies from Pipfile

# Run below command before creating the database

from app import app
from app import db
app.app_context().push()
db.create_all()

# Run -> Start debugging to start the backend
