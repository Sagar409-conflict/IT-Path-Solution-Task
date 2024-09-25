class ChatResource {
  constructor(data) {
    this.chatId = data._id;
    this.content = data.content;
    this.room = data.room;
    this.userId = data.sender._id;
    this.sender = data.sender.name;
    this.timestamp = new Date(data.createdAt).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}

export default ChatResource;
