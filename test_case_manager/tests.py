import pytest
from main import app
from models import db, User, TestCase
from utils import hash_password

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
    client = app.test_client()

    with app.app_context():
        db.create_all()

    yield client

    with app.app_context():
        db.drop_all()

def test_create_user(client):
    response = client.post('/user', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 201
    assert response.get_json()['message'] == 'User testuser created successfully'

def test_get_user(client):
    password = hash_password('testpassword')
    user = User(username='testuser', password=password)
    db.session.add(user)
    db.session.commit()

    response = client.get('/user/testuser')
    assert response.status_code == 200
    assert response.get_json()['username'] == 'testuser'

def test_create_testcase(client):
    password = hash_password('testpassword')
    user = User(username='testuser', password=password)
    db.session.add(user)
    db.session.commit()

    response = client.post('/testcase', json={
        'name': 'Test Case 1',
        'description': 'This is a test case',
        'username': 'testuser'
    })
    assert response.status_code == 201
    assert response.get_json()['message'] == 'Test case Test Case 1 created successfully for user testuser'

def test_get_testcase(client):
    password = hash_password('testpassword')
    user = User(username='testuser', password=password)
    db.session.add(user)
    db.session.commit()

    testcase = TestCase(name='Test Case 1', description='This is a test case', user=user)
    db.session.add(testcase)
    db.session.commit()

    response = client.get(f'/testcase/{testcase.id}')
    assert response.status_code == 200
    assert response.get_json()['name'] == 'Test Case 1'
    assert response.get_json()['description'] == 'This is a test case'
