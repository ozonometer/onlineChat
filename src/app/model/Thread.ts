export class Thread {
  threadId: number;
  authorId: number;
  authorUserName: string;
  threadName: string;
  threadDescription: string;
  createdDate: Date;

  constructor() {
    this.threadId = 0;
    this.authorId = 0;
    this.authorUserName = '';
    this.threadName = '';
    this.threadDescription = '';
    this.createdDate = new Date();
  }

}
