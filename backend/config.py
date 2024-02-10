from configparser import ConfigParser

def load_config(filename='database.ini', section='postgresql'):
    parser = ConfigParser()
    parser.read(filename)

    # get section, default to postgresql
    config = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            config[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))
    return config

def load_string():
    config = load_config()
    return f"postgresql://{config['user']}:{config['password']}@{config['host']}/{config['dbname']}"

if __name__ == '__main__':
    config = load_config()
    print(config)