// Створити HTML-сторінку з великою таблицею. При кліку на заголовок стовпця,
// необхідно відсортувати дані цього стовпця. Врахуй, що числові значення
// повинні сортуватися як числа, а не як рядки.

function sortTable(n) {

    let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    table = document.getElementById("myTable");
    switching = true;

    //Set the sorting direction to ascending:
    dir = "asc";

    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {

        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");

        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {

            //start by saying there should be no switching:
            shouldSwitch = false;

            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchCount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}



// Створити HTML-сторінку з блоком тексту в рамці. Реалізувати можливість змінювати розмір блоку,
// якщо затиснути мишку в правому нижньому кутку і тягнути її далі.

function resize(elementId) {
    const element = document.getElementById(elementId);
    const button = document.getElementById(elementId);
    const min = 200;
    let initialWidth = 0, initialHeight = 0, mouseX = 0, mouseY = 0;

    //Mousedown event to control scaling with scale() and to add mouseup event to stop scaling with stop()
    button.addEventListener('mousedown', function(e) {
        getMousePositions(e);
        getElementDimensions();
        window.addEventListener('mousemove', scale);
        window.addEventListener('mouseup', removeScale);
    });

    //Get x and y mouse position
    function getMousePositions(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    }

    //Get element height and width make property a number
    function getElementDimensions() {
        initialWidth = element.clientWidth;
        initialHeight = element.clientHeight;
    }

    //Sets the width and height bases on how the mouse moves to scale the element
    function scale(e) {
        const width = initialWidth + (e.pageX - mouseX);
        const height = initialHeight + (e.pageY - mouseY);
        if (width > min) {
            element.style.width = width + 'px';
        }
        if (height > min) {
            element.style.height = height + 'px';
        }
    }

    //Removes the scale() function to stop scaling element
    function removeScale() {
        window.removeEventListener('mousemove', scale);
    }

    //Mobile event listeners
    button.addEventListener("touchstart", function(e) {
        e.preventDefault();
        getAxisPositions(e);
        getElementDimensions();
        window.addEventListener('touchmove', scaleMobile);
        window.addEventListener('touchend', removeScaleMobile);
    });

    //Scale function for mobile
    function scaleMobile(e) {
        const width = initialWidth + (e.touches[0].pageX - mouseX);
        const height = initialHeight + (e.touches[0].pageY - mouseY);
        if (width > min) {
            element.style.width = width + 'px';
        }
        if (height > min) {
            element.style.height = height + 'px';
        }
    }

    //Mobile get touch location
    function getAxisPositions(e) {
        mouseX = e.touches[0].pageX;
        mouseY = e.touches[0].pageY;
    }

    //Removes Mobile Scale
    function removeScaleMobile() {
        window.removeEventListener('touchmove', scaleMobile);
    }
}

resize('resizable-div','button');




// Створити HTML-сторінку для відображення/редагування тексту через CTRL+E та CTRL+S

document.addEventListener("keydown", e => {
    const editable = document.getElementById('editable');
    if (
        e.key.toUpperCase() === "E"
        && e.ctrlKey
    ) {
        editable.setAttribute('contenteditable', true);
    }

    if (
        e.key.toUpperCase() === "S"
        && e.ctrlKey
    ) {
        editable.setAttribute('contenteditable', false);
    }
});