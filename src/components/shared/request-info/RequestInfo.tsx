import { useEffect, useState } from "react";
import { tesloApi } from "../../../Api/teslo";

export const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then(resp => setInfo(resp.data))
      .catch(() => setInfo("Error"));
  }, []);

  return (
    <>
      <h4>Informacion</h4>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};
