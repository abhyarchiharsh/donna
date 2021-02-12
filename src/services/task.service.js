import firebase from "../firebase";

const db = firebase.ref("/tasks");

class TaskDataService {
  getAll() {
    return db;
  }

  create(task) {
    return db.push(task);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new TaskDataService();