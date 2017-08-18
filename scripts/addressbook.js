window.onload = function () {
//button
    var quickAddBtn = document.getElementById("QuickAdd");
    var addBtn = document.getElementById("Add");
    var cancelBtn = document.getElementById("Cancel");
	var quickAddFormDiv = document.querySelector('.quickaddForm');
//document.getElementByClassName('quickaddForm')[0];
	
//form fields
	var fullname = document.getElementById("fullname");
	var phone = document.getElementById("phone");
	var address = document.getElementById("address");
	var city = document.getElementById("city");
	var email = document.getElementById("email");
	
	//Address book display
	var addBookDiv = document.querySelector('.addbook');
	
	//create storage array (which will hold the all the json object for all the entries in the address book)
	var addressBook = [];
	
//Event Listeners
	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block"
	});
	
	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});
	
	addBtn.addEventListener("click", addToBook);
	
//The reason is why we adding event listener to the div not to the individual delete button because let's say you have thousands of entries in the address-book you don't want thousands of event-listener added into the script that will the program highly inefficient and besides every-time you add something you have to create new event-listener so we use a process called bubbling. where the idea is that inside of that div "addbook" if somebody click then i can check for the particular click and find out where the person clicking. then if the person clicking the button then do something else don't do anything. so for that you just have to create one event-listener.
	addBookDiv.addEventListener("click", removeEntry);
	
//constructor function
	function jsonStructure(fullname,phone,address,city,email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
	}
	
	function addToBook(){
		
		var isNull = fullname.value!= '' && phone.value!= '' && address.value!= '' && city.value!= '' && email.value!= '';
		console.log(isNull);
		if(isNull){
            //Add the contents of the form to the array & local storage
			var obj = new jsonStructure(fullname.value,phone.value,address.value,city.value,email.value);
			addressBook.push(obj);
            //local storage always store only string.
			//We have array of json object storage convert to in string so we used stringify to array variable.
			localStorage['addbook'] = JSON.stringify(addressBook);
			
			//hide the form panel
			quickAddFormDiv.style.display ="none";
			//Clear the form
			clearForm();
			//updating  & displaying all records in the  addressBook
			showAddressBook();
		}
	}
	
	
	function clearForm(){
		var frm = document.querySelectorAll('.formFields');
		for(var i in frm){
			frm[i].value = '';
		}
	}
	
	function showAddressBook(){
		//check if the key 'addbook' exists in localStorage or else create it
		//if it exist, load contents from the localStorage and loop > display it on the page.
		if(localStorage['addbook']=== undefined){
			localStorage['addbook'] = "[]";
		}else{
			//array containing the json object in the localStorage which is stored in the form of string now need to convert that string into an array of valid json object which is read and process which is possible parse(process line by line)
			addressBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				//use single quote because "" already used in HTML page
				var str = '<div class="entry">'
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
					str += '<div class="city"><p>' + addressBook[n].city + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
					addBookDiv.innerHTML += str;
			}
		}
	}
	//when the person clicks anywhere inside the "addBookDiv"event listener will pass the data into the function called removeEntry via this arguments e.
	function removeEntry(e){
		if(e.target.classList.contains("delbutton")){
			//classList is a ECMA SCript part so modern browser will work however old browser ".className.match"
			var remID = e.target.getAttribute("data-id");
			//Remove the JSON entry from the array with index num = remID;
			addressBook.splice(remID, 1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			//update the display
			showAddressBook();
			
		}
	}
	
	showAddressBook()
}