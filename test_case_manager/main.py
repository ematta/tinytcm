from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import User, TestCase

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

@app.route('/')
def index():
    return "Welcome to the Test Case Manager!"

@app.route('/user/<username>', methods=['POST'])
def create_user(username):
    user = User(username=username)
    db.session.add(user)
    db.session.commit()
    return f"User {username} created successfully"

@app.route('/testcase/<username>', methods=['POST'])
def create_testcase(username):
    user = User.query.filter_by(username=username).first()
    if user:
        testcase = TestCase(name='Test Case 1', description='This is a test case')
        user.upload_test_case(testcase)
        db.session.commit()
        return f"Test case created successfully for user {username}"
    else:
        return "User not found"

@app.route('/testcase/<username>', methods=['GET'])
def get_testcases(username):
    user = User.query.filter_by(username=username).first()
    if user:
        testcases = user.get_test_cases()
        return f"Test cases for user {username}: {testcases}"
    else:
        return "User not found"

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
