import React from 'react'

const Table = ({showContacts, contacts }) => {
  return (
		<table className='table'>
			<thead className='thead-light'>
				<tr>
					<th scope='col'>Picture</th>
					<th scope='col'>Name</th>
					<th scope='col'>Popularity</th>
					<th scope='col'>Delete</th>
				</tr>
			</thead>
			<tbody>
      { showContacts(contacts) }
      </tbody>
		</table>
	);
}

export default Table
