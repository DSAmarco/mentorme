import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      //window.location.reload();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleButtonAction = (buttonId, e) => {
    switch (buttonId) {
      case 1:
        mutation.mutate({
          conversationId: id,
          desc: "Where should we meet?"
        });
        console.log("hellooo");
        break;
      case 2:
        mutation.mutate({
          conversationId: id,
          desc: "What day works best for you?"
        });
        break;
      case 3:
        mutation.mutate({
          conversationId: id,
          desc: "Are you available soon?"
        });
        break;
      default:
        console.log("Unknown button action");
    }
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} John Doe {">"}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <div className="input-container">
            <textarea placeholder="Send a message"></textarea>
            <button type="submit">Send</button>
          </div>
          {!currentUser.isSeller && (
            <div className="button-container">
              <button type="button" onClick={() => handleButtonAction(1)}>"Where should we meet?"</button>
              <button type="button" onClick={() => handleButtonAction(2)}>"What day works best for you?"</button>
              <button type="button" onClick={() => handleButtonAction(3)}>"Are you available soon?"</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Message;
