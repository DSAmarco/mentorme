import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  const handleComplete = async (order) => {
    const payment_intent = order.payment_intent;
    try {
      await newRequest.put("/orders?action=complete", { payment_intent });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRate = async (order, e) => {
    try {
      await newRequest.put("/auth/edit", {
        originalUsername: order.buyerUsername,
        username: order.buyerUsername,
        totalStars: e,
        starNumber: 1
      });
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <th>Seller</th>
            <th>Buyer</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
            {currentUser.isSeller && (
              <th>Mark as Complete</th>
            )}
            <th>Rate</th>
            {data.map((order) => (
              <tr key={order._id} className={order.isFinished ? 'highlighted' : ''}>
                <td>{order.sellerUsername}</td>
                <td>{order.buyerUsername}</td>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
                {currentUser.isSeller && (order.sellerId === currentUser._id) && (
                  <td>
                    <img
                      className="complete"
                      src="./img/check.png"
                      alt=""
                      onClick={() => handleComplete(order)}
                    />
                  </td>
                )}
                <td>
                  {order.isFinished ? (
                    currentUser.isSeller && (order.sellerId === currentUser._id) ? (
                      <select className="rate-dropdown" onChange={(e) => handleRate(order, e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    ) : (
                      <Link to={`/gig/${order.gigId}`}>
                        <img className="complete" src="./img/star.png" alt="" />
                      </Link>
                    )
                  ) : (
                    <span><td>
                    {order.isFinished ? (
                      currentUser.isSeller && (order.sellerId === currentUser._id) ? (
                        <select className="rate-dropdown" onChange={(e) => handleRate(order, e.target.value)}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      ) : (
                        <Link to={`/gig/${order.gigId}`}>
                          <img className="complete" src="./img/star.png" alt="" />
                        </Link>
                      )
                    ) : (
                      <span>Order in progress</span>
                    )}
                  </td></span>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
