import inquirer from 'inquirer';
class Student {
    static idCounter = 1;
    id;
    name;
    enrolledCourses = [];
    constructor(name) {
        this.id = Student.idCounter++;
        this.name = name;
    }
    enroll(course) {
        this.enrolledCourses.push(course);
        console.log(`${this.name} is enrolled in ${course.name}.`);
    }
    displayCourses() {
        if (this.enrolledCourses.length > 0) {
            console.log(`${this.name}'s enrolled courses:`);
            this.enrolledCourses.forEach((course) => {
                console.log(`- ${course.name}`);
            });
        }
        else {
            console.log(`${this.name} is not enrolled in any courses.`);
        }
    }
}
class Course {
    name;
    constructor(name) {
        this.name = name;
    }
}
class StudentManagementSystem {
    students = [];
    courses = [];
    addStudent(name) {
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`Student ${name} added with ID ${newStudent.id}.`);
    }
    displayStudents() {
        console.log('List of Students:');
        this.students.forEach((student) => {
            console.log(`ID: ${student.id}, Name: ${student.name}`);
        });
    }
    addCourse(courseName) {
        const newCourse = new Course(courseName);
        this.courses.push(newCourse);
        console.log(`Course ${courseName} added.`);
    }
    displayCourses() {
        console.log('List of Courses:');
        this.courses.forEach((course) => {
            console.log(`Course: ${course.name}`);
        });
    }
    async addStudentFromPrompt() {
        const { name } = await inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'Enter student name:',
        });
        this.addStudent(name);
    }
    async addCourseFromPrompt() {
        const { courseName } = await inquirer.prompt({
            name: 'courseName',
            type: 'input',
            message: 'Enter course name:',
        });
        this.addCourse(courseName);
    }
    enrollStudent(studentId, courseName) {
        const student = this.students.find((s) => s.id === studentId);
        const course = this.courses.find((c) => c.name === courseName);
        if (student && course) {
            student.enroll(course);
        }
        else {
            console.log('Student or course not found.');
        }
    }
    async enrollStudentFromPrompt() {
        const studentChoices = this.students.map((student) => ({
            name: student.name,
            value: student.id,
        }));
        const courseChoices = this.courses.map((course) => course.name);
        const enrollmentData = await inquirer.prompt([
            {
                name: 'studentId',
                type: 'list',
                message: 'Select a student to enroll:',
                choices: studentChoices,
            },
            {
                name: 'courseName',
                type: 'list',
                message: 'Select a course to enroll:',
                choices: courseChoices,
            },
        ]);
        this.enrollStudent(enrollmentData.studentId, enrollmentData.courseName);
    }
}
// Example Usage:
async function main() {
    const studentSystem = new StudentManagementSystem();
    while (true) {
        const choice = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'Choose an action:',
            choices: ['Add Student', 'Add Course', 'Enroll Student', 'Display Students', 'Display Courses', 'Quit'],
        });
        switch (choice.action) {
            case 'Add Student':
                await studentSystem.addStudentFromPrompt();
                break;
            case 'Add Course':
                await studentSystem.addCourseFromPrompt();
                break;
            case 'Enroll Student':
                await studentSystem.enrollStudentFromPrompt();
                break;
            case 'Display Students':
                studentSystem.displayStudents();
                break;
            case 'Display Courses':
                studentSystem.displayCourses();
                break;
            case 'Quit':
                console.log('Goodbye!');
                process.exit(0);
        }
    }
}
main();
