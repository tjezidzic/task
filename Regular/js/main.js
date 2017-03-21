function readJsonFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState == 4 && rawFile.status == '200') {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

/*READ JSON FILE AND ADD OPTION TAGS TO SELECT*/
readJsonFile("js/data.json", function (text) {
    var data = JSON.parse(text);

    /*FURTHER BLOCK OF CODE WILL CREATE AS MANY OPTIONS THAT JSON FILE HAVE*/
    /*EVENT TYPE STRINGS*/
    var eventTypes = data.eventType;
    for (var i = 0; i < eventTypes.length; i++) {
    	var eventType = document.getElementById("eventType");
    	var option = document.createElement("option");
		option.value = data.eventType[i];
		eventType.appendChild(option);
		option.text = data.eventType[i];
		eventType.appendChild(option);
    }

    /*MORE ACTIONS STRINGS*/
    var Actions = data.moreActions.values;
    for (var i = 0; i < Actions.length; i++) {
    	var moreActions = document.getElementById("moreActions");
    	var option = document.createElement("option");
		option.value = data.moreActions.values[i];
		moreActions.appendChild(option);
		option.text = data.moreActions.values[i];
		moreActions.appendChild(option);
    }

	/*NOTIFICATIONS TYPE FORMAT STRINGS*/
    var notificationsTypes = data.notifications.type;
    for (var i = 0; i < notificationsTypes.length; i++) {
    	var notificationsType = document.getElementById("notifications");
    	var option = document.createElement("option");
		option.value = data.notifications.type[i];
		notificationsType.appendChild(option);
		option.text = data.notifications.type[i];
		notificationsType.appendChild(option);
    }

    /*NOTIFICATIONS TIME FORMAT STRINGS*/
    var notificationsTimes = data.notifications.time;
    for (var i = 0; i < notificationsTimes.length; i++) {
    	var notificationsTime = document.getElementById("notificationsTime");
    	var option = document.createElement("option");
		option.value = data.notifications.time[i];
		notificationsTime.appendChild(option);
		option.text = data.notifications.time[i];
		notificationsTime.appendChild(option);
    }

    /*CALENDAR STRINGS*/
    var users = data.calendar.users;
    for (var i = 0; i < users.length; i++) {
    	var calendar = document.getElementById("calendar");
    	var option = document.createElement("option");
		option.value = data.calendar.users[i];
		calendar.appendChild(option);
		option.text = data.calendar.users[i];
		calendar.appendChild(option);
    }

	/*NOTIFICATIONS TYPE FORMAT STRINGS*/
    var showAsValues = data.calendar.showAs.values;
    for (var i = 0; i < showAsValues.length; i++) {
    	var showAs = document.getElementById("showAs");
    	var option = document.createElement("option");
		option.value = data.calendar.showAs.values[i];
		showAs.appendChild(option);
		option.text = data.calendar.showAs.values[i];
		showAs.appendChild(option);
    }
});

/*ON SAVE AND SAVE EVENT BUTTON CLICK SAVE INPUTS TO LOCAL STORAGE*/
function saveLocalStorage() {
	var inputs = document.getElementsByTagName('input');
  
	for (var i = 0; i < inputs.length; i++) {
		var value = inputs[i].id;
		/*FOR CHECKBOXES*/
		if (inputs[i].type == 'checkbox' && inputs[i].checked != false && inputs[i].id != 'see_list') {
			localStorage.setItem(inputs[i].id, inputs[i].checked);
		} 
		/*FOT TEXT INPUTS*/
		else if (inputs[i].type == 'text' && inputs[i].id != 'guest_name' && inputs[i].id != 'time_value') {
			localStorage.setItem(inputs[i].id, inputs[i].value);
		} 
		/*SKIPS BUTTONS*/
		else if (inputs[i].type == 'button') {

		} 
		/*SAVES GUEST LIST*/
		else if (inputs[i].id == 'guest_name') {
			var guests = document.getElementsByClassName('guest');
			for (var j = 0; j < guests.length; j++) {
				var guestName = guests[j].innerHTML;
				var guestNum = 'Guest ' + (j + 1);
				localStorage.setItem(guestNum, guestName);
			}
		} 
		/*VALIDATION FOR OTHER INPUTS (NOTIFICATIONS TIME)*/
		else if (inputs[i].value == '' && inputs[i].id != 'guest_name'  && inputs[i].id != 'clone_notifi_row') {
			inputs[i].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
		}
	}
	/*VALIDATION FOR EVENT NAME*/
	if (document.getElementById('event_name').value == '') {
		document.getElementsByClassName('save_event_wrapper')[0].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
		document.getElementById('event_name').style.backgroundColor = "rgba(0, 0, 0, 0)";
	}
	/*VALIDATION FOR LOCATION NAME*/
	if (document.getElementById('location').value == '') {
		document.getElementById('location').style.backgroundColor = "rgba(255, 0, 0, 0.5)";
	} 
	/*VALIDATION FOR GUEST NAME*/
	var guestListArray = document.getElementById('guest_list').getElementsByTagName('li').length;
	if (guestListArray == '') {
		document.getElementsByClassName('add_guest_wrapper')[0].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
		document.getElementById('guest_name').style.backgroundColor = "rgba(0, 0, 0, 0)";
	}  
	/*SAVE DROPDOWNS THAT ARE NOT MULTIPLYING*/
	var selects = document.getElementsByClassName('simple_dropdowns');   
	for (var i = 0; i < selects.length; i++) {
		var index = selects[i].options.selectedIndex;
		var value = selects[i].options[index].value;
		var property = selects[i].id;
		localStorage.setItem(property, value);
	}
	/*SAVE NOTIFICATION LIST*/
	var notificationList = document.getElementsByClassName('clone_notifi_row'); 
	for (var a = 1; a < notificationList.length; a++) {
		var selects = notificationList[a].getElementsByTagName('select');
		/*SAVE DROPDOWNS*/
		for (var i = 0; i < selects.length; i++) {
			var index = selects[i].options.selectedIndex;
			var value = selects[i].options[index];
			var property = selects[i].id + ' ' + a;
			localStorage.setItem(property, value.value);
		}
		/*SAVE TIME INPUT*/
		var input = notificationList[a].getElementsByTagName('input');
		var enteryNum = input[0].id + ' ' + a;
		localStorage.setItem(enteryNum, input[0].value);
	}
	/*SAVE DESCRIPTION*/
	var textarea = document.getElementById('description'); 
	if (textarea.value != '') {
		localStorage.setItem(textarea.id, textarea.value);
	} 
	/*DESCRIPTION VALIDATION*/
	else{
		textarea.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
	}
	/*SAVE EVENT COLOR*/
	var color = document.getElementById('selected');
	localStorage.setItem('event_color', color.dataset.color);
	/*POPUP THATH SAYS "INPUTS ARE SAVED"*/
	document.getElementById('is_saved').style.top = '0';
}

/*ON PUBLISH EVENT BUTTON CLICK SAVE INPUTS FTOM THAT FIELD TO LOCAL STORAGE*/
function saveEventLocalStorage() {
	var leftEventBox = document.getElementById('left_event_section');
	var inputs = leftEventBox.getElementsByTagName('input');
  	for (var i = 0; i < inputs.length; i++) {
		var value = inputs[i].id;
		if (inputs[i].type == 'checkbox' && inputs[i].checked != false && inputs[i].id != 'see_list') {
			localStorage.setItem(inputs[i].id, inputs[i].checked);
		} else if (inputs[i].type == 'text' && inputs[i].id != 'guest_name') {
			localStorage.setItem(inputs[i].id, inputs[i].value);
		} else if (inputs[i].type == 'button') {

		} else if (inputs[i].id == 'guest_name') {
			var guests = document.getElementsByClassName('guest');
			for (var j = 0; j < guests.length; j++) {
				var guestName = guests[j].innerHTML;
				var guestNum = 'Guest ' + (j + 1);
				localStorage.setItem(guestNum, guestName);
			}
		} else if (inputs[i].value == '' && inputs[i].id != 'guest_name') {
			inputs[i].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
		}
	}

	var selects = leftEventBox.getElementsByClassName('simple_dropdowns');   
	for (var i = 0; i < selects.length; i++) {
		var index = selects[i].options.selectedIndex;
		var value = selects[i].options[index].value;
		var property = selects[i].id;
		localStorage.setItem(property, value);
	}
	if (inputs[i].value != '' && inputs[i].id != 'guest_name') {
		document.getElementById('is_saved').style.top = '0';
	}
}
/*HIDE POPUP NOTIFICATION EOR INPUTS*/
document.getElementById('is_saved').onclick = function(){
	document.getElementById('is_saved').style.top = '-1900px';
};

/*GUESTS ADDING*/
var createGuestButton = document.getElementById('add_guest');
createGuestButton.onclick = function() {
	var li = document.createElement('li');
	li.setAttribute("id", "guest");
	li.setAttribute("class", "guest");
	var guest = document.getElementById('guest_name').value;
	if (guest != '') {
		var text = document.createTextNode(guest);  
		li.appendChild(text);  
		document.getElementById('guest_list').appendChild(li);
	} else{
		document.getElementById('guest_name').style.backgroundColor = "rgba(255, 0, 0, 0.5)";
	}
	document.getElementById('guest_name').value = '';
};

/*GUESTS SHOWING*/
var seeGuests = document.getElementById('see_list');
seeGuests.onclick = function(){
	if (seeGuests.checked == true) {
		document.getElementById('guest_list').style.display = "block";
	} else{
		document.getElementById('guest_list').style.display = "none";
	}
};

/*DELETE NOTIFICATION ROW*/
function deleteRow(row){
    var i=row.parentNode.parentNode.rowIndex;
    document.getElementById('notifi_row').deleteRow(i);
}

/*CREATE NOTIFICATION ROW*/
function createNotification(){
	var tr = document.getElementById('clone_notifi_row').cloneNode(true);
    document.getElementById('notifi_row').appendChild(tr);
}

/*COLOR PICKER*/
var colorPalette = document.getElementById('color_pick');
colorPalette.onclick = function(event){
	var evt = event || window.event;
	var listOfColors = colorPalette.getElementsByTagName("li");
	for (var i = 0; i < listOfColors.length; i++) {
		listOfColors[i].removeAttribute("id");
	}
	evt.target.setAttribute("id", "selected");
};
var listOfColors = document.getElementById('color_pick').getElementsByTagName("li");
for (var i = 0; i < listOfColors.length; i++) {
	var maxColors = listOfColors.length -1;
	if (i < maxColors && i > 5) {
		listOfColors[i].style.display = 'none';
	}
}
document.getElementById('show_all_colors').onclick = function(){
	for (var i = 0; i < listOfColors.length; i++) {
		var maxColors = listOfColors.length -1;
		if (i < maxColors && i > 5) {
			listOfColors[i].style.display = 'inline-block';
			document.getElementById('show_all_colors').style.display = 'none';
		}
	}
};

/*ONLOAD FUNCTIONS*/
window.onload = function(){
	/*SAVE BUTTON ANIMATION*/
	var btn = document.getElementById('header_arrow');
	btn.onclick = function() {
		var elemRight = document.getElementById('top_button_section').style.right;
		if (elemRight != '0px') {
			document.getElementById('top_button_section').style.right = '0px';
			document.getElementById('arrow').style.transform = 'rotate(0deg)';
		} else{
			document.getElementById('top_button_section').style.right = '700px';
			document.getElementById('arrow').style.transform = 'rotate(180deg)';
		}
	};
	var input = document.getElementById('event_name');
	input.addEventListener('input', function(){
    	var elemRight = document.getElementById('top_button_section').style.right;
		if (elemRight != '0px') {
			document.getElementById('top_button_section').style.right = '0px';
			document.getElementById('arrow').style.transform = 'rotate(0deg)';
		}
	});
	/*CREATING CLONE FOR NOTIFICATION ROW*/
	var tr = document.getElementById('clone_notifi_row').cloneNode(true);
	document.getElementById('notifi_row').appendChild(tr);
};

/*NOTIFICATIONS BOXES - PROFILE, MENU, NOTIFICATION, SEARCH*/
function popUpAction (e) {
	if (!e) var e = window.event;
	var element = e.currentTarget.getAttribute('data-popup');
	var popUp = document.getElementById(element).classList;
	if (popUp[1] == 'hide') {
		popUp.add("show");
		popUp.remove("hide");
	} else {
		popUp.add("hide");
		popUp.remove("show");
	}
	var allPopUpElem = document.getElementsByClassName("popup");
	for (var i = 0; i < allPopUpElem.length; i++) {
		var otherPopUpElem = allPopUpElem[i].classList;
		if (otherPopUpElem[1] == 'show' && allPopUpElem[i].getAttribute('id') != element) {
			otherPopUpElem.add("hide");
			otherPopUpElem.remove("show");
		}
	}
	/*REMOVE RED DOT WHEN NOTIFICATION BUTTON IS CLICKED*/
	if (e.currentTarget.id == 'notifi_button') {
		document.getElementById('red_dot').style.display = 'none';
	}
}

/*REMOVE POPUP - PROFILE, MENU, NOTIFICATION, SEARCH*/
function popupRemover(){
	var allPopUpElem = document.getElementsByClassName("popup");
	for (var i = 0; i < allPopUpElem.length; i++) {
		var otherPopUpElem = allPopUpElem[i].classList;
		otherPopUpElem.add("hide");
		otherPopUpElem.remove("show");
	}
}