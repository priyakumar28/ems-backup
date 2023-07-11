module.exports = {
    // single transformation
    transform(employeeapprovals) {
    if (employeeapprovals && typeof employeeapprovals === 'object'){
        return {
            'type':employeeapprovals.type,
            'element':employeeapprovals.element,
            'approver':employeeapprovals.approver,
            'level':employeeapprovals.level,
            'status':employeeapprovals.status,
            'active':employeeapprovals.active,
            'created':employeeapprovals.created,
            'updated':employeeapprovals.updated
            };
        }
        return{};
    },
    transformCollection(employeeapproval) {
    var data = [];
    for (var i=0; i<employeeapproval?.length; i++){
                data.push(this.transform(employeeapproval[i]));
            }
    return data;
        }
    }   