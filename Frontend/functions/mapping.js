export function classMap(classes){
    let classMap = new Map();
    for(let i=0;i<classes.length;i++){
        classMap.set(classes[i].className,classes[i]._id);
    }
  
}

export function  departmentMap(departments){
    let departmentMap=new Map();
    for(let i=0;i<departments.length;i++){
        departmentMap.set(departments[i].departmentName,departments[i]._id);
    }

}