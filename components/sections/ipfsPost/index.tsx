import { useState } from "react";
import { ConsoleAlert, Input } from "components/ui/atoms";
import { useNotification } from "contexts/NotificationContext";
import { getRandomId } from "contexts/NotificationContext/actions";

export const IPFSPost = () => {
  const [, dispatch] = useNotification();
  const [postData, setPostData] = useState("");
  const [cidPath, setCidPath] = useState<string>();
  const [fetching, setFetching] = useState(false);

  const handlePostToIPFS = async (value: string) => {
    setFetching(true);
    const res = await fetch("/api/ipfs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: value }),
    });
    if (res.ok) {
      const json = await res.json();
      setCidPath(json.cidPath);
      dispatch({
        type: "SHOW_NOTIFICATION",
        notification: {
          id: getRandomId(),
          title: "IPFS Post",
          clipboard: json.cidPath,
          type: "DB",
          body: (
            <div>
              <p>
                <b>Input: </b>
                {value}
              </p>
              <p>
                <b>Output: </b>
                {json.cidPath}
              </p>
            </div>
          ),
          time: new Date(),
        },
      });
    } else {
      console.error("Error: ", res);
    }
    setFetching(false);
  };

  return (
    <div>
      <Input
        fullWidth
        label="Post string to IPFS"
        value={postData}
        placeholder="Type string..."
        onChange={(e) => setPostData(e.target.value)}
        onSubmit={() => handlePostToIPFS(postData)}
        fetching={fetching}
      />
      {cidPath && (
        <ConsoleAlert type="DB">
          <h4>Cid Path</h4>
          <p>{cidPath}</p>
        </ConsoleAlert>
      )}
    </div>
  );
};
