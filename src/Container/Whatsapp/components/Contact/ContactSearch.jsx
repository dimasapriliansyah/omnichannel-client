import React from 'react';

function ContactSearch(props) {
  const contactListCount = props.contactListCount
  return (
    <form action="">
      <input
        type="text"
        className="form-control"
        placeholder="Search chat"
        disabled={contactListCount === 0 ? true : false}
      />
    </form>
  )
}

export default ContactSearch;
