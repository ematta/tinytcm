from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TestCase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(20), default='Not Run')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    def run_test(self):
        # Implement test execution logic here
        pass

    def upload_result(self, result: dict):
        # Implement result upload logic here
        pass

    def get_report(self) -> dict:
        # Implement report generation logic here
        return {}

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    test_cases = db.relationship('TestCase', backref='user', lazy=True)

    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

    def upload_test_case(self, test_case: TestCase):
        self.test_cases.append(test_case)

    def get_test_cases(self):
        return self.test_cases
