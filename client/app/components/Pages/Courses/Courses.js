import React, {Component} from 'react';
import axios from 'axios';
// import {Link, Redirect} from 'react-router-dom';
import CourseCard from '../Courses/CourseCard';

class CoursesAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            name: '',
            code: '',
            department: '',
            semester: 0,
            t1: 0,
            t2: 0,
            assignment: 0,
            esa: 0,
            description: '',
            resourcesUrl: '',
            startDate: new Date(),
            endDate: new Date(),
            credits: 0,
            hours: 0,
            isCore: '',
            courses: [],
            show: false,
            update: false,
            file: null,
            showUpload: true,
            professor: '',
            professors: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChange=this.onChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCreditsChange = this.handleCreditsChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleisCoreChange = this.handleisCoreChange.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleProfessorChange = this.handleProfessorChange.bind(this);
        this.handleSemesterChange = this.handleSemesterChange.bind(this);
        this.handleT1Change = this.handleT1Change.bind(this);
        this.handleT2Change = this.handleT2Change.bind(this);
        this.handleAssignmentMarksChange = this.handleAssignmentMarksChange.bind(this);
        this.handleESAChange = this.handleESAChange.bind(this);
    }

    componentDidMount() {
        let self = this;
        let userID = localStorage.getItem('user_id');
        let token = localStorage.getItem('token');

        let apiPath = '/api/account/' + userID + '/details';
        axios.get(apiPath, {
            headers: {
                'x-access-token': token
            }
        }).then(function(response) {
            if (!response.data.success) {
                console.log('Error1: ' + response.data);
                return;
            }
            let data = response.data;
            self.setState({
                role: data.user.role
            }, () => {
                if(self.state.role == 'admin') {
                    let apiAdminPath = 'api/assignments/' + userID + '/allCourses';
                    axios.get(apiAdminPath, {
                        headers: {
                            'x-access-token': token,
                            'Content-Type': 'application/json'
                        }
                    }).then(function(response) {
                        if (!response.data.success) {
                            console.log('Error1: ' + response.data);
                        }
                        let data = response.data;
                        self.setState({
                            courses: self.state.courses.concat(data.courses.courses)
                        });
                        console.log(response.data);
                    }).catch(function(error) {
                        console.log('Error2: ', error);
                    });    
                }
                
                else if(self.state.role == 'prof') {
                    let apiProfPath = 'api/assignments/' + userID + '/profCourses';
                    console.log(apiProfPath);
                    axios.get(apiProfPath, {
                        headers: {
                            'x-access-token': token,
                            'Content-Type': 'application/json'
                        }
                    }).then(function(response) {
                        if (!response.data.success) {
                            console.log('Error1: ' + response.data);
                        }
                        let data = response.data;
                        self.setState({
                            courses: self.state.courses.concat(data.courses.courses)
                        });
                        console.log(response.data);
                    }).catch(function(error) {
                        console.log('Error2: ', error);
                    });       
                } 
        
                else if(self.state.role == 'student') {
                    let apiStudentPath = 'api/assignments/' + userID + '/studentCourses';
                    axios.get(apiStudentPath, {
                        headers: {
                            'x-access-token': token,
                            'Content-Type': 'application/json'
                        }
                    }).then(function(response) {
                        if (!response.data.success) {
                            console.log('Error1: ' + response.data);
                        }
                        let data = response.data;
                        self.setState({
                            courses: self.state.courses.concat(data.courses.courses)
                        });
                        console.log(response.data);
                    }).catch(function(error) {
                        console.log('Error2: ', error);
                    });    
                }
                else {}
            });
        }).catch(function(error) {
            console.log('Error2: ', error);
        });

        let apiProfPath = '/api/account/professors/all';
        axios.get(apiProfPath, {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (!response.data.success) {
                console.log('Error1: ' + response.data);
            }
            let data = response.data;
            self.setState({
                professors: self.state.professors.concat(data.user.users)
            });
        }).catch(function(error) {
            console.log('Error2: ', error);
        });
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleCodeChange(e) {
        this.setState({
            code: e.target.value
        });
    }
    handleDepartmentChange(e) {
        this.setState({
            department: e.target.value
        });
    }
    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }
    handleCreditsChange(e) {
        this.setState({
            credits: e.target.value
        });
    }
    handleURLChange(e) {
        this.setState({
            resourcesUrl: e.target.value
        });
    }
    handleStartDateChange(e) {
        this.setState({
            startDate: e.target.value
        });
    }
    handleEndDateChange(e) {
        this.setState({
            endDate: e.target.value
        });
    }
    handleisCoreChange(e) {
        this.setState({
            isCore: e.target.value
        });
    }
    handleHoursChange(e) {
        this.setState({
            hours: e.target.value
        });
    }

    handleProfessorChange(e) {
        this.setState({
            professor: e.target.value
        });
    }

    handleSemesterChange(e) {
        this.setState({
            semester: e.target.value
        });
    }

    handleT1Change(e) {
        this.setState({
            t1: e.target.value
        });
    }

    handleT2Change(e) {
        this.setState({
            t2: e.target.value
        });
    }

    handleAssignmentMarksChange(e) {
        this.setState({
            assignment: e.target.value
        });
    }

    handleESAChange(e) {
        this.setState({
            esa: e.target.value
        });
    }

    onChange(e){
        this.setState({
            file: e.target.files[0]
        });
    }
    reload() {
        window.location.reload();
    }

    onAdd() {
    // /api/courses/:userID/createCourse
        let self = this;
        let userID = localStorage.getItem('user_id');
        let token = localStorage.getItem('token');
        let apiPath = 'api/courses/' + userID + '/createCourse';
        let config = {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        };
        let data = Object.assign({}, self.state.course);

        data.name = self.state.name;
        data.code = self.state.code;
        data.department = self.state.department;
        data.description = self.state.description;
        data.resourcesUrl = self.state.resourcesUrl;
        data.details = {};
        data.details.credits = self.state.credits;
        data.details.hours = self.state.hours;
        data.details.isCore = self.state.isCore;
        data.duration = {};
        data.duration.startDate = self.state.startDate;
        data.duration.endDate = self.state.endDate;
        data.professors = self.state.professor;
        data.semester = self.state.semester;
        data.marks = {};
        data.marks.t1 = self.state.t1;
        data.marks.t2 = self.state.t2;
        data.marks.assignment = self.state.assignment;
        data.marks.esa = self.state.esa;

        data = JSON.stringify(data);
        console.log(data);
        axios.post(apiPath, data, config)
            .then((res) => {
                console.log(res.data);
                this.reload();
            })
            .catch((err) => {
                console.log(err);
                alert('Course Failed to Upload!');
            });
    }
    showForm() {
        this.setState({
            show: true
        });
    }
    closeForm() {
        this.setState({
            show: false
        });
    }

    editCourse(courseID) {
        console.log('editing: ' + courseID);
        let courseToBeEdited = this.state.courses.find(function(assign) {
            return assign._id == courseID;
        });
        courseToBeEdited.duration = courseToBeEdited.duration || {startDate: "2000-01-01", endDate: "2000-01-01"};
        this.setState({
            edit: courseID,
            update: true,
            show: true,
            name: courseToBeEdited.name,
            code: courseToBeEdited.code,
            department: courseToBeEdited.department,
            description: courseToBeEdited.description,
            credits: courseToBeEdited.details.credits,
            resourcesUrl: courseToBeEdited.resourcesUrl,
            startDate: courseToBeEdited.duration.startDate.slice(0, 10),
            endDate: courseToBeEdited.duration.endDate.slice(0, 10),
            hours: courseToBeEdited.details.hours
        });
    }

    deleteCourse(courseID) {
        console.log('Deleting: ' + courseID);
        let self = this;
        let userID = localStorage.getItem('user_id');
        let token = localStorage.getItem('token');
        
        let config = {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        };
        let data = Object.assign({}, self.state.course);
        data.courseID = courseID;
        data = JSON.stringify(data);
        console.log(data);
        axios.post(`/api/courses/${userID}/deleteCourse`, data, config)
            .then((res) => {
                console.log(res.data);
                this.reload();
            })
            .catch((err) => {
                console.log(err);
                alert('Course Failed to be deleted!');
            });
    }

    onSubmit() {
        event.preventDefault();
        let self = this;
        let userID = localStorage.getItem('user_id');
        let token = 'Bearer ' + localStorage.getItem('token');
        let inputData = new FormData();
        inputData.append('inputFile', this.state.file);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        };
        let apiPath = '/api/courses/' + userID + '/createMany';
        axios.post(apiPath, inputData, config)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    self.setState({
                        showUpload: false
                    });
                } else {
                    alert('File failed to upload!');
                    }
                    this.reload();
                })
            .catch((err) => {
                console.log(err);
                alert('courses failed to be uploaded');
            });
    }

    render() {
        let content;
        const click = (
            <div>
                <form>
                    <div className="form-group text-left">
                        <h6>Course Name</h6>
                        <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                    <div className="form-group text-left">
                        <h6>Code</h6>
                        {this.state.update ?<input type="text" className="form-control" placeholder="Code" value={this.state.code} readOnly/> : <input type="text" className="form-control" placeholder="Code" value={this.state.code} onChange={this.handleCodeChange} />}
                    </div>
                    <div className="form-group text-left">
                        <h6>Department</h6>
                        <input type="text" className="form-control" placeholder="Department" value={this.state.department} onChange={this.handleDepartmentChange} />
                    </div>

                    <div className="form-group text-left">
                        <h6>Professor</h6>
                        <select id="ProfMenu" value={this.state.professor} onChange={this.handleProfessorChange}>
                            {
                                this.state.professors.map(function(each, key) {
                                    return <option key={key} value={each._id}> {each.name.firstName} </option>;
                                })
                            }                            
                        </select>
                    </div>

                    <div className="form-group text-left">
                        <h6>Credits</h6>
                        <input type="number" className="form-control" placeholder="Credits" value={this.state.credits} onChange={this.handleCreditsChange} />
                    </div>

                    <div className="form-group text-left">
                        <h6>Semester</h6>
                        <input type="number" className="form-control" placeholder="Semester" value={this.state.semester} onChange={this.handleSemesterChange} />
                    </div>

                    <div>
                        <h5>Marks Distribution</h5>
                        <div className="form-group text-left">
                            <h6>T1</h6>
                            <input type="number" className="form-control" placeholder="t1" value={this.state.t1} onChange={this.handleT1Change} />
                        </div>
                        <div className="form-group text-left">
                            <h6>T2</h6>
                            <input type="number" className="form-control" placeholder="t2" value={this.state.t2} onChange={this.handleT2Change} />
                        </div>
                        <div className="form-group text-left">
                            <h6>Assignments</h6>
                            <input type="number" className="form-control" placeholder="assignement" value={this.state.assignment} onChange={this.handleAssignmentMarksChange} />
                        </div>
                        <div className="form-group text-left">
                            <h6>ESA</h6>
                            <input type="number" className="form-control" placeholder="esa" value={this.state.esa} onChange={this.handleESAChange} />
                        </div>
                    </div>

                    <div className="form-group text-left">
                        <h6>Course Description</h6>
                        <textarea className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
                    </div>

                    <div className="form-group text-left">
                        <h6>Duration</h6>
                        <label>Start Date</label>
                        <input type="date" className="form-control" placeholder="Start Date" value={this.state.startDate} onChange={this.handleStartDateChange} />
                        <label>End Date</label>
                        <input type="date" className="form-control" placeholder="End Date" value={this.state.endDate} onChange={this.handleEndDateChange} />
                        <label>Number of Hours</label>
                        <input type="number" className="form-control" placeholder="Hours" value={this.state.hours} onChange={this.handleHoursChange} />
                    </div>
                    <div className="form-group text-left">
                        <h6>Resources</h6>
                        <input type="url" className="form-control" placeholder="URLs" value={this.state.resourcesUrl} onChange={this.handleURLChange} />
                    </div>
                </form>
            </div>
        );

        let addCourse = (
            <div></div>
        );

        if (this.state.role == 'admin') {
            addCourse = (
                <div className='col-sm-5'>
                    <div className='card bg-light text-center'>
                        <div className='card-body'>
                            {this.state.show ? click : <button type="button" className="btn btn-dark w-50 mx-3" onClick={this.showForm}>Add Course</button>}
                            {this.state.show ? <button type="submit" className="btn btn-dark mx-3 w-20 " onClick={this.onAdd}>Submit</button> : null}
                            {this.state.show ? <button type="close" className="btn mx-3 w-20" onClick={this.closeForm}>Close</button> : null}
                        </div>
                    </div>

                    <br/>
                    <h4>Create courses in bulk using csv file:</h4>
                    <div className="row" style={{paddingLeft: "15px"}}>
                        <div className="custom-file col-sm">
                            <input type="file" className="custom-file-input" id="validatedCustomFile" onChange={this.onChange}/>
                            <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file</label>
                        </div>
                        <div className="col-sm">
                            <button className="btn btn-dark" onClick={this.onSubmit}> Submit </button>
                        </div>
                    </div>
                </div>
            );
        }

        let that=this;
        const adminContent = (
            <div >
                <div className="text-center"><a href="/" className="btn btn-dark" role="button">Home</a></div>
                <br />
                {addCourse}
                <div className='col-sm-7'>
                    <h1>Active Courses</h1>
                    <div>
                        {
                            this.state.courses.map(function(each) {
                                if(each.duration != undefined){
                                    if(new Date(each.duration.endDate) > new Date()) {
                                        console.log(each.marks);
                                        return <CourseCard 
                                        key={each.code} 
                                        code={each.code} 
                                        name={each.name} 
                                        department={each.department} 
                                        description={each.description} 
                                        resourceUrl={each.resourcesUrl} 
                                        semester={each.semester}
                                        courseID={each._id} 
                                        editCourse={that.editCourse.bind(that)}
                                        deleteCourse={that.deleteCourse.bind(that)}
                                        profID={each.professors[0]}
                                        credits={each.details.credits}
                                        hours={each.details.hours}
                                        role={that.state.role}
                                        t1={each.marks.t1}
                                        t2={each.marks.t2}
                                        assignment={each.marks.assignment}
                                        esa={each.marks.esa} />;
                                    }
                                }
                            })
                        }
                    </div>
                </div>
                <div className='col-sm-7'>
                    <h1>Past Courses</h1>
                    <div>
                        {
                            this.state.courses.map(function(each) {
                                if(each.duration != undefined) {
                                    if(new Date(each.duration.endDate) < new Date()){
                                        console.log(each);
                                        return <CourseCard 
                                        key={each.code} 
                                        code={each.code} 
                                        name={each.name} 
                                        department={each.department} 
                                        description={each.description} 
                                        resourceUrl={each.resourcesUrl} 
                                        semester={each.semester}
                                        courseID={each._id} 
                                        editCourse={that.editCourse.bind(that)}
                                        deleteCourse={that.deleteCourse.bind(that)}
                                        profID={each.professors[0]}
                                        credits={each.details.credits}
                                        hours={each.details.hours}
                                        role={that.state.role}
                                        t1={each.t1}
                                        t2={each.t2}
                                        assignment={each.assignment}
                                        esa={each.esa} />;
                                    }
                                }
                            })
                        }
                    </div>
                </div>
                
            </div>
        );

        content = adminContent;

        return (
            <div>{content}</div>
        );
    }
}

export default CoursesAdd;
