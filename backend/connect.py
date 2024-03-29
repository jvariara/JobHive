import psycopg

def connect(config):
    """ Connect to the PostgreSQL database server """
    try:
        # connecting to the PostgreSQL server
        with psycopg.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            return conn
    except (psycopg.DatabaseError, Exception) as error:
        print(error)

