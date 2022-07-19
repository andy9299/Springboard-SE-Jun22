//1 Select the section with an id of container without using querySelector.
const ans1 = document.getElementById('container');

//2 Select the section with an id of container using querySelector.
const ans2 = document.querySelector('#container');

//3 Select all of the list items with a class of “second”.
const ans3 = document.querySelectorAll('.second');

//4 Select a list item with a class of third, but only the list item inside of the ol tag.
const ans4 = document.querySelector('ol .third');

//5 Give the section with an id of container the text “Hello!”.
const ans5 = document.querySelector('#container');
//ans5.innerHTML = "Hello!" //commented out cause effects the rest of ans

//6  Add the class main to the div with a class of footer.
const ans6 = document.querySelector('.footer');
ans6.classList.add('main');

//7 Remove the class main on the div with a class of footer.
const ans7 = document.querySelector('.footer');
ans7.classList.remove('main');

//8 Create a new li element.
const ans8 = document.createElement('li');

//9 Give the li the text “four”.
ans8.innerText = 'four';

//10 Append the li to the ul element.
const ans10 = document.querySelector('ul');
ans10.appendChild(ans8);

//11 Loop over all of the lis inside the ol tag and give them a background color of “green”.
const ans11 = document.querySelectorAll('ol li');
for (i = 0; i < ans11.length; i++) {
  ans11[i].style.backgroundColor = 'green';
}

//12 Remove the div with a class of footer
const ans12 = document.querySelector('.footer');
ans12.remove();
