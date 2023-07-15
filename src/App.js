import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { uiActions } from './components/store/ui-slice';
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from './components/store/cart-actions';

let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);


//====================== BELOW ONE WHEN WE ARE DOING ASYNC INSDIE A COMPONENT ======================//
  // useEffect(()=> {

  //   const sendCartData = async() => {

  //     dispatch(uiActions.showNotification({
  //       status:"pending",
  //       title:"Sending...",
  //       message:"Sending cart data!",
  //     }));

  //     const response = await fetch("", {
  //     method: "PUT",
  //     body: JSON.stringify(cart),
  //     });

  //     if(!response.ok)
  //     {
  //       throw new Error("Sending cart data failed");
  //     }

  //     dispatch(uiActions.showNotification({
  //       status:"success",
  //       title:"Success!",
  //       message:"Sent cart data successfully!",
  //     }));

  //   };

  //   if(isInitial)
  //   {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch(error => {
  //     dispatch(uiActions.showNotification({
  //       status:"error",
  //       title:"Error!",
  //       message:"Sending cart data failed!",
  //     }));
  //   })


  // }, [cart, dispatch]);      // dispatch will never run by itself like setState in useState.



//====================== BELOW ONE WHEN WE ARE DOING ASYNC USING ACTION CREATOR THUNK ======================//

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);


  useEffect(() => {
    if(isInitial)
    {
      isInitial = false;
      return;
    }

    if(cart.changed)
    {
      dispatch(sendCartData(cart));
    }

  },[cart, dispatch]);



  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
