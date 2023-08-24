import bcrypt

def hash_password(password: str) -> str:
    """
    Hash a password for storing in the database.
    """
    password = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password, salt)
    return hashed.decode('utf-8')

def check_password(password: str, hashed: str) -> bool:
    """
    Check a hashed password.
    """
    password = password.encode('utf-8')
    hashed = hashed.encode('utf-8')
    return bcrypt.checkpw(password, hashed)
