// JavaScript source code
// ���� kanban ���ӵ����ݽṹ

// contentType = string or file ������������
// nextThread ����һ�����ӵ�UUID

let Thread = class {
    constructor(contentType, nextThread) {
        this.contentType = contentType
        this.nextThread = nextThread
    }
}