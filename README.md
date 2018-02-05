Install python and pip
Install virtualenvwrapper
Create a virtual environment
pip install gunicorn

Install nginx and update your nginx.conf to run on port 80

Go to directory containing codebase
pip install -r requirements.txt
npm install

Make changes to ALLOWED_HOSTS in backend/settings.py file to include your ip-address

Generate static files using below command
node_modules/.bin/webpack --config webpack.config.js

Run server using
gunicorn -b 0.0.0.0:8000 backend.wsgi
