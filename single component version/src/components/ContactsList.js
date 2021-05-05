import React, { Component } from 'react';

import '../App.css';

import contactsFromJSON from '../contacts.json';

// you can name it whatever you want when you import it
// the important part is the relative path
// this is only true for json files because they do not have a default exported value
const contactlist = [...contactsFromJSON]
const firstContacts = contactlist.splice(0,5)

class ContactsList extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			contacts: firstContacts
		};
	}

	// Iteration 1 | Display 5 Contacts

	showContacts() {
		return this.state.contacts.map((eachContact) => {
			return (
				<tr key={eachContact.id}>
					<td>
						<img
							className='img-fluid img-thumbnail celebImg'
							src={eachContact.pictureUrl}
							alt='celebrity'
						/>
					</td>
					<td>{eachContact.name}</td>
					<td>{eachContact.popularity.toFixed(2)}</td>
					<td>
						<button
							className='btn btn-secondary'
							onClick={() => this.deleteContact(eachContact.id)}>
							Delete
						</button>
					</td>
				</tr>
			);
		});
	}

	// Iteration 2 | Add New Random Contacts

	addRandomContact() {

		let randomIndex = Math.floor(contactlist.length * Math.random()); 
		let randomContact = contactlist.splice(randomIndex, 1);

		this.setState({
		   contacts: [...this.state.contacts, randomContact]
		})
	}

	// Iteration 3 | Sort Contacts By Name And Popularity

	sortContacts(field) {

		let compareFunction;
		if (field === "name") {
			compareFunction = (a, b) => (a.name > b.name ? 1 : -1);
		} else if (field === "popularity") {
			compareFunction = (a, b) => b.popularity - a.popularity;
		}

		this.setState({
			contacts: this.state.contacts.slice().sort(compareFunction)
		});
	}

	// Iteration 4 | Remove Contacts
	deleteContact(indexFromBtn) {

		const newList = [...this.state.contacts]

		this.setState({
			contacts: newList.filter((contact) => contact.id !== indexFromBtn)
		});
	}

	render() {
		return (
			<div className='container-fluid'>
				<h1>
					IronContacts{" "}
					<span role='img' aria-label='img'>
						{" "}
						❤️{" "}
					</span>
				</h1>
				<button
					className='btn btn-secondary'
					onClick={() => this.addRandomContact()}>
					Add random
				</button>
				<button
					className='btn btn-primary'
					onClick={() => this.sortContacts("popularity")}>
					Sort by popularity
				</button>
				<button
					className='btn btn-success'
					onClick={() => this.sortContacts("name")}>
					Sort by name
				</button>
				<table className='table'>
					<thead className='thead-light'>
						<tr>
							<th scope='col'>Picture</th>
							<th scope='col'>Name</th>
							<th scope='col'>Popularity</th>
							<th scope='col'>Delete</th>
						</tr>
					</thead>
					<tbody>{this.showContacts()}</tbody>
				</table>
			</div>
		);
	}
}

export default ContactsList;