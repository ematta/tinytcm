from flask import Flask, request, jsonify
from models import db, User, TestCase
from utils import hash_password, check_password

app = Flask(__name__)

@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    hashed_password = hash_password(password)
    user = User(username=username, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': f'User {username} created successfully'}), 201

@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'username': user.username, 'created_at': user.created_at}), 200

@app.route('/testcase', methods=['POST'])
def create_testcase():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    username = data.get('username')
    if not name or not description or not username:
        return jsonify({'message': 'Name, description and username are required'}), 400
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    testcase = TestCase(name=name, description=description, user=user)
    db.session.add(testcase)
    db.session.commit()
    return jsonify({'message': f'Test case {name} created successfully for user {username}'}), 201

@app.route('/testcase/<int:testcase_id>', methods=['GET'])
def get_testcase(testcase_id):
    testcase = TestCase.query.get(testcase_id)
    if not testcase:
        return jsonify({'message': 'Test case not found'}), 404
    return jsonify({
        'name': testcase.name,
        'description': testcase.description,
        'status': testcase.status,
        'created_at': testcase.created_at,
        'updated_at': testcase.updated_at
    }), 200
