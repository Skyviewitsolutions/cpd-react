import React, { useEffect, useState, useRef } from "react";
import {
  getDatabase,
  set,
  push,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import Modal from "react-bootstrap/Modal";
import "./chat.css";

const Chat = (props) => {

  const msgRef = useRef();
  const { showChat, setShowChat } = props;
  const [name, setName] = useState();
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      // const c=[...chats]
      // c.push(data.val())
      // setChats(c)
      // console.log(data.value());
      // addCommentElement(postElement, data.key, data.val().text, data.val().author);
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
    });
    setMsg("");
  };

  return (
    <>
      <Modal
        show={showChat}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <div className="membersDetailsModalHeading">
              <h5>Start Chat Here</h5>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="chatOutline">
          <div>
            {name ? null : (
              <div>
                <input
                  tupe="text"
                  placeholder="enter name to start"
                  onBlur={(e) => setName(e.target.value)}
                ></input>
              </div>
            )}
            {name ? (
              <div>
                <h3>User:{name}</h3>
                <div className="chat-container">
                  {chats.map((c, i) => (
                    <div
                      key={i}
                      className={`container ${c.name === name ? "me" : ""}`}
                    >
                      <p className="chatBox">
                        <strong>{c.name}:</strong>

                        <span>{c.message}</span>
                      </p>
                    </div>
                  ))}

                  <div className="btm">
                    <input
                      type="text"
                      placeholder="Enter Your Message"
                      onInput={(e) => setMsg(e.target.value)}
                      value={msg}
                    ></input>
                    <button type="submit" onClick={(e) => sendChat()}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Chat;
