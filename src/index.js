import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { isAuthenticated } from "./vrspages/Common/Common";


//App
const App = React.lazy(() => import("./components/app"));
const Custompages = React.lazy(() => import("./components/custompages"));

//Dashboard
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const DepartmentalDashboard = React.lazy(() =>
  import("./vrspages/DepartmentalDashboard/DepartmentalDashboard")
);

//vrspages
const ProductList = React.lazy(() =>
  import("./vrspages/ProductList/ProductList")
);

const NewApplication = React.lazy(() =>
  import("./vrspages/NewApplication/NewApplication")
);

const ProductRequest = React.lazy(() =>
  import("./vrspages/ProductRequest/ProductRequest")
);
const EditPage = React.lazy(() => import("./vrspages/EditPage/EditPage"));
//depermental pages
const NewProduct = React.lazy(() => import("./vrspages/DepermentalPages/newProduct/NewProduct"));
const Minutes = React.lazy(() => import("./vrspages/DepermentalPages/minutes/Minutes"));
const AllApplication = React.lazy(() => import("./vrspages/DepermentalPages/allApplication/AllApplication"));

const AddUser = React.lazy(() => import("./vrspages/DepermentalPages/admin/addUser/AddUser"));
const DeleteUser = React.lazy(() => import("./vrspages/DepermentalPages/admin/deleteUser/DeleteUser"));
const EditUser = React.lazy(() => import("./vrspages/DepermentalPages/admin/editUser/EditUser"));
const Periods = React.lazy(() => import("./vrspages/DepermentalPages/admin/periods/Periods"));
const Products = React.lazy(() => import("./vrspages/DepermentalPages/admin/products/Products"));
const ApproveProduct = React.lazy(() => import("./vrspages/DepermentalPages/newProduct/approveProduct/ApproveProduct"));
const ViewApplication = React.lazy(() => import("./vrspages/DepermentalPages/viewApplication/ViewApplication"));

const ViewFile = React.lazy(() => import("./vrspages/viewFile/ViewFile.js"));
const VendorApplication = React.lazy(() => import("./vrspages/VendorApplication/VendorApplication.js"));
//Blog


//Maps

//E-Commerce



//FileManger


//custom Pages
const Login = React.lazy(() => import("./components/CustomPages/Login/Login"));
const Register = React.lazy(() =>
  import("./components/CustomPages/Register/Register")
);
const ForgotPassword = React.lazy(() =>
  import("./components/CustomPages/ForgotPassword/ForgotPassword")
);
const LockScreen = React.lazy(() =>
  import("./components/CustomPages/LockScreen/LockScreen")
);
//Errorpages
const Errorpage400 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/400/400")
);
const Errorpage401 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/401/401")
);
const Errorpage403 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/403/403")
);
const Errorpage500 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/500/500")
);
const Errorpage503 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/503/503")
);

export const Private = ({ children }) => {
  const flg = isAuthenticated();

  return flg ? children : <Navigate to="/" />;
};

const Loaderimg = () => {
  return (
    <div id="global-loader">
      <img
        src={require("./assets/images/loader.svg").default}
        className="loader-img"
        alt="Loader"
      />
    </div>
  );
};
const Root = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <React.Suspense fallback={Loaderimg()}>
          <Routes>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<App />}>
              <Route
                path={`${process.env.PUBLIC_URL}/dashboard`}
                element={
                  <Private>
                    <Dashboard />
                  </Private>
                }
              />
              <Route path={`${process.env.PUBLIC_URL}/DepartmentalDashboard`} element={<DepartmentalDashboard />} />
              <Route
                path={`${process.env.PUBLIC_URL}/NewApplication`}
                element={
                  <Private>
                    <NewApplication />
                  </Private>
                }
              />
              <Route
                path={`${process.env.PUBLIC_URL}/EditApplication`}
                element={
                  <Private>
                    <NewApplication />
                  </Private>
                }
              />
              <Route
                path={`${process.env.PUBLIC_URL}/ProductRequest`}
                element={
                  <Private>
                    <ProductRequest />
                  </Private>
                }
              />

              <Route
                path={`${process.env.PUBLIC_URL}/ProductList`}
                element={
                  <Private>
                    <ProductList />
                  </Private>
                }
              />

              <Route
                path={`${process.env.PUBLIC_URL}/EditApplication/APP/:year/:num`}
                element={
                  <Private>
                    <EditPage />
                  </Private>
                }
              />

              <Route path={`${process.env.PUBLIC_URL}/newProduct`} element={<NewProduct />} />
              <Route path={`${process.env.PUBLIC_URL}/minutes`} element={<Minutes />} />
              <Route path={`${process.env.PUBLIC_URL}/allApplication`} element={<AllApplication />} />
              <Route path={`${process.env.PUBLIC_URL}/admin/addUser`} element={<AddUser />} />
              <Route path={`${process.env.PUBLIC_URL}/admin/editUser`} element={<EditUser />} />
              <Route path={`${process.env.PUBLIC_URL}/admin/deleteUser`} element={<DeleteUser />} />
              <Route path={`${process.env.PUBLIC_URL}/productApprroval/REQ/:year/:num`} element={<ApproveProduct />} />
              <Route path={`${process.env.PUBLIC_URL}/viewApplication/APP/:year/:num`} element={<ViewApplication />} />


              <Route path={`${process.env.PUBLIC_URL}/admin/periods`} element={<Periods />} />
              <Route path={`${process.env.PUBLIC_URL}/admin/products`} element={<Products />} />
              <Route path={`${process.env.PUBLIC_URL}/viewfile/:file`} element={<ViewFile />} />
              <Route path={`${process.env.PUBLIC_URL}/VendorApplication/APP/:year/:num`} element={<VendorApplication />} />








            </Route>
            {/*  <Route
              path={`${process.env.PUBLIC_URL}/pages/themeStyle`}
              element = {<Switcherlayout />}
            /> */}
            <Route
              path={`${process.env.PUBLIC_URL}/`}
              element={<Custompages />}
            >

              <Route index element={<Login />} />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/login`}
                element={<Login />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/register`}
                element={<Register />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/forgotPassword`}
                element={<ForgotPassword />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/lockScreen`}
                element={<LockScreen />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage401`}
                element={<Errorpage401 />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage403`}
                element={<Errorpage403 />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage500`}
                element={<Errorpage500 />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage503`}
                element={<Errorpage503 />}
              />

              <Route path="*" element={<Errorpage400 />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </Fragment>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
