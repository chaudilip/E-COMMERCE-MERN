import React, { Fragment , useEffect} from "react";
import "./Home.css";
import { CgMouse } from "react-icons/all";
import Product from "./ProductCard";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector , useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


const Home = () => {
  const { loading, error, products } = useSelector((state) => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  
    return (
      <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
    );

  };
  
  export default Home;
  