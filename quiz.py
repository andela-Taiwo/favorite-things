
ascii_code = [ 104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 119, 101, 102, 102, 107, 102, 112, 102, 108, 101, 109, 115, 105, 115, 111, 100, 100 ]

result = [chr(code) for code in ascii_code]
print(''.join(result))


from cryptography.fernet import Fernet
key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='
message = b'gAAAAABdeI4CIAsB7evrXSx6LD0lU8rPTlArIZOviQVwzGORZpqq54ThJvGs2mi_LGvqeweKIbXUKlJzD4EwFl2T6JqvniyYhog6DqhuzUHlzL8qgDLsqupZUwwjYz6WrhQdvAN0bjHLRSY70fZ6rQf5TS9sH5ccM-WGnxIwmfA0Dt0ljsIcDsc='

def main():
    f = Fernet(key)
    print(f.decrypt(message))


if __name__ == "__main__":
    main()