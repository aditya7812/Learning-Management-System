
# Learning Management System (Udemy Clone)

Full Stack Project project build with MERN Stack along with other technologies.


## Tech Stack

**Client:** React, Redux-Toolkit, RTK Query, React-Hook-Form, TailwindCSS, react-pdf

**Server:** Node, Express, MongoDB, Stripe, JWT, Cloudinary


## Features


- Login/Signup
- Two Roles (Student, Instructor)

#### For Student
- Create/Edit Profile
- See Published Courses
- See Course Details
- Purchase Course
- See Course Progress
- Download Certificate
- Give/Edit Rating/Review to Enrolled Course
- See All Enrolled Course

#### For Instructor
- Create Course 
- Create/Edit Course Details 
- Add Sections/SubSections to Course
- Set Price, Category, Subcateogry Level, Language of Course

##### User can have both roles at a time


## Run Locally

Clone the project

```bash
  git clone https://github.com/aditya7812/Learning-Management-System.git
```

Go to the project directory

```bash
  cd Learning-Management-System
```

Install backend dependencies

```bash
  cd Backend
  npm install
```

Start the server

```bash
  npm run dev
```

Install frontend dependencies

```bash
  cd Frontend
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
### Frontend

`VITE_STRIPE_PROMISE`

### Backend

`ACCESS_TOKEN_SECRET`

`REFRESH_TOKEN_SECRET`

`MONGODB_URL`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

`CLOUD_NAME`

`FOLDER_NAME`

`PROFILE_FOLDER_NAME`

`STRIPE_KEY`


## Roadmap

- Form validation with Zod
- Display Success/Error Notification to User
- Responsive Design
- Different Payment Features
- Instructor Earning Dashboard
- Filter Courses by price/rating/category

##### If you want any other features you can use pull request


## Refernce
[Dave Gray Mern Stack Course](https://github.com/gitdagray/mern_stack_course)

Love Babbar Megaproject Repository





## License

[MIT](https://choosealicense.com/licenses/mit/)

