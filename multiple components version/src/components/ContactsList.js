import React, { Component } from 'react';
import '../App.css';

//Import the components
import Header from './Header';
import Table from './Table';
import Button from './Button'

//Logic to get the first 5 contacts

import contactsFromJSON from '../contacts.json';
const contactlist = [...contactsFromJSON]
const firstContacts = contactlist.splice(0,5)

//Create the class
class ContactsList extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			contacts: firstContacts
		};
	}

	// Iteration 1 | Display 5 Contacts
	showContacts(allContacts) {
		return allContacts.map((eachContact) => {
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
		   contacts: [randomContact[0], ...this.state.contacts]
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
				<Header />

				<Button
					classes={"btn btn-secondary"}
					action={() => this.addRandomContact()}
					text={"Add random"}
				/>
				<Button
					classes={"btn btn-primary"}
					action={() => this.sortContacts("popularity")}
					text={"Sort by popularity"}
				/>
				<Button
					classes={"btn btn-success"}
					action={() => this.sortContacts("name")}
					text={"Sort by name"}
				/>

				<Table
					showContacts={this.showContacts}
					contacts={this.state.contacts}
				/>
			</div>
		);
	}
}

export default ContactsList;