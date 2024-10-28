My 10th miniproject! This one is the culmination of the entire core curriculum. I used the visuals of the react-bootstrap integration for the front end as well as a lot of the recent classwork in module 11. It makes calls to the most recent version of my MP5 E-commerce API, which it itself pulls from an SQL database it generates and manages. Honestly, I'm very proud of myself for this!  

Now, to get this working please use the most recent version of the e-commerce API (I fixed something with status codes being returned on there). Then, download this, install packages and run it through node! There are some considerations for how I designed things to simulate later features, such as a customer and admin mode so that I could fulfil requirements for the project without having to expand the API yet. I will definitely be upgrading this in the future though and I'm excited for that. 

Link to backend API = https://github.com/windikite/MP5-E-CommerceAPI

![website preview](https://raw.githubusercontent.com/Windikite/MP10-E-Commerce/master/public/webPreviewProducts.png)
![website preview](https://raw.githubusercontent.com/Windikite/MP10-E-Commerce/master/public/webPreviewCart.png)

1. Customer and CustomerAccount Management: 
    - **Create:** The application has a form for capturing and submitting customer information to create accounts.  
    - **Read:** It is possible to view customer details by clicking on their name on the customer list page.  
    - **Update:** Clicking on their name brings the user to the same form that is used to create a customer account, but prefills out the existing information for review and submission.   
    - **Delete:** Deleting a customer is easy, as each customer's listing on the customer list page has a simple delete button.  
2. Product Catalog: 
    - **List Products:** The application has a page that lists all available products on the platform. 
    - **Create:** Creating a product is easy, done via a simple form.  
    - **Read:** The products page acts as a catalog by fetching all products and generating a card for each product, displaying its information.  
    - **Update:** While in admin mode, clicking a products edit button brings the user to the same form that is used to create a product, but prefills out the existing information for review and submission.   
    - **Delete:** Deleting a product is easy, as each product listing on the product list page has a simple delete button while in admin mode.
    - **Confirmation Modal:** When creating or updating a product there is a confirmation modal that appears to the user.
3. Order Processing: 
    - **Place Order Form:** You can click "add to cart" on any product and have it added to your cart for later purchase. When you go to your cart, the page will show all items in the cart as well as the quantity. Make sure to select which customer you will order for, as it defaults to the first customer in the list. This is to simulate the functionality as the api does not have a login endpoint yet. 
    - **Manage Order History (Bonus):** It is easy to see the order history of a customer, as clicking on the customer's row on the customers page will show their order history. Then, by clicking on that order a list of items in it will be shown below. 
    - **Calculate Order Total Price (Bonus):** Within the list of orders per customer, one of the data points visible is the total price for that order. Additionally, in the cart on the checkout button it will show the total price for the order.
4. Component Creation and Organization: 
    - The application uses both functional and class components for various parts of it. Hooks such as useState and useEffect are heavily used to manage component state.  
    - There is routing using React Router to create routes beteen different parts of the application. Most of the routes are used through following forms and button prompts, but the main routes of home, customers and products are acccessible via the navigation bar.  
    - Various forms are used to capture and validate data, then do things such as create customer accounts and products. Data is sent to the backend API, and success modals are used when appropriate.  
    - Event handlers, primarily onClick, onChange, and onSubmit are used throughout the application.  
    - React-Bootstrap is heavily integrated into the application, and their components are used when possible and practical.  
    - Bootstrap is used to provide clean visuals and organize components as appealingly as possible.  
    - Try-Catch blocks are used in api calls, and both useEffect's control and conditional rendering are used to activate functions only when the data they depend on is present.
