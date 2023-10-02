const socket = io();

const inboxPeople = document.querySelector(".inbox__people");

let userName = "";

const newUserConnected = (user) => {
  userName = user || `User${Math.floor(Math.random() * 1000000)}`;
  socket.emit("new user", userName);
  addToUserBox(userName);
};

const addToUserBox = (userName) => {
  if (!!document.querySelector(`${userName}-userlist`)) {
    return;
  }

  const userBox = `<div class="chat_ib ${userName}-userlist"><h5>${userName}</h5></div>`;
  inboxPeople.innerHTML += userBox;
};

socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
});
