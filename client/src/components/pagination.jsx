import React, { Component } from "react";
 class Pagination extends Component {
 paginationElement(number) {
    return (
      <li key={'page' + number}
          className={number == this.props.page ? 'active' : ''}>
        <a onClick={this.props.handleChangePage.bind(this, number)}>{number}</a>
      </li>
    )
  }
   render() {
    var self = this;
    var page = this.props.page;
    var last_page = this.props.pages;
    var page_links = [];
    var max_elements = 2;
    var pages = [1];
 
    for (var i = page - max_elements; i <= page + max_elements; i++) {
      if (!pages.includes(i))
        pages.push(i);
    }
    if (!pages.includes(last_page))
      pages.push(last_page);
 
    pages.forEach(function(i) {
      if (i > 0 && i <= last_page)
        page_links.push(self.paginationElement(i));
    });
 
    return(
      <div className="text-center">
        <ul className="pagination">
          {page_links}
        </ul>
      </div>
    );
  }
}




 export default Pagination