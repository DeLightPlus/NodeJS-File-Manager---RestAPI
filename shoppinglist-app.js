

const http = require('http');
const fs = require('fs');

const PORT = 3000;
const DATA_DIR = './data';
const FILE_PATH = DATA_DIR + '/shopping-list.json'; // String concatenation for file path

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) 
{
    fs.mkdirSync(DATA_DIR);
}

// Ensure JSON file exists
if (!fs.existsSync(FILE_PATH)) 
{
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

// Read shopping list from JSON file
const readShoppingList = () => 
{
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
};

// Write shopping list to JSON file
const writeShoppingList = (list) => 
{
    fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2));
};

// Create server
const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    console.log('url:', url);
    
    const [pathname, queryString] = req.url.split('?'); // Manually split URL

    // Set headers for JSON response
    res.setHeader('Content-Type', 'application/json');

    if (pathname === '/shopping-list') 
    {
        switch (method) 
        {            
            case 'GET':
                console.log(method);
                const list = readShoppingList();
                res.writeHead(200);
                res.end( JSON.stringify(list) );
                break;

            case 'POST':
                console.log(method);
                let body = '';
                req.on('data', chunk => { body += chunk.toString(); });
                req.on('end', () => {
                    const newItem = JSON.parse(body);
                    // newItem.id= new Date();
                    const currentList = readShoppingList();
                    currentList.push(newItem);
                    writeShoppingList(currentList);
                    res.writeHead(201);
                    res.end(JSON.stringify(newItem));
                });
                break;

            case 'PUT':                
                const id = parseInt(new URLSearchParams(queryString).get('index')); // Parse query string manually
                let updateBody = '';
                console.log('PUT | parseInd.iNdEX: ', id);
                
                req.on('data', chunk => { updateBody += chunk.toString(); });
                req.on('end', () => {
                    const updatedItem = JSON.parse(updateBody);
                    const currentList = readShoppingList();
                    if (id >= currentList.length || id < 0) 
                    {
                        res.writeHead(404);
                        res.end( JSON.stringify({ error: 'Item not found' }) );
                        return;
                    }
                    currentList[id] = updatedItem;
                    writeShoppingList(currentList);
                    res.writeHead(200);
                    res.end(JSON.stringify(updatedItem));
                });
                break;

            case 'DELETE':
                const deleteIndex = parseInt(new URLSearchParams(queryString).get('index'));
                console.log('DELETE | parseInd.iNdEX: ', deleteIndex);
                const currentListForDelete = readShoppingList();
                if (deleteIndex >= currentListForDelete.length || deleteIndex < 0) 
                {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Item not found' }));
                    return;
                }
                const removedItem = currentListForDelete.splice(deleteIndex, 1);
                writeShoppingList(currentListForDelete);
                res.writeHead(200);
                res.end(JSON.stringify(removedItem));
                break;

            default:
                res.writeHead(405);
                res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
    } 
    else 
    {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
