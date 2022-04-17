import { useState } from "react";
import { ConsoleAlert, Input } from "components/ui/atoms";
import { useNotification } from "contexts/NotificationContext";
import { getRandomId } from "contexts/NotificationContext/actions";

export const IPFSGet = () => {
  const [, dispatch] = useNotification();
  const [fetchPath, setFetchPath] = useState("");
  const [returnedData, setReturnedData] = useState<string>();
  const [fetching, setFetching] = useState(false);

  const fetchDataFromIPFS = async (path: string) => {
    setFetching(true);
    const res = await fetch(`/api/ipfs/${path}`, {
      method: "GET",
    });
    if (res.ok) {
      const json = await res.json();
      setReturnedData(json.data);
      dispatch({
        type: "SHOW_NOTIFICATION",
        notification: {
          id: getRandomId(),
          title: "IPFS Get",
          type: "DB",
          body: (
            <div>
              <p>
                <b>Input: </b>
                {path}
              </p>
              <p>
                <b>Output: </b>
                {json.data}
              </p>
            </div>
          ),
          time: new Date(),
        },
      });
    }
    setFetching(false);
  };

  return (
    <div>
      <Input
        fullWidth
        label="Fetch data from IPFS"
        value={fetchPath}
        placeholder="CID Path"
        onChange={(e) => setFetchPath(e.target.value)}
        onSubmit={() => fetchDataFromIPFS(fetchPath)}
        fetching={fetching}
      />
      {returnedData && (
        <ConsoleAlert type="DB">
          <h4>Returned data</h4>
          <p>{returnedData}</p>
        </ConsoleAlert>
      )}
    </div>
  );
};
