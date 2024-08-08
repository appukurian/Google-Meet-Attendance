document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getAttendees"}, function(response) {
        if (response && response.attendees) {
          const attendeeList = document.getElementById('attendeeList');
          response.attendees.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            attendeeList.appendChild(li);
          });
        }
      });
    });
  });