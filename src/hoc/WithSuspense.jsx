import React, { Suspense } from "react";
import Loader from "../components/GeneralItems/Loader";

export const WithSuspense = (Component) => {
  return (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};
