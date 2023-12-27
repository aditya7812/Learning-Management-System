
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



## Screenshots

#### Home

![Home](./Screenshots/1.png)

![Home](./Screenshots/2.png?raw=true)

#### Login 

![Login](./Screenshots/3.png?raw=true)

#### Signup

![Signup](./Screenshots/4.png?raw=true)

#### Course Details

![Course_1](./Screenshots/5.png?raw=true)

![Course_2](./Screenshots/6.png?raw=true)

#### Purchase

![Stripe](./Screenshots/7.png?raw=true)

#### Certificate

![Certificate](./Screenshots/8.png?raw=true)

#### Rating and Review

![Review](./Screenshots/9.png?raw=true)

#### Purchased Courses

![Purchased_Courses](./Screenshots/10.png?raw=true)

#### Search

![Search](./Screenshots/11.png?raw=true)

#### Profile 

![Profile](./Screenshots/12.png?raw=true)

#### Instructor Dashboard

![Dahboard](./Screenshots/13.png?raw=true)

#### Course Creation

![Create](./Screenshots/14.png?raw=true)

![Create](./Screenshots/15.png?raw=true)

![Create](./Screenshots/16.png?raw=true)

![Create](./Screenshots/17.png?raw=true)

![Create](./Screenshots/18.png?raw=true)

![Create](./Screenshots/19.png?raw=true)


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

