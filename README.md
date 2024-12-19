This is the Recipe Book app. Find all your favorite recipes.

## Getting Started

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

Install NPM packages in next_app folder:

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

Run the frontend npm server from the next_app folder:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

To access the Django admin open [http://localhost:8000/admin/](http://localhost:8000/admin/)

## Django Development

Create new models

``` bash
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

## Next Development
App entry `next_app/src/pages/index.tsx`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Learn More
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
