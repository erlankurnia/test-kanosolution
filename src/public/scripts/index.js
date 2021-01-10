/*
*****************************************************************************
 *                          Fetch and display users
 ******************************************************************************

displayUsers();


function displayUsers() {
	httpGet('/api/users/all')
		.then(response => response.json())
		.then((response) => {
			let allUsers = response.users;
			// Empty the anchor
			let allUsersAnchor = document.getElementById('all-users-anchor');
			allUsersAnchor.innerHTML = '';
			// Append users to anchor
			allUsers.forEach((user) => {
				allUsersAnchor.innerHTML += getUserDisplayEle(user);
			});
		});
};


function getUserDisplayEle(user) {
	return `
		<div class="user-display-ele">

			<div class="normal-view">
				<div>Name: ${user.name}</div>
				<div>Email: ${user.email}</div>
				<button class="edit-user-btn" data-user-id="${user.id}">
					Edit
				</button>
				<button class="delete-user-btn" data-user-id="${user.id}">
					Delete
				</button>
			</div>
			
			<div class="edit-view">
				<div>
					Name: <input class="name-edit-input" value="${user.name}">
				</div>
				<div>
					Email: <input class="email-edit-input" value="${user.email}">
				</div>
				<button class="submit-edit-btn" data-user-id="${user.id}">
					Submit
				</button>
				<button class="cancel-edit-btn" data-user-id="${user.id}">
					Cancel
				</button>
			</div>
		</div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************

document.addEventListener('click', function (event) {
	event.preventDefault();
	let ele = event.target;
	if (ele.matches('#add-user-btn')) {
		addUser();
	} else if (ele.matches('.edit-user-btn')) {
		showEditView(ele.parentNode.parentNode);
	} else if (ele.matches('.cancel-edit-btn')) {
		cancelEdit(ele.parentNode.parentNode);
	} else if (ele.matches('.submit-edit-btn')) {
		submitEdit(ele);
	} else if (ele.matches('.delete-user-btn')) {
		deleteUser(ele);
	}
}, false)


function addUser() {
	let nameInput = document.getElementById('name-input');
	let emailInput = document.getElementById('email-input');
	let data = {
		user: {
			name: nameInput.value,
			email: emailInput.value
		},
	};
	httpPost('/api/users/add', data)
		.then(() => {
			displayUsers();
		})
}


function showEditView(userEle) {
	let normalView = userEle.getElementsByClassName('normal-view')[0];
	let editView = userEle.getElementsByClassName('edit-view')[0];
	normalView.style.display = 'none';
	editView.style.display = 'block';
}


function cancelEdit(userEle) {
	let normalView = userEle.getElementsByClassName('normal-view')[0];
	let editView = userEle.getElementsByClassName('edit-view')[0];
	normalView.style.display = 'block';
	editView.style.display = 'none';
}


function submitEdit(ele) {
	let userEle = ele.parentNode.parentNode;
	let nameInput = userEle.getElementsByClassName('name-edit-input')[0];
	let emailInput = userEle.getElementsByClassName('email-edit-input')[0];
	let id = ele.getAttribute('data-user-id');
	let data = {
		user: {
			name: nameInput.value,
			email: emailInput.value,
			id: id
		}
	};
	httpPut('/api/users/update', data)
		.then(() => {
			displayUsers();
		})
}


function deleteUser(ele) {
	let id = ele.getAttribute('data-user-id');
	httpDelete('/api/users/delete/' + id)
		.then(() => {
			displayUsers();
		})
}


function httpGet(path) {
	return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
	return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
	return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
	return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
	let options = {
		dataType: 'json',
		method: verb,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	if (data) {
		options.body = JSON.stringify(data);
	}
	return options;
}

*/

/******************************************************************************
 *                          Fetch and display dataset
 ******************************************************************************/

displayDataset();


