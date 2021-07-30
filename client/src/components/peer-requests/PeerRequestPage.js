import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PeerRequestItem from "./PeerRequestItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PeerRequestPage = ({ user, peer_requests, loading = false }) => {
  /* TODO: Use localhost:5000/api/profile/tutor/requests path to get all requests
     that have matches to the current tutor. This should be in the getTutorRequests
     function in actions, but a reducer and state management in this file is still
     needed.*/
  var received_req = peer_requests;
  console.log("received requests:", received_req);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : received_req === null || received_req.length < 1 ? (
        <div>
          <h1 className="large text-primary">
            Oops! No requests for you now...
          </h1>
          <h1 className="text-primary">
            A notification will be sent to you once we find requests for you!
          </h1>
        </div>
      ) : (
        <div className="request">
          <h1 className="large text-primary">Check Request for you!</h1>
          {received_req.map((peer_request) => (
            <PeerRequestItem key={peer_request.id} item={peer_request} />
          ))}
        </div>
      )}

      <Link to="/dashboard" className="btn btn-light">
        Back To Dashboard
      </Link>
    </Fragment>
  );
};

PeerRequestPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  peer_requests: state.peer_requests.peer_requests,
  loading: state.user_requests.loading,
});

export default connect(mapStateToProps)(PeerRequestPage);
