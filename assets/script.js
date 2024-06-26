// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
   


   function saveEvent(event) {
        const block = $(this).closest('.time-block');
        const description = block.find('.description').val();
        localStorage.setItem(block.attr('id'), description);
    }

    $('.saveBtn').on('click', saveEvent);

    function updateTimeBlocks() {
        const currentHour = dayjs().hour();

        $('.time-block').each(function() {
            const blockHour = parseInt($(this).attr('id').split('-')[1]);

            if (blockHour < currentHour) {
                $(this).removeClass('present future').addClass('past');
            } else if (blockHour === currentHour) {
                $(this).removeClass('past future').addClass('past');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }

    // Function to load events from local storage
    function loadEvents() {
        $('.time-block').each(function () {
            const event = localStorage.getItem($(this).attr('id'));
            if (event) {
                $(this).find('.description').val(event);
            }
        });
    }
    function displayCurrentDay() {
        const currentDate = dayjs().format('dddd, MMMM D');
        $('#currentDay').text(currentDate);
    }
    function createTimeBlocks() {
        const container = document.querySelector('.container-lg');
    
        for (let i = 9; i <= 17; i++) {
            const timeBlock = document.createElement('div');
            timeBlock.classList.add('row', 'time-block');
            timeBlock.id = `hour-${i}`;
    
            const hourDiv = document.createElement('div');
            hourDiv.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
            hourDiv.textContent = (i % 12 === 0 ? 12 : i % 12) + (i >= 12 ? 'PM' : 'AM');
    
            const textarea = document.createElement('textarea');
            textarea.classList.add('col-8', 'col-md-10', 'description');
            textarea.rows = 3;
    
            const saveBtn = document.createElement('button');
            saveBtn.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
            saveBtn.setAttribute('aria-label', 'save');
            saveBtn.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';
    
            timeBlock.appendChild(hourDiv);
            timeBlock.appendChild(textarea);
            timeBlock.appendChild(saveBtn);
    
            container.appendChild(timeBlock);
        }
    }
    
    displayCurrentDay();
    createTimeBlocks();
    updateTimeBlocks();
    loadEvents();

    // Update time blocks every minute
    setInterval(updateTimeBlocks, 60000);
});

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  ;
  