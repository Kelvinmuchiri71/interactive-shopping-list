document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("item-input");
    const addButton = document.getElementById("add-btn");
    const clearButton = document.getElementById("clear-btn");
    const shoppingList = document.getElementById("shopping-list");


    //load saved items from local storage
    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];


    //render the list
    const renderList = () => {
        shoppingList.innerHTML= "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item.text;
            li.className = item.purchased ? "purchased" : "";
            li.addEventListener("click", () => togglePurchased(index));
            li.addEventListener("dblclick", () => editItem(index));
            shoppingList.appendChild(li);
        });
    };

    //add an item to the list
    const addItem = () => {
        const newItem = inputField.value.trim();
        if (newItem) {
            items.push({ text: newItem, purchased: false});
            inputField.value = "";
            saveAndRender();
        }
    };

    //mark an item as purchased
    const togglePurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveAndRender();
    };

    //edit an existing item
    const editItem = (index) => {
        const newText = prompt("Edit item:", items[index].text);
        if (newText !== null && newText.trim() !== "") {
            items[index].text = newText.trim();
            saveAndRender();
        }
    };

    //to clear the list
    const clearList = () => {
        if (confirm("Are you sure you want to clear the list?")) {
            items.length = 0;    //clears the array
            saveAndRender();
        }
    };

    //save items to local storage and render
    const saveAndRender = () => {
        localStorage.setItem("shoppingList", JSON.stringify(items));
        renderList();
    };

    //attach event listeners
    addButton.addEventListener("click", addItem);
    clearButton.addEventListener("click", clearList);
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addItem();
    });

    //initial render
    renderList();
});