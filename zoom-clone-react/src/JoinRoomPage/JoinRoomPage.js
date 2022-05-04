import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setIsRoomHost } from "../store/actions";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";
import LoadingOverlay from "./LoadingOverlay";

import "./JoinRoomPage.css";

function JoinRoomPage(props) {
  const { setIsRoomHostAction, isRoomHost } = props;
  const [searchParams] = useSearchParams();
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  useEffect(() => {
    // 初回レンダリング時にfalseにするようにしたい
    // クエリパラーメータをstringで取得
    const isRoomHost = searchParams.get("host");
    if (isRoomHost) {
      // change information about it in our store
      setIsRoomHostAction(true);
    }
  }, []);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent setShowLoadingOverlay={setShowLoadingOverlay} />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    </div>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoomPage);
