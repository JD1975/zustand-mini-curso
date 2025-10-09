import { useEffect, useState } from "react";
import { tesloApi } from "../../../Api/teslo";

export const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((resp) => setInfo(resp.data))
      .catch((err) => setInfo(err.message));
  }, []);

  return (
    <>
      <h2>Informacion</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};
