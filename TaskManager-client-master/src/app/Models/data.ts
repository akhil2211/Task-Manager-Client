export interface Organization {
    org_name:String,
    org_code:String
}

export interface TaskCategory {
    Category:String
}

export interface User {
    firstname: String,
    lastname:String,
    username: String,
    password:String,
    email:String,
    orgId:number
    roleId:number
}
export interface Project{
    project_code:String,
    project_name:String,
    project_description:String,
    due_date:Date ,
    project_status:String 
}

export interface Task{
 t_title:String,
 t_code:String,
 t_description:String,
 assignedto:number|null
 duedate:Date,
 t_status:String,
 project_id:number|null
 c_id:number|null
 priority_id:number|null
}