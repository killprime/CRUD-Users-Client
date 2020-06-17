import { connect } from 'react-redux';
import React from "react";
import ReactPaginate from 'react-paginate';

import { axiosLoadUsers } from '../../../redux/actions';

window.React = React;

class UserPaginate extends React.Component {

  constructor(props) {
    super(props);
  }

  handlePageClick = data => {
    let selected = data.selected+1;
    this.props.axiosLoadUsers({...this.props.paramPagination, currentPage: selected});
  }

  componentDidMount(){
    this.props.axiosLoadUsers(this.props.paramPagination);
  }

  render() {

    if(!this.props.paramPagination.total)
    {
      return (
          <div></div>
      );
    }

    const pointerEvents = (this.props.disablePaginate) ? {pointerEvents: 'none'} : {pointerEvents: 'all'} ;


    return (
      <div style={pointerEvents}>
        <ReactPaginate
          previousLabel={'«'}
          nextLabel={'»'}
          breakLabel={'...'}
          forcePage={(this.props.paramPagination.currentPage-1)}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'break-me'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          pageCount={this.props.paramPagination.total}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );

  }
}

const mapDispatchToProps = {
  axiosLoadUsers
}

const mapStateToProps = state => ({
  paramPagination: state.users.paramPagination,
  axiosUsers: state.users.axiosUsers,
  disablePaginate: state.users.disablePaginate
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPaginate)
