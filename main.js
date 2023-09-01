let totalPrice=0;
function addProductToList(product){
    const ulElement= document.getElementById("listofitems")
    const newAddition = document.createElement('li');
    
    newAddition.textContent= `${product.price} - ${product.name}`;

    
    document.getElementById('sp').value='';
    document.getElementById('pn').value='';

    ulElement.appendChild(newAddition);

    const deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    newAddition.appendChild(deletebtn);
    deletebtn.classList.add("deleteButton");

    deletebtn.addEventListener("click", function() {
        totalPrice -= parseFloat(product.price);

        // Update the total price display
        document.getElementById("totalPrice").textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        ulElement.removeChild(newAddition);

    
    
        // Make Axios DELETE request to remove the appointment data
        axios.delete(`https://crudcrud.com/api/150360879c7944bfa455a08fe0f2935c/productData/${product._id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    

        totalPrice += parseFloat(product.price);

    // Update the total price display
    document.getElementById("totalPrice").textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}
function submitForm(event){
    
        event.preventDefault(); // Prevent the default form submission behavior
      
        const itemrate = document.getElementById("sp");
        const nameofproduct = document.getElementById("pn");
      
      
        var user = {
          price: itemrate.value,
          name: nameofproduct.value
          
        };
        axios.post('https://crudcrud.com/api/150360879c7944bfa455a08fe0f2935c/productData', user)
    .then((response) => {
      console.log(response);
      // If successful, add the new appointment to the list
      addProductToList(user);
    })
    .catch((err) => {
      // Display error message
      document.body.innerHTML += "<h4> Something went wrong </h4>";
      console.log(err);
    });

}



window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/150360879c7944bfa455a08fe0f2935c/productData")
      .then((response) => {
        console.log(response);
        // Process the response and display existing appointments here
        const Products = response.data;
        Products.forEach(product => {
          addProductToList(product);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });



