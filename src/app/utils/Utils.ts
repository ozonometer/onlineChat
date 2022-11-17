export default class Utils {
  static getThreadId(): number {
    let theadId = localStorage.getItem('threadId');
    if (theadId) {
      return Number(theadId);
    }
    return 0;
  }

  static getUserName(): string {
    let userName = localStorage.getItem('userName');
    if (userName) {
      return userName;
    }
    return '';
  }

  static getUserId(): number {
    let userId = localStorage.getItem('userId');
    if (userId) {
      return Number(userId);
    }
    return 0;
  }
}
