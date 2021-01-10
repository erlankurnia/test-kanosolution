/******************************************************************************
 *                          Fetch and display dataset
 ******************************************************************************/
displayDataset(window.location.search);

function displayDataset(query = '') {
	query = (query == undefined || query == null) ? '' : query;
	fetch('/api/companies/all' + query)
		.then(res => res.json())
		.then(res => {
			let alldatasetAnchor = document.getElementById('all-dataset-anchor');
			alldatasetAnchor.innerHTML = '';
			alldatasetAnchor.innerHTML += displayData(res.header, res.data);
			displayPagination(res);
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
}, false);


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

/******************************************************************************
 *                          	 Display Pagination
 ******************************************************************************/
function displayPagination(res) {
	const pages = Math.ceil(res.totalEntries / res.perPage);
	const pagination = document.getElementById('pagination');
	const pageInfo = document.getElementById('page-info');
	pagination.innerHTML = '';
	pageInfo.innerHTML = '';
	pageInfo.innerHTML += `<p>Showing ${(res.perPage * (res.page - 1)) + 1} to ${(res.perPage * (res.page - 1)) + res.entries} of ${res.totalEntries} entries</p>`;
	let begin = (res.page - 2);
	let end = (res.page + 2);

	if (begin < 2) {
		begin = 2;
		end = 5;
	}
	if (end+2 > pages) {
		begin = pages - 4;
		end = pages;
	}

	let e = `
					<li class="page-item ${(res.page == 1) ? 'disabled' : '' }">
						<a class="page-link" onclick="changeURL('/?page=${res.page-1}')" tabindex="-1" aria-disabled="true">Previous</a>
					</li>
					<li class="page-item ${(res.page == 1) ? 'active' : ''}"><a class="page-link" onclick="changeURL('/?page=1')">1</a></li>
					${displayPartialPage(res, begin, end)}
					<li class="page-item ${(res.page == pages) ? 'active' : ''}"><a class="page-link" onclick="changeURL('/?page=${pages}')">${pages}</a></li>
					<li class="page-item ${(res.page == pages) ? 'disabled' : '' }">
						<a class="page-link" onclick="changeURL('/?page=${res.page+1}')">Next</a>
					</li>`;
	pagination.innerHTML += e;
}

function displayPartialPage(res, begin, end) {
	let e = '';
	for (; begin < end; begin++) {
		e += `<li class="page-item ${(begin == res.page) ? 'active' : ''}"><a class="page-link" onclick="changeURL('/?page=${begin}')">${begin}</a></li>`;
	}

	return e;
}

function changeURL(url) {
	document.location = url;
}

/******************************************************************************
 *                          	 Display Input Search
 ******************************************************************************/
function displaySearch() {
	const cmgnmaskedname = document.getElementById('cmgnmaskedname');
	const clienttier = document.getElementById('clienttier');
	const cmgsegmentname = document.getElementById('cmgsegmentname');
}