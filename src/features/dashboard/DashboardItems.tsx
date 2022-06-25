import React from "react";
import { getAuth } from "firebase/auth";
import { ENDPOINT_PEEK } from "../../constants";
import PreviewItems from "../preview_items/PreviewItems";

const DashboardItems: React.FC = function () {
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // user should already be logged in
  const url = `${ENDPOINT_PEEK}?User_id=${userId}`;

  return (
    <section className="dashboard-body">
      <PreviewItems url={url} dashboard={true} />
    </section>
  );
};

export default DashboardItems;
