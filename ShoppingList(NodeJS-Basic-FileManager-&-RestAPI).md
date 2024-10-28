# Node.js Basic File Manager and REST API 
## for managing a shopping list. 

### Build a  Node.js application that serves as both a 	basic 
	- File Manager 
	- and a REST API for managing a shopping list. 

Leverage Node.js' file system capabilities to **store shopping list data in JSON format** and expose **CRUD operations via HTTP endpoints**.

**Requirements:**
1. **File Manager:**
	- Create a new directory.
	- Create a JSON file within the directory.
	- Read and parse the JSON file.
	- Update the JSON file with new data.

2. **Shopping List API:**
	- Implement CRUD operations (GET, POST, PUT/PATCH, DELETE) using the built-in http module.
	- Manage endpoints for /shopping-list to handle shopping list items.
	- Handle JSON data exchange for storing and retrieving shopping list items.
	- Implement basic error handling and validation.

3. **Testing:**
	- Thoroughly test the combined application to ensure all features (file management and API endpoints) function correctly.
	- Use tools like Postman to test API endpoints for CRUD operations on the shopping list.