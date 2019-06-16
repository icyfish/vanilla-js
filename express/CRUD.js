// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("hello world");
//     res.end();
//   }

//   if (req.url === "api/courses") {
//     res.write(JSON.stringify([1, 2, 3]));
//     res.end();
//   }
// });

// server.listen(3000);

// console.log("Listening on port 3000");

const Joi = require("@hapi/joi"); // for better validation
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
  { id: 3, name: "three" },
  { id: 4, name: "four" }
];

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error, value } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: value.name
  };
  courses.push(course);
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");
  const { error, value } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send({ course, courses });
});

app.get("*", (req, res) => {
  res.send("hello world");
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with given ID was not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send({ course, courses });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
