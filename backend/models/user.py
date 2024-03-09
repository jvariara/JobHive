from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from db import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    display_name = db.Column(db.String(16), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    last_login = db.Column(db.DateTime)
    
    def __init__(self, username, email, password) -> None:
        super(Users, self)
        self.username = username
        self.email = email
        self.password = generate_password_hash(password),
        self.display_name = username
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
        
    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
    
    @staticmethod
    def nuke():
        db.session.query(Users).delete()
        db.session.commit()
    
    def check_password(self, password):
        return (check_password_hash(self.password, password))
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'display_name': self.display_name,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat() if self.last_login else None,
        }
    # def save_to_db(self):
    #     insert_query = sql.SQL("""
    #         INSERT INTO users (username, email, password),
    #         VALUES ({username}, {email}, {password}),
    #         RETURNING id;
    #     """).format(
    #         username=sql.Literal(self.username),
    #         password=sql.Literal(generate_password_hash(self.password, method='sha256')),
    #         email=sql.Literal(self.email),
    #     )
        
    #     cursor.execute(insert_query)
    #     user_id = cursor.fetchone()[0]
    #     conn.commit()
    #     return user_id
    
    # #searchs for username passed into the function. If the db
    # #finds a user, it will create a user object and return it.
    # @classmethod
    # def find_by_username(cls, username):
    #     query = sql.SQL("""
    #         SELECT * FROM users
    #         WHERE username = {username};
    #     """).format(
    #         username=sql.Literal(username)
    #     )
        
    #     cursor.execute(query)
    #     row = cursor.fetchone()
        
    #     if row:
    #         return cls(*row)
    #     else:
    #         return None
        
    # def check_password(self, password):
    #     return (check_password_hash(self.password, password))
    
    