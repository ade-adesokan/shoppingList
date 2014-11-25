
////Declaring main variables//////
//////////////////////////////////

// text of shopping list_items

var shopping_list= {

	list_item_text: document.getElementById("new-item"),
	//add button			
	add_button: document.getElementsByTagName("button")[0],	
	//added list_items in shopping list        	
	added_list_items_holder: document.getElementById("added-items"),
	 //checked out Shopping list items		
	checked_out_list_items_holder: document.getElementById("checked-out-items"),


	////Function of creating a new item to add to list

	add_new_list_item: function(item_string){

		var list_item= document.createElement("li");
		var check_box= document.createElement("input");
		var edit_mode= document.createElement("input");
		var label= document.createElement("label");
		var edit_button=document.createElement("button");
		var delete_button=document.createElement("button");

		check_box.type= "checkbox";
		edit_button.className= "edit";
		edit_button.innerText= "Edit";
		edit_mode.type= "text";
		delete_button.className= "delete";
		delete_button.innerText= "Delete";
		label.innerText= item_string;

		//If nothing is typed in the textbox display error message

		if(label.innerText.length==0){
			alert("An item must be typed !!");
		}

		//If a valid input is typed go on with processes

		else{

			list_item.appendChild(check_box);
			list_item.appendChild(edit_mode);
			list_item.appendChild(label);
			list_item.appendChild(edit_button);
			list_item.appendChild(delete_button);

			return list_item;	
		}
		
	},


	// Function of adding the newly created shopping list item

	add_action: function(){	
		console.log("adding the new item");
		var list_item= shopping_list.add_new_list_item(shopping_list.list_item_text.value);
		shopping_list.added_list_items_holder.appendChild(list_item);
		shopping_list.list_item_text.value="";

		//Linking function with the actions
		shopping_list.binding_actions(list_item,shopping_list.check_out_list_items);

	},


	// edit existing list_item

	edit_action: function(){
		console.log("Editing ...");

		//selecting the particular item
		var list_item= this.parentNode;
		//slecting the label
		var label= list_item.querySelector("label");
		//selecting the text in the edit mode
		var edit_input= list_item.querySelector("input[type =text]");
		//setting conditional statement  
		var contains_class= list_item.classList.contains("edit-mode");
		//If item is in edit mode
		if (contains_class) {
			label.innerText= edit_input.value;
		}
		//if item is not in edit mode
		else {
			edit_input.value= label.innerText;
		}
		//ability to switch between classes
		list_item.classList.toggle("edit-mode");

	},



	// Function of deleting item from the lists
	delete_action: function(){
		console.log("Deleting ...");
		//selecting the particular item
		var list_item = this.parentNode;
		//selecting its parent
		var ul= list_item.parentNode;
		//Removing the whole collection
		ul.removeChild(list_item);
	},


	// Function of checking out an item
	check_out_list_items: function(){
		console.log("checking out list_item ...");
		//selecting the particular item
		var list_item = this.parentNode;
		//transferring the item to the check out list
	 	shopping_list.checked_out_list_items_holder.appendChild(list_item);
	 	//Linking function with the actions
	 	shopping_list.binding_actions(list_item,shopping_list.add_list_items);

	},

	// mark as added
	add_list_items: function(){
		console.log("Removing list_item from check out list...");
		//when check box is checked 
		//append list list_item to added list_items
		var list_item= this.parentNode;
		shopping_list.added_list_items_holder.appendChild(list_item);
		shopping_list.binding_actions(list_item,shopping_list.check_out_list_items);
	},


	////////////////////////////////////////////////
	///// Click and checking Events (ACTIONS) //////
	///////////////////////////////////////////////

	


	//Other actions Function
	binding_actions: function(list_item,checkbox_handler){
		console.log("Sucessfully binded all actions");

		//Selecting the particular action from the list item
		var check_box = list_item.querySelector("input[type=checkbox]");
		var edit_button = list_item.querySelector("button.edit");
	  	var delete_button = list_item.querySelector("button.delete");

		//Bind the edit action to the button
		edit_button.onclick=shopping_list.edit_action;

		//Bind the delete action to the button
		delete_button.onclick=shopping_list.delete_action;

		//Bind the checked out list items function and added list item function to their respective check boxes
		check_box.onchange=checkbox_handler;
	}


	
};	

//click of add button
shopping_list.add_button.onclick= shopping_list.add_action;

//Go through added list_items handler list list items
for(var i=0; i<shopping_list.added_list_items_holder.children.length; i++){
	//Link actions to added list items
	shopping_list.binding_actions(shopping_list.added_list_items_holder.children[i],shopping_list.check_out_list_items);
};	

//Go through checked out list_items handler list items
for(var i=0; i<shopping_list.checked_out_list_items_holder.children.length; i++){
	//Link actions to checked out list_items
	shopping_list.binding_actions(shopping_list.checked_out_list_items_holder.children[i],shopping_list.add_list_items);
};