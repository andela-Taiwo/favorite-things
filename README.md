
# Favorite-Things-App
The project is an application that allows the user to track their favorite things

Badges
[![CircleCI](https://circleci.com/gh/andela-Taiwo/favorite-things.svg?style=svg)](https://circleci.com/gh/andela-Taiwo/favorite-things)

## Technology 
* **Python 3** : “Python is a widely used high-level programming language for general-purpose programming, created by Guido van Rossum and first released in 1991[source](https://www.python.org/downloads/release/python-360/). An interpreted language, Python has a design philosophy which emphasizes code readability (notably using whitespace indentation to delimit code blocks rather than curly braces or keywords), and a syntax which allows programmers to express concepts in fewer lines of code than possible in languages such as C++ or Java. The language provides constructs intended to enable writing clear programs on both a small and large scale” 
* **pip** : “The PyPA recommended tool for installing Python packages” [source](https://pypi.org/project/pip/). Use pip to manage what Python packages the system or a virtualenv has available.
* **Virtualenv** : “A tool to create isolated Python environments” [source](https://virtualenv.pypa.io/en/latest/). We will use virtualenv to create a environment where the tools used will not interfere with the system’s local Python instance.
* **Django**: “Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design.” [source](https://www.djangoproject.com/). We will install Django using pip.

## Backend Features 

* - Login `POST api/v1/login/` 
* - List all favorites for a user `GET api/v1/favorites/`
* - Add a new favorite thing `POST api/v1/favorites/`
* - Retrieve a favorite `GET api/v1/favorite/{favorite_id}/`
* - Update a favorite `PUT api/v1/favorite/{favorite_id}/`

#### Yet to be implemented
* - Complete signup flow
* - Delete a favorite `DELETE api/v1/favorite/{favorite_id}/`
* - Update user roles `PUT api/v1/user-roles/{user_id}/update/`
* - Create roles  `POST api/v1/roles/`

## Frontend Features 
* - login
* - Create a favorite
*  - List all favorites
* - Updating a favorite 


## Installation

### Directory structure

It is recommended to use following directory structure:

```
<favorite_things> (git clone to this)
```
- `For environment variables follow the .env-sample or contact the developer`
- 


## Requirements and dependencies for Backend

- Postgresql 10 (or above)
- Python 3.6.x
- `git clone https://github.com/andela-Taiwo/favorite-things.git`
- `cd backend`
- Virtual Python environment
  - `pip install virtualenv`
    - This will install a tool called `virtualenv` that is able to create a python sandbox directory with all of the packages installed within that directory. This helps separating different project requirements 
  - `virtualenv env`
  - Mac OS X: 
    `pip install virtualenvwrapper`
    `export WORKON_HOME=~/Envs`
    `source /usr/local/bin/virtualenvwrapper.sh`
    `mkvirtualenv my_project`
        - This will create a virtual env .This environment has to be manually activated(see below)
        `workon my_project`
- `pip install -r requirements.txt`
  - This will install all of the required packages to run the server.
-  `.env` configuration file that contains basic settings for the backend, otherwise the backend won’t run.
- `python manage.py runserver`
  - First run of the API server.


## Running
Everytime you’ll want to call python code, you need to activate the environment first:

- `Favorite-Things-App`
- `workon my_project`
-  `cd backend`
- ` activate a virtual environment`
- `pip install -r requirements.txt`
- `py manage.py migrate`
- ` cd frontend  run npm install `
- `start backend with "python manage.py runserver"`
 `start frontend with "npm run server"`
 
Then you can proceed with running the server (or other operations described below):

To turn it off, simply stop the process in the command line.

## Running Tests:
 - `cd backend`
 - `tox`

## Updating
- Optionally turn off the server. It might be needed in some cases when the changes are too complex. Otherwise the running server usually picks up the changes automatically and restarts itself.
- `git pull`
-  `cd backend`
- `py manage.py migrate`
- Turn server back on if you have turned it off with `python manage.py runserver`

## Authors

* **Sokunbi Taiwo** - [Taiwo](https://github.com/andela-Taiwo)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details