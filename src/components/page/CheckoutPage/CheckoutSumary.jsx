import React from "react";

const CheckoutSumary = () => {
  return <div>CheckoutSumary</div>;
};

export default CheckoutSumary;

// <aside className="col-lg-3">
// <div className="summary">
//   <h3 className="summary-title">Your Order</h3>
//   <table className="table table-summary">
//     <thead>
//       <tr>
//         <th>Product</th>
//         <th>Total</th>
//       </tr>
//     </thead>
//     <tbody>
//       {renderProductInfo?.map((product) => {
//         const { name, quantity, price, totalProduct, id } =
//           product || {};
//         return (
//           <tr key={id}>
//             <td>
//               <Link to={detailPath}>{name}</Link>
//               <p>
//                 {quantity} x ${price}
//               </p>
//             </td>
//             <td>${formatCurrency(totalProduct)}</td>
//           </tr>
//         );
//       })}

//       <tr className="summary-subtotal">
//         <td>Subtotal:</td>
//         <td>${formatCurrency(subTotal)}</td>
//       </tr>

//       {shipping ? (
//         <tr>
//           <td>Shipping:</td>
//           <td>
//             {shipping?.typeShip} - ${shipping?.price}
//             {" - "}
//             <Link to={PATHS.CART}>Edit</Link>
//           </td>
//         </tr>
//       ) : (
//         <tr>
//           <td>Shipping:</td>
//           <td>
//             <Link to={PATHS.CART}>Select Shipping</Link>
//           </td>
//         </tr>
//       )}
//       {discountCode && (
//         <tr>
//           <td>Discount:</td>
//           <td>
//             {discountCode} - ${discount}
//           </td>
//         </tr>
//       )}
//       <tr className="summary-total">
//         <td>Total:</td>
//         <td>${formatCurrency(total)}</td>
//       </tr>
//     </tbody>
//   </table>

//   <div className="accordion-summary" id="accordion-payment">
//     <div className="card">
//       <div
//         className="card-header"
//         id="heading-1"
//         onClick={() => setCurrentPaymentMethod(PATHS.card)}
//         style={{ cursor: "pointer" }}
//       >
//         <h2 className="card-title">
//           <a
//             role="button"
//             className={cn({ collapse: !isCard })}
//             // data-toggle="collapse"
//             // href="#collapse-1"
//             // aria-expanded="true"
//             // aria-controls="collapse-1"
//           >
//             {" "}
//             Direct bank transfer{" "}
//           </a>
//         </h2>
//       </div>
//       <div
//         id="collapse-1"
//         className={cn("collapse", { show: isCard })}

//         // aria-labelledby="heading-1"
//         // data-parent="#accordion-payment"
//       >
//         <div className="card-body">
//           {" "}
//           Make your payment directly into our bank account. Please use
//           your Order ID as the payment reference. Your order will not
//           be shipped until the funds have cleared in our account.{" "}
//         </div>
//       </div>
//     </div>
//     <div className="card">
//       <div
//         className="card-header"
//         id="heading-3"
//         onClick={() => setCurrentPaymentMethod(PATHS.card)}
//         style={{ cursor: "pointer" }}
//       >
//         {" "}
//         <h2 className="card-title">
//           <a
//             role="button"
//             // data-toggle="collapse"
//             // href="#collapse-3"
//             // aria-expanded="false"
//             // aria-controls="collapse-3"
//             className={cn({ collapse: !isCash })}
//           >
//             {" "}
//             Cash on delivery{" "}
//           </a>
//         </h2>
//       </div>
//       <div
//         id="collapse-3"
//         // className="collapse"
//         // aria-labelledby="heading-3"
//         // data-parent="#accordion-payment"
//         className={cn("collapse", { show: isCash })}
//       >
//         <div className="card-body">
//           Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
//           consectetuer adipiscing elit. Donec odio. Quisque volutpat
//           mattis eros.{" "}
//         </div>
//       </div>
//     </div>
//   </div>
//   <button
//     type="submit"
//     className="btn btn-outline-primary-2 btn-order btn-block"
//   >
//     <span className="btn-text">Place Order</span>
//     <span className="btn-hover-text">Proceed to Checkout</span>
//   </button>
// </div>
// </aside>
