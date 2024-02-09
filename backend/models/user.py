from psycopg import sql, connect
from config import load_config

config = load_config()
conn = connect(config)
cursor = conn.cursor()

class User:
    def __init__(self, username, password, email) -> None:
        self.username = username
        self.password = password
        self.email = email
    
    def save_to_db(self):
        insert_query = sql.SQL("""
            INSERT INTO users (username, email, password),
            VALUES ({username}, {email}, {password}),
            RETURNING id;
        """).format(
            username=sql.Literal(self.username),
            password=sql.Literal(self.password),
            email=sql.Literal(self.email),
        )
        
        cursor.execute(insert_query)
        user_id = cursor.fetchone()[0]
        conn.commit()
        return user_id
    
    @classmethod
    def find_by_username(cls, username):
        query = sql.SQL("""
            SELECT * FROM users
            WHERE username = {username};
        """).format(
            username=sql.Literal(username)
        )
        
        cursor.execute(query)
        row = cursor.fetchone()
        
        if row:
            return cls(*row)
        else:
            return None