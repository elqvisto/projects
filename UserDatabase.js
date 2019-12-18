export class User {
  constructor(userId, userName, password, displayName) {
    this.userId = userId;
    this.userName = userName;
    this.password = password;
    this.displayName = displayName;
  }
}

export class UserDatabase {
  users = {
    mia: new User("user-1", "mia", "0809", "Mia Malene Flarup Hartmann"),
    rasmus: new User("user-2", "rasmus", "0102", "Rasmus Qvist"),
    mona: new User("user-3", "mona", "9999", "Mona Larsen"),
    jay: new User("user-4", "jay", "0000", "Rasmus Jespersen")
  };

  getAllUsers() {
    return Object.values(this.users);
  }

  /*  getSingleUser() {
    return this.users[userId];
  } */

  authenticateUser(inputUserName, inputPassword) {
    const user = this.users[inputUserName];

    //Hvis user ikke findes, retuner false:
    if (!user) {
      return false;
    }

    //Hvis password er korekt, retur
    if (inputPassword == user.password) {
      return user;
    }
    //Ellers, retuner false:
    else {
      return false;
    }
  }
}
