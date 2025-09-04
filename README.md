This is the Recipe Book app. Find all your favorite recipes.

# Getting Started

## Frontend

Move into `/frontend` folder

```bash
cd frontend
```

Install packages

```bash
npm install
# or
yarn install
```

Start dev

```bash
# then
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Backend

Migrate database:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create super user for development:

```bash
python manage.py createsuperuser
```

Add initial data:

```bash
python populate_data.py init
```

Install NPM packages in frontend folder:

```bash
npm install
# or
yarn install
```

## Run for development

Run the backend python server:

```bash
python manage.py runserver
```

To access the Django admin open [http://localhost:3030/admin/](http://localhost:3030/admin/)

## Django Development

Create new models

```bash
 python manage.py makemigrations
```

Migrate changes database

```bash
python manage.py migrate
```

To access the django shell

```bash
python manage.py dbshell
```