function displayDataset() {
	fetch('/api/companies/all')
		.then(res => res.json())
		.then(res => {
			let alldatasetAnchor = document.getElementById('all-dataset-anchor');
			alldatasetAnchor.innerHTML = '';
			console.log(res);
			alldatasetAnchor.innerHTML += displayData(res.header, res.data.slice(0, 50));
		});
};

function displayData(header, data) {
	return `<thead class="scrollable">
						${displayHeader(header)}
					</thead>
					<tbody class="scrollable">
						${displayRows(data)}
					</tbody>`;
}

function displayHeader(header) {
	let e = `<tr>`;
	let i = 0;
	header.forEach(h => {
		// console.log(`[${i++}] = ${h}`);
		e += `<th scope="col">${h}</th>`;
	});
	return e + `</tr>`;
}

function displayRows(row) {
	let e = ``;
	for (let i = 0; i < row.length; i++) {
		e += `<tr>${displayCols(row[i])}</tr>`;
	}
	return e;
}

function displayCols(col) {
	let e = ``;
	for (let i = 0; i < col.length; i++) {
		if (i == 0) {
			e+= `<th scope="row"><a href="/detail/${col[0]}" ">${col[0]}</a></th>`;
		} else {
			e += `<td>${col[i]}</td>`;
		}
	}
	return e;
}


/******************************************************************************
 *                        Add, Edit, and Delete Dataset
 ******************************************************************************/

document.addEventListener('click', function (event) {
	event.preventDefault();
	let ele = event.target;
	if (ele.matches('#add-user-btn')) {
		addData();
	} else if (ele.matches('.edit-user-btn')) {
		showEditView(ele.parentNode.parentNode);
	} else if (ele.matches('.cancel-edit-btn')) {
		cancelEdit(ele.parentNode.parentNode);
	} else if (ele.matches('.submit-edit-btn')) {
		submitEdit(ele);
	} else if (ele.matches('.delete-data-btn')) {
		deleteData(ele);
	}
}, false)


function addData() {
	let nameInput = document.getElementById('name-input');
	let emailInput = document.getElementById('email-input');
	let data = {
		user: {
			name: nameInput.value,
			email: emailInput.value
		},
	};
	httpPost('/api/dataset/add', data)
		.then(() => {
			displayDataset();
		})
}

function showEditView(userEle) {
	let normalView = userEle.getElementsByClassName('normal-view')[0];
	let editView = userEle.getElementsByClassName('edit-view')[0];
	normalView.style.display = 'none';
	editView.style.display = 'block';
}

function cancelEdit(userEle) {
	let normalView = userEle.getElementsByClassName('normal-view')[0];
	let editView = userEle.getElementsByClassName('edit-view')[0];
	normalView.style.display = 'block';
	editView.style.display = 'none';
}

function submitEdit(ele) {
	let userEle = ele.parentNode.parentNode;
	let nameInput = userEle.getElementsByClassName('name-edit-input')[0];
	let emailInput = userEle.getElementsByClassName('email-edit-input')[0];
	let id = ele.getAttribute('data-user-id');
	let data = {
		user: {
			name: nameInput.value,
			email: emailInput.value,
			id: id
		}
	};
	httpPut('/api/dataset/update', data)
		.then(() => {
			displayDataset();
		})
}

function deleteData(ele) {
	let id = ele.getAttribute('data-user-id');
	httpDelete('/api/dataset/delete/' + id)
		.then(() => {
			displayDataset();
		})
}

function httpGet(path) {
	return fetch(path, getOptions('GET'))
}

function httpPost(path, data) {
	return fetch(path, getOptions('POST', data));
}

function httpPut(path, data) {
	return fetch(path, getOptions('PUT', data));
}

function httpDelete(path) {
	return fetch(path, getOptions('DELETE'));
}

function getOptions(verb, data) {
	let options = {
		dataType: 'json',
		method: verb,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	if (data) {
		options.body = JSON.stringify(data);
	}
	return options;
}