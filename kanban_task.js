// JavaScript source code
// ���� kanban ��������ݽṹ

// taskTitle���������
// taskPriority���������ȼ�
// taskAssignment����Ŀ�����ˣ����̣����洢�����ˣ��û�����uuid
// taskStatus����Ŀ״̬������δ��ɣ������У�
// rootThread���������һ�����ӵ�uuid��Ҳ���������������

let Task = class {
    constructor(taskTitle, taskPriority, taskAssignment, taskStatus, rootThread) {
        this.taskTitle = taskTitle
        this.taskPriority = taskPriority
        this.taskAssignment = taskAssignment
        this.taskStatus = taskStatus
        this.rootThread = rootThread
    }
}